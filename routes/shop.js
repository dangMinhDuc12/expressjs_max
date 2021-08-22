const express = require('express')
const router = express.Router()
const path = require('path')
const rootDir = require('../ulti/path')
const adminData = require('./admin')

//  / => GET
router.get('/',(req, res, next) => {
    //sendFile: gửi 1 file đến đường dẫn bên trong hàm, dirname: folder hiện tại
    const products = adminData.products
    res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    })
} )

module.exports = router