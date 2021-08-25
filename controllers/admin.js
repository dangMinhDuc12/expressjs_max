const Product = require("../models/products");
exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true,
        editing: false
    })
}
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit
    if (!editMode) return res.redirect('/')
    const { productId } = req.params
    Product.findById(productId, (product) => {
        if (!product) {
            return res.redirect('/')
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            prod: product
        })
    })
}



exports.addProduct = (req, res, next) => {
    const { title, imageURL, description, price } = req.body
    const products = new Product(title, imageURL, description, price)
    products.save()
    res.redirect('/')
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        })
    })
}

exports.updateProduct = (req, res, next) => {
    console.log(req.method)
    res.redirect('/')
}