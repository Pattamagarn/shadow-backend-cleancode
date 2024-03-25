const express = require('express')
const router = express.Router()
const { createStoreProduct,readStoreProduct } = require('../controllers/store-product-controller')

router.post('/create-store-product', createStoreProduct)
router.get('/read-store-product', readStoreProduct)

module.exports = router