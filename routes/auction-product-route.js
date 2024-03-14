const express = require('express')
const router = express.Router()
const { createAuctionProduct, readAuctionProduct, readAuctionProductOldToNew, readAuctionProductNewToOld, readAuctionProductCheapToExpensive,
        readAuctionProductExpensiveToCheap, readAuction3Product, updateBid, updateAysel, updateAuctionProduct, deleteAuctionProduct
        } = require('../controllers/auction-product-controller')

router.post('/create-auction-product', createAuctionProduct)
router.get('/read-auction-product', readAuctionProduct)
router.get('/read-auction-product-old-to-new', readAuctionProductOldToNew)
router.get('/read-auction-product-new-to-old', readAuctionProductNewToOld)
router.get('/read-auction-product-cheap-to-expensive', readAuctionProductCheapToExpensive)
router.get('/read-auction-product-expensive-to-cheap', readAuctionProductExpensiveToCheap)
router.get('/read-auction-3-product', readAuction3Product)
router.patch('/update-auction-product/:uuid', updateAuctionProduct)
router.patch('/update-bid', updateBid)
router.patch('/update-aysel', updateAysel)
router.delete('/delete-auction-product/:uuid', deleteAuctionProduct)

module.exports = router