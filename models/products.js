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

    constructor(title) {
        this.title = title
    }

    save() {
        //Hàm đọc file của nodejs
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
}

module.exports = Product