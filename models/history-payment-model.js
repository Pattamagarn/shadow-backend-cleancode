const { isConnected, connection } = require('./connection')
const jsonwebtoken = require('jsonwebtoken')
const SECRET = process.env.SECRET

module.exports.readHistoryPayment = (request, response) => {
    if(!isConnected){
        response.status(200).json({status: false, payload: 'ดึงข้อมูลล้มเหลว'})
    }else{
        try{
            const token = request.cookies.token
            const decoded = jsonwebtoken.verify(token, SECRET)
            const requestEmail = decoded.email
            connection.query('SELECT aysel_amount , cash_amount , payment_status , create_at FROM history_payment WHERE email = ?', [requestEmail], (error, result) => {
                if (error) {
                    response.status(200).json({ status: false, payload: 'ดึงข้อมูลล้มเหลว' })
                } else {
                    response.status(200).json({ status: true, payload: result })
                }
            })
        }catch{
            response.status(200).json({ status: false, payload: 'ดึงข้อมูลล้มเหลว' })
        }
    }
}