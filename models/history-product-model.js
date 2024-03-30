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
        const requesUUID = request.body.uuid
        const requesEmail = request.body.email
        const requestGameName = request.body.game_name
        const requestProductName = request.body.product_name
        const requestProductPrice = request.body.product_price
        const requestBuyMethod = request.body.buy_method
        connection.query('INSERT INTO history_product (uuid, email, game_name, product_name, product_price, buy_method, create_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [requesUUID, requesEmail, requestGameName, requestProductName, requestProductPrice, requestBuyMethod, new Date()], (error, result) => {
                if (error) {
                    response.status(200).json({ status: false, payload: '' })
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
            connection.query('SELECT SUM(product_price) AS sumAysel FROM history_product', [], (error, result) => {
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