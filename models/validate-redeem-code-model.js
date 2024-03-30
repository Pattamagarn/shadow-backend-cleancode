// const { isConnected, connection } = require('./connection')

module.exports.validateRedeemCode = (request, response) => {
    console.log(request.body)
    response.status(200).json({status: true, payload: 'tier-five-axe-tool'})
}