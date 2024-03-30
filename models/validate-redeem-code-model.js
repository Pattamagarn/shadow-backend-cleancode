const { isConnected, connection } = require('./connection')

module.exports.validateRedeemCode = (request, response) => {
    const requestGameName = Object.keys(request.body)[0]
    const requestRedeemCode = Object.values(request.body)[0]
    if(!isConnected){
        response.status(200).json({status: false, payload: 'no-product'})
    }else{
        connection.query('SELECT uuid, method_uuid FROM `store_product` WHERE (used_status = 0 OR used_status IS NULL) AND game_name = ? AND uuid = ?', [requestGameName, requestRedeemCode], (error,result) => {
            if(error || result.length <= 0){
                response.status(200).json({status: false, payload: 'not-product'})
            }else{
                const uuid = result[0].uuid
                const method_uuid = result[0].method_uuid
                connection.query('SELECT product_id FROM `general_product` WHERE uuid = ?', [method_uuid], (error,result1) => {
                    if(error || result.length <= 0){
                        response.status(200).json({status: false, payload: 'not-product'})
                    }else{
                        const product_id = result1[0].product_id
                        connection.query('UPDATE `store_product` SET used_status = ?, update_at = ? WHERE uuid = ?', [true, new Date(), uuid], (error, result2) => {
                            if(error){
                                response.status(200).json({status: false, payload: 'not-product'})
                            }else{
                                response.status(200).json({status: true, payload: product_id})
                            }
                        })
                    }
                })
            }
        })
    }
}