const express = require('express')
const router = express.Router()
const {createGeneralProduct, readGeneralProduct,readGeneral3Product,readPromotion3Product, updateGeneralProduct, deleteGeneralProduct} = require('../controllers/general-product-controller')

router.post('/create-general-product', createGeneralProduct)
router.get('/read-general-product', readGeneralProduct)
router.get('/read-general-3-product', readGeneral3Product)
router.get('/read-promotion-3-product', readPromotion3Product)
router.patch('/update-general-product', updateGeneralProduct)
router.delete('/delete-general-product/:uuid', deleteGeneralProduct)

module.exports = router