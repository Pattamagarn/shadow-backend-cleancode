const { isConnected, connection } = require('./connection')
const jsonwebtoken = require('jsonwebtoken')
const SECRET = process.env.SECRET
const multer = require('multer')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

module.exports.createStoreProduct = (request, response) => {
    if (!isConnected) {
        response.status(200).json({ status: false, payload: 'ดึงข้อมูลล้มเหลว' })
    }
    else {
        const requesUUID = uuid.v4()
        const requesEmail = request.body.email
        const requestGameName = request.body.game_name
        const requestProductName = request.body.product_name
        const requestUsedStatus = request.body.used_status
        const requestMethodUUID = request.body.method_uuid
        connection.query('INSERT INTO store_product (uuid, email, method_uuid, game_name, product_name, used_status, create_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [requesUUID, requesEmail, requestMethodUUID, requestGameName, requestProductName, requestUsedStatus, new Date()], (error, result) => {
                if (error) {
                    response.status(200).json({ status: false, payload: '' })
                } else {
                    response.status(200).json({ status: true, payload: 'เพิ่มสินค้าเรียบร้อย' })
                }
            })
    }

}


module.exports.readStoreProduct = (request, response) => {
    if (!isConnected) {
        response.status(200).json({ status: false, payload: 'ดึงข้อมูลล้มเหลว' })
    } else {
        try {
            const token = request.cookies.token
            const decoded = jsonwebtoken.verify(token, SECRET)
            const requestEmail = decoded.email
            connection.query('SELECT * FROM store_product WHERE email = ?', [requestEmail], (error, result) => {
                if (error) {
                    response.status(200).json({ status: false, payload: 'ดึงข้อมูลล้มเหลว' })
                } else {
                    response.status(200).json({ status: true, payload: result })
                }
            })
        } catch {
            response.status(200).json({ status: false, payload: 'ดึงข้อมูลล้มเหลว' })
        }
    }
}