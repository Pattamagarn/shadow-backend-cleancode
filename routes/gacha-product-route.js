const express = require('express')
const router = express.Router()
const { createGachaProduct, readGachaProduct, readGachaProductOldToNew, readGachaProductNewToOld, readGachaProductCheapToExpensive,
        readGachaProductExpensiveToCheap, readGacha3Product, updateGachaProduct, deleteGachaProduct
        } = require('../controllers/gacha-product-controller')

router.post('/create-gacha-product', createGachaProduct)
router.get('/read-gacha-product', readGachaProduct)
router.get('/read-gacha-product-old-to-new', readGachaProductOldToNew)
router.get('/read-gacha-product-new-to-old', readGachaProductNewToOld)
router.get('/read-gacha-product-cheap-to-expensive', readGachaProductCheapToExpensive)
router.get('/read-gacha-product-expensive-to-cheap', readGachaProductExpensiveToCheap)
router.get('/read-gacha-3-product', readGacha3Product)
router.patch('/update-gacha-product/:uuid', updateGachaProduct)
router.delete('/delete-gacha-product/:uuid', deleteGachaProduct)

module.exports = router