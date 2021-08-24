const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin')

//  /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct)

// /admin/add-product => POST
router.post('/add-product', adminController.addProduct)

// /admin/products => GET
router.get('/products', adminController.getProducts)

module.exports = router