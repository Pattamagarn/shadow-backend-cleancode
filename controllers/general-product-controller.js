const generalProductModel = require('../models/general-product-model')

exports.createGeneralProduct = (request, response) => {
    generalProductModel.createGeneralProduct(request, response)
}

exports.readGeneralProduct = (request, response) => {
    generalProductModel.readGeneralProduct(request, response)
}

exports.readGeneral3Product = (request, response) => {
    generalProductModel.readGeneral3Product(request, response)
}

exports.readPromotion3Product = (request, response) => {
    generalProductModel.readPromotion3Product(request, response)
}

exports.updateGeneralProduct = (request, response) => {
    generalProductModel.updateGeneralProduct(request, response)
}

exports.deleteGeneralProduct = (request, response) => {
    generalProductModel.deleteGeneralProduct(request, response)
}