const fs = require('fs')
const path = require('path')
const Cart = require('./cart')
const p = path.join(path.dirname(require.main.filename), 'data', 'products.json')
const getProductsFromFile = (callback) => {
    fs.readFile(p, (err, fileContent) => {
        if(!err) {
            callback(JSON.parse(fileContent))
        } else {
            callback([])
        }
    })
}

class Product {

    constructor(id, title, imageURL, description, price) {
        this.id = id
        this.title = title
        this.imageURL = imageURL
        this.description = description
        this.price = price
    }

    save() {
        //Hàm đọc file của nodejs
        getProductsFromFile((products) => {
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id)
                const updatedProducts = [...products]
                updatedProducts[existingProductIndex] = this
                fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                    console.log(err)
                })
            } else {
                this.id = Math.random().toString()
                products.push(this)
                fs.writeFile(p, JSON.stringify(products), err => {
                    console.log(err)
                })
            }
        })
    }

    static deleteById(id) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id)
            const updatedProducts = products.filter(prod => prod.id !== id)
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if (!err) {
                    Cart.deleteProduct(id, product.price)
                }
            })
        })
    }

    static fetchAll(callback) {
        getProductsFromFile(callback)
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(item => item.id === id)
            cb(product)
        })
    }
}

module.exports = Product