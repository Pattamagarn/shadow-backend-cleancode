const { isConnected, connection } = require('./connection')
const jsonwebtoken = require('jsonwebtoken')
const SECRET = process.env.SECRET
const multer = require('multer')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

module.exports.createHistoryProduct = (request, response) => {
    if (!isConnected) {
        response.status(200).json({ status: false, payload: 'ดึงข้อมูลล้มเหลว' })
    }
    else {
        const requesUUID = uuid.v4()
        const requesEmail = request.body.email
        const requestGameName = request.body.game_name
        const requestProductName = request.body.product_name
        const requestProductPrice = request.body.product_price
        const requestBuyMethod = request.body.buy_method
        connection.query('INSERT INTO history_product (uuid, email, game_name, product_name, product_price, buy_method, create_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [requesUUID, requesEmail, requestGameName, requestProductName, requestProductPrice, requestBuyMethod, new Date()], (error, result) => {
                if (error) {
                    response.status(200).json({ status: false, payload: error })
                } else {
                    response.status(200).json({ status: true, payload: 'ทำประวัติธุรกรรมเรียบร้อย' })
                }
            })
    }

}


module.exports.readHistoryProduct = (request, response) => {
    if (!isConnected) {
        response.status(200).json({ status: false, payload: 'ดึงข้อมูลล้มเหลว' })
    } else {
        try {
            const token = request.cookies.token
            const decoded = jsonwebtoken.verify(token, SECRET)
            const requestEmail = decoded.email
            connection.query('SELECT * FROM history_product WHERE email = ?', [requestEmail], (error, result) => {
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

module.exports.readSumAysel = (request, response) => {
    if (!isConnected) {
        response.status(200).json({ status: false, payload: 'ดึงข้อมูลล้มเหลว' })
    } else {
        try {
            connection.query('SELECT SUM(product_price) AS sum_aysel FROM history_product', [], (error, result) => {
                if (error) {
                    response.status(200).json({ status: false, payload: [] })
                } else {
                    response.status(200).json({ status: true, payload: result })
                }
            })
        } catch {
            response.status(200).json({ status: false, payload: 'ดึงข้อมูลล้มเหลว' })
        }
    }
}

module.exports.readSumBuyItems = (request, response) => {
    if (!isConnected) {
        response.status(200).json({ status: false, payload: 'ดึงข้อมูลล้มเหลว' })
    } else {
        try {
            connection.query('SELECT COUNT(uuid) AS sumBuyItem FROM history_product', [], (error, result) => {
                if (error) {
                    response.status(200).json({ status: false, payload: error})
                } else {
                    response.status(200).json({ status: true, payload: result })
                }
            })
        } catch {
            response.status(200).json({ status: false, payload: 'ดึงข้อมูลล้มเหลว' })
        }
    }
}

module.exports.readTop10 = (request, response) => {
    if (!isConnected) {
        response.status(200).json({ status: false, payload: 'ดึงข้อมูลล้มเหลว' })
    } else {
        try {
            connection.query('SELECT game_name, product_name, COUNT(*) AS count FROM history_product WHERE buy_method != "สินค้ากาชา" and buy_method != "สินค้าประมูล" GROUP BY product_name ORDER BY count DESC LIMIT 10', [], (error, result) => {
                if (error) {
                    response.status(200).json({ status: false, payload: [] })
                } else {
                    response.status(200).json({ status: true, payload: result })
                }
            })
        } catch {
            response.status(200).json({ status: false, payload: 'ดึงข้อมูลล้มเหลว' })
        }
    }
}