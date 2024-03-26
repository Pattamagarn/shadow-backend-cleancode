const { isConnected, connection } = require('./connection')
const uuid = require('uuid')

module.exports.logRedeemCode = (request, response) => {
    const requestUUID = uuid.v4()
    const requestGameName = Object.keys(request.body)[0]
    const requestGameProducts = Object.values(request.body)[0]
    if(isConnected){
        connection.query('INSERT INTO game_name (uuid, game_name) VALUES (?, ?)', [requestUUID, requestGameName], (error, result) => {})
        connection.query('DELETE FROM game_product WHERE game_name = ?', [requestGameName], (error, result) => {})
        for (let index = 0; index < requestGameProducts.length; ++index){
          const requestGameProduct = requestGameProducts[index]
          connection.query('INSERT INTO game_product (uuid, product_id, game_name, name, description) VALUES (?, ?, ?, ?, ?)',
          [uuid.v4(), requestGameProduct.product_id, requestGameName, requestGameProduct.name, requestGameProduct.description], (error, result) => {})
        }
    }
    response.status(200).json({status: true, payload: `การบันทึกสินค้าของเกม ${requestGameName} สำเร็จ`})
}