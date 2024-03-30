const { isConnected, connection } = require('./connection')
const jsonwebtoken = require('jsonwebtoken')
const SECRET = process.env.SECRET
const multer = require('multer')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const storageAvatar = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, './public/images/avatar')
    },
    filename: (request, file, callback) => {
        const fileExtension = file.originalname.split('.')[1]
        const fileName = `${uuid.v4()}${Date.now()}${Math.round(Math.random() * 1E9)}.${fileExtension}`
        callback(null, fileName)
        request.on('aborted', () => {
            const fullPath = path.join('./public/images/avatar', fileName)
            fs.unlinkSync(fullPath)
        })
    }
})

const upload = multer({
    storage: storageAvatar,
    fileFilter: (request, file, callback) => {
        if(file.mimetype === 'image/png'){
            callback(null, true)
        }else{
            callback(new Error('ใช้ได้แค่ไฟล์ .png เท่านั้น'), false)
        }
    }
})

module.exports.validationAccount = (request, response) => {
    const atLeastOneUppercase = /[A-Z]/g
    const atLeastOneLowercase = /[a-z]/g
    const atLeastOneNumeric = /[0-9]/g
    const atLeastOneSpecialChar = /[#?!@$%^&*-]/g
    const eightCharsOrMore = /.{8,}/g
    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
    const requestEmail = request.body.email
    const requestUsername = request.body.username
    const requestPassword = request.body.password
    const requestConfirmPassword = request.body.confirmPassword

    if(requestUsername.length <= 0){
        response.status(200).json({status:false, payload: 'กรุณากรอกนามแฝง'})
    }else if(requestEmail.length <= 0){
        response.status(200).json({status:false, payload: 'กรุณากรอกอีเมล'})
    }else if(requestPassword.length <= 0){
        response.status(200).json({status:false, payload: 'กรุณากรอกรหัสผ่าน'})
    }else if(requestConfirmPassword.length <= 0){
        response.status(200).json({status:false, payload: 'กรุณายืนยันรหัสผ่าน'})
    }else if(!requestEmail.match(emailRegex)){
        response.status(200).json({status:false, payload: 'กรุณากรอกรูปแบบอีเมลให้ถูกต้อง'})
    }else if(!requestPassword.match(eightCharsOrMore)){
        response.status(200).json({status:false, payload: 'ต้องการความยาวรหัสผ่านอย่างน้อย 8 ตัว'})
    }else if(!requestPassword.match(atLeastOneLowercase)){
        response.status(200).json({status:false, payload: 'ต้องการตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว'})
    }else if(!requestPassword.match(atLeastOneUppercase)){
        response.status(200).json({status:false, payload: 'ต้องการตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว'})
    }else if(!requestPassword.match(atLeastOneNumeric)){
        response.status(200).json({status:false, payload: 'ต้องการตัวเลขอย่างน้อย 1 ตัว'})
    }else if(!requestPassword.match(atLeastOneSpecialChar)){
        response.status(200).json({status:false, payload: 'ต้องการตัวอักษรพิเศษอย่างน้อย 1 ตัว'})
    }else if(requestPassword !== requestConfirmPassword){
        response.status(200).json({status:false, payload: 'กรุณากรอกรหัสผ่าน และ ยืนยันรหัสผ่านให้ตรงกัน'})
    }else{
        response.status(200).json({status:true, payload: 'ผ่านการตรวจสอบ'})
    }
}

const getDefaultAvatar = (requestUsername) => {
    const avatarName = requestUsername.at(0).toLowerCase()
    if(avatarName !== requestUsername.at(0).toUpperCase()){
        return `${avatarName}.png`
    }else{
        return 'default.png'
    }
}

module.exports.signUpAccount = (request, response) => {
    const requestEmail = request.body.email
    const requestUsername = request.body.username
    const requestAvatar = getDefaultAvatar(requestUsername)
    if(!isConnected){
        response.status(200).json({status: false, payload: 'สร้างบัญชีล้มเหลว'})
    }else{
        connection.query('INSERT INTO account (email, username, avatar) VALUES (?, ?, ?)', [requestEmail, requestUsername, requestAvatar], (error, result) => {
            if(error){
                response.status(200).json({status: false, payload: 'สร้างบัญชีล้มเหลว'})
            }else{
                connection.query('INSERT INTO finance (email) VALUES (?)', [requestEmail], (error, result) => {
                    if(error){
                        response.status(200).json({status: false, payload: 'สร้างบัญชีล้มเหลว'})
                    }else{
                        response.status(200).json({status: true, payload: 'สร้างบัญชีสำเร็จ'})
                    }
                })
            }
        })
    }
}

module.exports.signInAccount = (request, response) => {
    const requestEmail = request.body.email
    if(!isConnected){
        response.status(200).json({status: false, payload: 'เข้าสู่ระบบล้มเหลว'})
    }else{
        connection.query('SELECT email, suspended_status, role FROM account WHERE email = ?', [requestEmail], (error, result) => {
            if(error || result.length !== 1){
                response.status(200).json({status: false, payload: 'ชื่อผู้ใช้ หรือรหัสผ่านไม่ถูกต้อง'})
            }else if(result[0].suspended_status !== 0){
                response.status(200).json({status: false, payload: 'บัญชีนี้ถูกระงับ'})
            }else{ 
                const token = jsonwebtoken.sign({email: result[0].email}, SECRET, { expiresIn: '1h' })
                response.cookie('token', token, {
                    maxAge: 3600000,
                    secure: true,
                    httpOnly: true,
                    sameSite: 'none',
                })
                response.status(200).json({status: true, payload: token})
            }
        })
    }
}

module.exports.authenticationAccount = (request, response) => {
    try{
        const token = request.cookies.token
        const decoded = jsonwebtoken.verify(token, SECRET)
        const requestEmail = decoded.email
        if(!isConnected){
            response.status(200).json({status: false, payload: 'เกิดข้อผิดพลาดที่ไม่รู้จัก'})
        }else{
            connection.query('SELECT email, username, avatar, role, gacha_count FROM account WHERE email = ?', [requestEmail], (error, result) => {
                if(error || result.length !== 1){
                    response.status(200).json({status: false, payload: 'เกิดข้อผิดพลาดที่ไม่รู้จัก'})
                }else{
                    let resultAccount = result
                    connection.query('SELECT aysel_amount FROM finance WHERE email = ?', [requestEmail], (error, result) => {
                        if(error || result.length !== 1){
                            response.status(200).json({status: false, payload: 'เกิดข้อผิดพลาดที่ไม่รู้จัก'})
                        }else{
                            resultAccount[0].aysel_amount = result[0].aysel_amount
                            response.status(200).json({status: true, payload: resultAccount[0]})
                        }
                    })
                }
            })
        }
    }catch(error){
        response.status(200).json({status: false, payload: 'เกิดข้อผิดพลาดที่ไม่รู้จัก'})
    }
}

module.exports.signOutAccount = (request, response) => {
    response.cookie('token', null, {
        maxAge: 0,
        secure: true,
        httpOnly: true,
        sameSite: 'none',
    })
    response.status(200).json({status: false, payload: {}})
}

module.exports.selectAccount = (request, response) => {
    if(!isConnected){
        response.status(200).json({status: false, payload: 'การแสดงข้อมูลล้มเหลว'})
    }else{
        connection.query('SELECT email, username, suspended_status, role FROM account', [], (error, result) => {
            if(error){
                response.status(200).json({status: false, payload: 'การแสดงข้อมูลล้มเหลว'})
            }else{ 
                response.status(200).json({status: true, payload: result})
            }
        })
    }
}

module.exports.updateStatusAccount = (request, response) => {
    const requestEmail = request.params.email;
    const requestStatus = request.body.suspended_status;
    if (requestStatus === 0) {
        connection.query('UPDATE account SET suspended_status = 1, update_at = ? WHERE email = ? LIMIT 1',
            [new Date(), requestEmail], (error, result) => {
                if (error) {
                    response.status(200).json({ status: false, payload: '' });
                } else {
                    response.status(200).json({ status: true, payload: 'ระงับผู้ใช้สำเร็จ' });
                }
            });
    } else if (requestStatus === 1) {
        connection.query('UPDATE account SET suspended_status = 0, update_at = ? WHERE email = ? LIMIT 1',
            [new Date(), requestEmail], (error, result) => {
                if (error) {
                    console.log(error);
                    response.status(200).json({ status: false, payload: '' });
                } else {
                    response.status(200).json({ status: true, payload: 'ปลดระงับผู้ใช้สำเร็จ' });
                }
            });
    }
}

module.exports.updateUsername = (request, response) => {
    const requestEmail = request.params.email
    const requestUsername = request.body.username
    connection.query('UPDATE account SET username = ?, update_at = ? WHERE email = ?',
        [requestUsername, new Date(), requestEmail], (error, result) => {
            if (error) {
                response.status(200).json({ status: false, payload: error })
            } else {
                response.status(200).json({ status: true, payload: 'แก้ไขชื่อสำเร็จ' })
            }
        })
}

module.exports.updateAvatar = (request, response) => {
    upload.single('file')(request, response, (error) => {
        if(error){
            response.status(200).json({status: false, payload: 'ใช้ได้แค่ไฟล์ .png เท่านั้น'})
        }else{
            try{
                const token = request.cookies.token
                jsonwebtoken.verify(token, SECRET)
                const requestEmail = request.body.email
                const requestAvatar = request.file.filename
                connection.query('SELECT avatar FROM account WHERE email = ?', [requestEmail], (error, result) => {
                    if(error){
                        response.status(200).json({status: false, payload: 'การแก้ไขรูปโปรไฟล์ล้มเหลว1'})
                    }else{
                        const avatar = result[0].avatar
                        fs.unlinkSync(path.join('./public/images/avatar', avatar))
                        connection.query('UPDATE account SET avatar = ?, update_at = ? WHERE email = ?', [requestAvatar, new Date(), requestEmail], (error, result) => {
                            if(error){
                                response.status(200).json({status: false, payload: 'การแก้ไขรูปโปรไฟล์ล้มเหลว2'})
                            }else{
                                response.status(200).json({status: true, payload: 'แก้ไขสำเร็จ'})
                            }
                        })
                    }
                })
            }catch(error){
                console.log(error)
                try{
                    fs.unlinkSync(path.join('./public/images/avatar', request.file.filename))
                    response.status(200).json({status: false, payload: 'การแก้ไขรูปโปรไฟล์ล้มเหลว3'})
                }catch{
                    response.status(200).json({status: false, payload: 'การแก้ไขรูปโปรไฟล์ล้มเหลว4'})
                }
            }
        }
    })
}

module.exports.updateGachaCount = (request, response) => {
    const requestEmail = request.params.email
    const requestGachaCount = request.body.gacha_count
    connection.query('UPDATE account SET gacha_count = ?, update_at = ? WHERE email = ?',
        [requestGachaCount, new Date(), requestEmail], (error, result) => {
            if (error) {
                response.status(200).json({ status: false, payload: error })
            } else {
                response.status(200).json({ status: true, payload: 'แก้ไขชื่อสำเร็จ' })
            }
        })
}