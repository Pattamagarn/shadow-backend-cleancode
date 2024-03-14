const auctionProductModel = require('../models/auction-product-model')

exports.createAuctionProduct = (request, response) => {
    auctionProductModel.createAuctionProduct(request, response)
}

exports.readAuctionProduct = (request, response) => {
    auctionProductModel.readAuctionProduct(request, response)
}

exports.readAuction3Product = (request, response) => {
    auctionProductModel.readAuction3Product(request, response)
}

exports.updateAuctionProduct = (request, response) => {
    auctionProductModel.updateAuctionProduct(request, response)
}

exports.updateBid = (request, response) => {
    auctionProductModel.updateBid(request, response)
}

exports.updateAysel = (request, response) => {
    auctionProductModel.updateAysel(request, response)
}

exports.deleteAuctionProduct = (request, response) => {
    auctionProductModel.deleteAuctionProduct(request, response)
}