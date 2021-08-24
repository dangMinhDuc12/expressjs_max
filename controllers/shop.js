const Product = require('../models/products')

exports.getProducts = (req, res, next) => {
    //sendFile: gửi 1 file đến đường dẫn bên trong hàm, dirname: folder hiện tại
     Product.fetchAll((products) => {
         res.render('shop/product-list', {
             prods: products,
             pageTitle: 'Shop',
             path: '/products',
             hasProducts: products.length > 0,
             activeShop: true,
             productCSS: true
         })
    })
}

exports.getProduct = (req, res, next) => {
    //sendFile: gửi 1 file đến đường dẫn bên trong hàm, dirname: folder hiện tại
    const productId = req.params.productId
    console.log(productId)
    res.redirect('/')
}


exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        })
    })
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart'
    })
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    })
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    })
}