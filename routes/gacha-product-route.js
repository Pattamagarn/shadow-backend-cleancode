const express = require('express')
const router = express.Router()
const {createGachaProduct, readGachaProduct,readGacha3Product, updateGachaProduct, deleteGachaProduct} = require('../controllers/gacha-product-controller')

router.post('/create-gacha-product', createGachaProduct)
router.get('/read-gacha-product', readGachaProduct)
router.get('/read-gacha-3-product', readGacha3Product)
router.patch('/update-gacha-product', updateGachaProduct)
router.delete('/delete-gacha-product/:uuid', deleteGachaProduct)

module.exports = router