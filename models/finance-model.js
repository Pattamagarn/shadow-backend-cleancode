const { isConnected, connection } = require('./connection')
const jsonwebtoken = require('jsonwebtoken')
const SECRET = process.env.SECRET
const multer = require('multer')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

module.exports.updateAysel = (request, response) => {
    const requesEmail = request.body.email
    const requestAyselAmount = request.body.aysel_amount
    // console.log(`After aysel ${requestAyselAmount}`)
    connection.query('UPDATE finance SET aysel_amount = ?, update_at = ? WHERE email = ?',
        [requestAyselAmount, new Date(), requesEmail], (error, result) => {
            if (error) {
                response.status(200).json({ status: false, payload: 'แก้ไขไม่สำเร็จ' })
            } else {
                response.status(200).json({ status: true, payload: 'แก้ไขสำเร็จ' })
            }
        })
}