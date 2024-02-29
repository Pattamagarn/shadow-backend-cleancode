const express = require('express')
const router = express.Router()
const { readHistoryPayment } = require('../controllers/history-payment-controller')

router.get('/read-history-payment', readHistoryPayment)

module.exports = router