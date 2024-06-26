const { isConnected, connection } = require('./connection')
const jsonwebtoken = require('jsonwebtoken')
const SECRET = process.env.SECRET
const multer = require('multer')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

const storageGeneralProduct = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, './public/images/general-product')
    },
    filename: (request, file, callback) => {
        const fileExtension = file.originalname.split('.')[1]
        const fileName = `${uuid.v4()}${Date.now()}${Math.round(Math.random() * 1E9)}.${fileExtension}`
        callback(null, fileName)
        request.on('aborted', () => {
            const fullPath = path.join('./public/images/general-product', fileName)
            fs.unlinkSync(fullPath)
        })
    }
})

const upload = multer({
    storage: storageGeneralProduct,
    fileFilter: (request, file, callback) => {
        if (file.mimetype === 'image/png') {
            callback(null, true)
        } else {
            callback(new Error('ใช้ได้แค่ไฟล์ .png เท่านั้น'), false)
        }
    }
})

module.exports.createGeneralProduct = (request, response) => {
    if (!isConnected) {
        response.status(200).json({ status: false, payload: 'เพิ่มสินค้าล้มเหลว' })
    } else {
        upload.single('file')(request, response, (error) => {
            if (error) {
                response.status(200).json({ status: false, payload: 'ใช้ได้แค่ไฟล์ .png เท่านั้น' })
            } else {
                try {
                    const requestUUID = uuid.v4()
                    const requestProductId = request.body.productId
                    const requestGameName = request.body.gameName
                    const requestName = request.body.name
                    const requestNormalPrice = request.body.normalPrice
                    const requestSpecialPrice = request.body.specialPrice
                    const requestInformation = request.file.filename
                    const requestDescription = request.body.description
                    connection.query('INSERT INTO general_product (uuid, product_id, game_name, name, normal_price, special_price, special_price_status, information, description, create_at, update_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                        [requestUUID, requestProductId, requestGameName, requestName, requestNormalPrice, requestSpecialPrice, false, requestInformation, requestDescription, new Date(), new Date()], (error, result) => {
                            if (error) {
                                fs.unlinkSync(path.join('./public/images/general-product', request.file.filename))
                                response.status(200).json({ status: false, payload: 'เพิ่มสินค้าล้มเหลว' })
                            } else {
                                response.status(200).json({ status: true, payload: 'เพิ่มสินค้าสำเร็จ' })
                            }
                        })
                } catch (error) {
                    try {
                        fs.unlinkSync(path.join('./public/images/general-product', request.file.filename))
                        response.status(200).json({ status: false, payload: 'เพิ่มสินค้าล้มเหลว' })
                    } catch (error) {
                        response.status(200).json({ status: false, payload: 'กรุณาใส่รูปภาพ' })
                    }
                }
            }
        })
    }
}

module.exports.readGeneralProduct = (request, response) => {
    connection.query('SELECT * FROM general_product', [], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: [] })
        } else {
            response.status(200).json({ status: true, payload: result })
        }
    })
}

module.exports.readGeneralProductWithUUID = (request, response) => {
    const requestUUID = request.params.uuid 
    connection.query('SELECT * FROM general_product WHERE uuid = ?', [requestUUID], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: [] })
        } else {
            response.status(200).json({ status: true, payload: result })
        }
    })
}

module.exports.readGeneralProductWithName = (request, response) => {
    const requestName = request.params.name
    connection.query('SELECT * FROM general_product WHERE name = ?', [requestName], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: []})
        } else {
            console.log(result)
            response.status(200).json({ status: true, payload: result })
        }
    })
}

module.exports.readGeneralProductOldToNew = (request, response) => {
    connection.query('SELECT * FROM general_product ORDER BY update_at', [], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: [] })
        } else {
            response.status(200).json({ status: true, payload: result })
        }
    })
}

module.exports.readGeneralProductNewToOld = (request, response) => {
    connection.query('SELECT * FROM general_product ORDER BY update_at DESC', [], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: [] })
        } else {
            response.status(200).json({ status: true, payload: result })
        }
    })
}

module.exports.readGeneralProductCheapToExpensive = (request, response) => {
    connection.query('SELECT * FROM general_product ORDER BY normal_price', [], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: [] })
        } else {
            response.status(200).json({ status: true, payload: result })
        }
    })
}

module.exports.readGeneralProductExpensiveToCheap = (request, response) => {
    connection.query('SELECT * FROM general_product ORDER BY normal_price DESC', [], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: [] })
        } else {
            response.status(200).json({ status: true, payload: result })
        }
    })
}

module.exports.readGeneral3Product = (request, response) => {
    connection.query('SELECT * FROM general_product LIMIT 3', [], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: [] })
        } else {
            response.status(200).json({ status: true, payload: result })
        }
    })
}

