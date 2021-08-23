const Product = require('../models/products')


exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    })
}

exports.addProduct = (req, res, next) => {
    const products = new Product(req.body.title)
    products.save()
    res.redirect('/')
}

exports.getProducts = (req, res, next) => {
    //sendFile: gửi 1 file đến đường dẫn bên trong hàm, dirname: folder hiện tại
     Product.fetchAll((products) => {
         res.render('shop', {
             prods: products,
             pageTitle: 'Shop',
             path: '/',
             hasProducts: products.length > 0,
             activeShop: true,
             productCSS: true
         })
    })
}