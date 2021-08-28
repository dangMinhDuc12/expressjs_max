const Product = require('../models/productsSQL')
const Cart = require('../models/cart')

exports.getProducts = async (req, res, next) => {
    //sendFile: gửi 1 file đến đường dẫn bên trong hàm, dirname: folder hiện tại
    //  Product.fetchAll((products) => {
    //      res.render('shop/product-list', {
    //          prods: products,
    //          pageTitle: 'Shop',
    //          path: '/products',
    //          hasProducts: products.length > 0,
    //          activeShop: true,
    //          productCSS: true
    //      })
    // })

    // SQL
    const products = await Product.findAll()
    res.render('shop/product-list', {
         prods: products,
         pageTitle: 'Shop',
         path: '/products',
         hasProducts: products.length > 0,
         activeShop: true,
         productCSS: true
     })
}

exports.getProduct = async (req, res, next) => {
    //sendFile: gửi 1 file đến đường dẫn bên trong hàm, dirname: folder hiện tại
    const productId = req.params.productId
    // Product.findById(productId, (product) => {
    //     res.render('shop/product-detail', {
    //         prod: product,
    //         pageTitle: product.title,
    //         path: '/products'
    //     })
    // })

    //SQL
    const product = await Product.findAll({
        where: {
            id: productId
        }
    })
    res.render('shop/product-detail', {
        prod: product[0],
        pageTitle: 'abc',
        path: '/products'
    })
}


exports.getIndex = async (req, res, next) => {
    // Product.fetchAll((products) => {
    //     res.render('shop/index', {
    //         prods: products,
    //         pageTitle: 'Shop',
    //         path: '/',
    //         hasProducts: products.length > 0,
    //         activeShop: true,
    //         productCSS: true
    //     })
    // })

    //SQL
    const products = await Product.findAll()
    res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    })
}

exports.getCart = (req, res, next) => {
    Cart.getProducts((cart) => {
        const cartProducts = []
        Product.fetchAll(products => {
            products.forEach(product => {
                const cartProductData = cart.products.find(prod => prod.id === product.id)
                if (cartProductData) {
                    cartProducts.push({
                        productData: product,
                        qty: cartProductData.qty
                    })
                }
            })
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts
            })
        })
    })
}

exports.postCart = (req, res, next) => {
    const productId = req.body.productId
    Product.findById(productId, (product) => {
        Cart.addProduct(productId, product.price)
    })
    res.redirect('/cart')
}

exports.deleteCartProduct = (req, res, next) => {
    const { productId } = req.params
    Product.findById(productId, (product) => {
        Cart.deleteProduct(productId, product.price)
        res.redirect('/cart')
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