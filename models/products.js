const fs = require('fs')
const path = require('path')
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

    constructor(title, imageURL, description, price) {
        this.title = title
        this.imageURL = imageURL
        this.description = description
        this.price = price
    }

    save() {
        //Hàm đọc file của nodejs
        this.id = Math.random().toString()
        getProductsFromFile((products) => {
            products.push(this)
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err)
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