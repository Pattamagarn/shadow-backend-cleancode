const historyPaymentModel = require('../models/history-payment-model')

exports.readHistoryPayment = (request, response) => {
    historyPaymentModel.readHistoryPayment(request, response)
}