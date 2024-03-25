const express = require('express')
const router = express.Router()
const { createHistoryProduct,readHistoryProduct } = require('../controllers/history-product-controller')

router.post('/create-history-product', createHistoryProduct)
router.get('/read-history-product', readHistoryProduct)

module.exports = router