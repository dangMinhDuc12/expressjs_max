const Product = require("../models/productsSQL");
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



exports.addProduct = async (req, res, next) => {
    const { title, imageURL, description, price } = req.body
    await Product.create({
        title,
        imageURL,
        description,
        price
    })
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
    const { productId } = req.params
    const { title, imageURL, description, price } = req.body
    const product = new Product(productId, title, imageURL, description, price)
    product.save()
    res.redirect('/')
}

exports.deleteProduct = (req, res, next) => {
    const { productId } = req.params
    Product.deleteById(productId)
    res.redirect('/admin/products')
}