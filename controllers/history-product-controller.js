const historyProductModel = require('../models/history-product-model')

exports.createHistoryProduct = (request, response) => {
    historyProductModel.createHistoryProduct(request, response)
}

exports.readHistoryProduct = (request, response) => {
    historyProductModel.readHistoryProduct(request, response)
}