module.exports.updateGeneralProduct = (request, response) => {
    const requestUUID = request.params.uuid
    const requestName = request.body.name
    const requestGameName = request.body.game_name
    const requestNormalPrice = request.body.normal_price
    const requestSpecialPrice = request.body.special_price
    const requestInformation = request.body.information
    const requestDescription = request.body.description
    connection.query('UPDATE general_product SET name = ? , game_name = ? , normal_price = ? , special_price = ? , information = ? , description = ? , update_at = ? WHERE uuid = ? LIMIT 1',
        [requestName, requestGameName, requestNormalPrice, requestSpecialPrice, requestInformation, requestDescription, new Date(), requestUUID], (error, result) => {
            if (error) {
                response.status(200).json({ status: false, payload: ''})
            } else {
                response.status(200).json({ status: true, payload: 'แก้ไขสำเร็จ' })
            }
        })
}

module.exports.updateStatusPrice = (request, response) => {
    const requestUUID = request.params.uuid;
    const requestStatus = request.body.special_price_status;
    if (requestStatus === 0) {
        connection.query('UPDATE general_product SET special_price_status = 1, update_at = ? WHERE uuid = ? LIMIT 1',
            [new Date(), requestUUID], (error, result) => {
                if (error) {
                    response.status(200).json({ status: false, payload: '' });
                } else {
                    response.status(200).json({ status: true, payload: 'เปิดสถานะการลดราคาสำเร็จ' });
                }
            });
    } else if (requestStatus === 1) {
        connection.query('UPDATE general_product SET special_price_status = 0, update_at = ? WHERE uuid = ? LIMIT 1',
            [new Date(), requestUUID], (error, result) => {
                if (error) {
                    console.log(error);
                    response.status(200).json({ status: false, payload: '' });
                } else {
                    response.status(200).json({ status: true, payload: 'ปิดสถานะการลดราคาสำเร็จ' });
                }
            });
    }
}


module.exports.deleteGeneralProduct = (request, response) => {
    const requestUUID = request.params.uuid
    connection.query('SELECT information FROM general_product WHERE uuid = ?', [requestUUID], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: 'ลบสินค้าล้มเหลว' })
        } else {
            const information = result[0].information
            connection.query('DELETE FROM general_product WHERE uuid = ?', [requestUUID], (error, result) => {
                if (error) {
                    response.status(200).json({ status: false, payload: 'ลบสินค้าล้มเหลว' })
                } else {
                    fs.unlinkSync(path.join('./public/images/general-product', information))
                    response.status(200).json({ status: true, payload: 'ลบสินค้าสำเร็จ' })
                }
            })
        }
    })
}

// -------------------------------------------------------------------- [ Promotion ] -------------------------------------------------------------------- //

module.exports.readPromotionProduct = (request, response) => {
    connection.query('SELECT * FROM general_product WHERE special_price_status = 1', [], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: [] })
        } else {
            response.status(200).json({ status: true, payload: result })
        }
    })
}

module.exports.readPromotionProductWithUUID = (request, response) => {
    const requestUUID = request.params.uuid 
    connection.query('SELECT * FROM general_product WHERE special_price_status = 1 and uuid = ?', [requestUUID], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: [] })
        } else {
            response.status(200).json({ status: true, payload: result })
        }
    })
}

module.exports.readPromotionProductOldToNew = (request, response) => {
    connection.query('SELECT * FROM general_product WHERE special_price_status = 1 ORDER BY update_at', [], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: [] })
        } else {
            response.status(200).json({ status: true, payload: result })
        }
    })
}

module.exports.readPromotionProductNewToOld = (request, response) => {
    connection.query('SELECT * FROM general_product WHERE special_price_status = 1 ORDER BY update_at DESC', [], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: [] })
        } else {
            response.status(200).json({ status: true, payload: result })
        }
    })
}

module.exports.readPromotionProductCheapToExpensive = (request, response) => {
    connection.query('SELECT * FROM general_product WHERE special_price_status = 1 ORDER BY normal_price', [], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: [] })
        } else {
            response.status(200).json({ status: true, payload: result })
        }
    })
}

module.exports.readPromotionProductExpensiveToCheap = (request, response) => {
    connection.query('SELECT * FROM general_product WHERE special_price_status = 1 ORDER BY normal_price DESC', [], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: [] })
        } else {
            response.status(200).json({ status: true, payload: result })
        }
    })
}

module.exports.readPromotion3Product = (request, response) => {
    connection.query('SELECT * FROM general_product WHERE special_price_status = 1 LIMIT 3', [], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: [] })
        } else {
            response.status(200).json({ status: true, payload: result })
        }
    })
}