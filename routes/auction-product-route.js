const express = require('express')
const router = express.Router()
const {createAuctionProduct, readAuctionProduct,readAuction3Product, updateBid,updateAysel,updateAuctionProduct, deleteAuctionProduct} = require('../controllers/auction-product-controller')

router.post('/create-auction-product', createAuctionProduct)
router.get('/read-auction-product', readAuctionProduct)
router.get('/read-auction-3-product', readAuction3Product)
router.patch('/update-bid', updateBid)
router.patch('/update-aysel', updateAysel)
router.patch('/update-auction-product', updateAuctionProduct)
router.delete('/delete-auction-product/:uuid', deleteAuctionProduct)

module.exports = router