const express = require('express')
const router = express.Router()
const { logRedeemCode } = require('../controllers/log-redeem-code-controller')

router.post('/log-redeem-code', logRedeemCode)

module.exports = router