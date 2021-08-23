const express = require('express')
const router = express.Router()
const productController = require('../controllers/products')



//  / => GET
router.get('/', productController.getProducts)

module.exports = router