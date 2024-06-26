const { isConnected, connection } = require('./connection')
const jsonwebtoken = require('jsonwebtoken')
const SECRET = process.env.SECRET
const multer = require('multer')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const storagePaymentMethod = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, './public/images/payment-method')
    },
    filename: (request, file, callback) => {
        const fileExtension = file.originalname.split('.')[1]
        const fileName = `${uuid.v4()}${Date.now()}${Math.round(Math.random() * 1E9)}.${fileExtension}`
        callback(null, fileName)
        request.on('aborted', () => {
            const fullPath = path.join('./public/images/payment-method', fileName)
            fs.unlinkSync(fullPath)
        })
    }
})

const upload = multer({
    storage: storagePaymentMethod,
    fileFilter: (request, file, callback) => {
        if (file.mimetype === 'image/png') {
            callback(null, true)
        } else {
            callback(new Error('ใช้ได้แค่ไฟล์ .png เท่านั้น'), false)
        }
    }
})

module.exports.paymentMethodSelect = (request, response) => {
    connection.query('SELECT uuid, method, information, create_at, update_at FROM payment_method', [], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: error })
        } else {
            response.status(200).json({ status: true, payload: result })
        }
    })
}

module.exports.paymentMethodUpdateImage = (request, response) => {
    upload.single('file')(request, response, (error) => {
        if(error){
            response.status(200).json({status: false, payload: `ใช้ได้แค่ไฟล์ .png เท่านั้น`})
        }else{
            try{
                // const token = request.cookies.token
                // jsonwebtoken.verify(token, SECRET)
                const requestUUID = request.body.uuid
                const requestInformation = request.file.filename
                connection.query('SELECT information FROM payment_method WHERE uuid = ?', [requestUUID], (error, result) => {
                    if(error){
                        response.status(200).json({status: false, payload: 'แก้ไขล้มเหลว0'})
                    }else{
                        connection.query('UPDATE payment_method SET information = ?, update_at = ? WHERE uuid = ?', [requestInformation, new Date(), requestUUID], (error, result) => {
                            if (error) {
                                response.status(200).json({ status: false, payload: 'แก้ไขล้มเหลว' })
                            } else {
                                response.status(200).json({ status: true, payload: 'แก้ไขสำเร็จ' })
                            }
                        })
                    }
                })
            }catch(error){
                try {
                    response.status(200).json({ status: false, payload: 'แก้ไขภาพวิธีชำระเงินล้มเหลว1' })
                }
                catch(error){
                    response.status(200).json({status: false, payload: 'แก้ไขภาพวิธีชำระเงินล้มเหลว2'})
                }
            }
        }
    })
}

module.exports.paymentMethodUpdateVideo = (request, response) => {
    const requestUUID = request.body.uuid
    const requestInformation = request.body.information
    connection.query('UPDATE payment_method SET information = ?, update_at = ? WHERE uuid = ?', [requestInformation, new Date(), requestUUID], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: 'แก้ไขล้มเหลว' })
        } else {
            response.status(200).json({ status: true, payload: 'แก้ไขสำเร็จ' })
        }
    })
}

module.exports.deletePaymentMethodImage = (request, response) => {
    const requestUUID = request.params.uuid
    connection.query('SELECT information FROM payment_method WHERE uuid = ?', [requestUUID], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: 'ลบ Payment Method Image ล้มเหลว' })
        } else {
            const information = result[0].information
            connection.query("UPDATE payment_method SET information = '' WHERE uuid = ?", [requestUUID], (error, result) => {
                if (error) {
                    response.status(200).json({ status: false, payload: 'ลบ Payment Method Image ล้มเหลว' })
                } else {
                    fs.unlinkSync(path.join('./public/images/payment_method', information))
                    response.status(200).json({ status: true, payload: 'ลบ Payment Method Image สำเร็จ' })
                }
            })
        }
    })
}

module.exports.deletePaymentMethodVideo = (request, response) => {
    const requestUUID = request.params.uuid
    connection.query('SELECT information FROM payment_method WHERE uuid = ?', [requestUUID], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: 'ลบ Payment Method video ล้มเหลว' })
        } else {
            connection.query("UPDATE payment_method SET information = '' WHERE uuid = ?", [requestUUID], (error, result) => {
                if (error) {
                    response.status(200).json({ status: false, payload: 'ลบ Payment Method video ล้มเหลว' })
                } else {
                    response.status(200).json({ status: true, payload: 'ลบ Payment Method video สำเร็จ' })
                }
            })
        }
    })
}