const nodemailer = require('nodemailer')

let verifyOTP = ''

module.exports.sendOTP = async (request, response) => {
    const email = request.body.email
    const smtpUsername = process.env.SMTPUSERNAME
    const smtpPassword = process.env.SMTPPASSWORD
    const minOTP = 100000
    const maxOTP = 999999
    const OTP = (Math.floor(minOTP + Math.random() * (maxOTP - minOTP))).toString()
    try{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: smtpUsername,
                pass: smtpPassword
            }
        })
        const verify = await transporter.verify()
        if(verify){
            const mailOptions = {
                from: `${smtpUsername}`,
                to: `${email}`,
                subject: `[SHADOW] โปรดตรวจสอบรหัส OTP`,
                text: `รหัส OTP ของคุณคือ ${OTP}`
            }
            await transporter.sendMail(mailOptions)
            verifyOTP = OTP
            response.status(200).json({'status': true, 'message': 'กรุณาตรวจสอบอีเมล'})
            return
        }else{
            response.status(500).json({'status': false, 'message': 'สมัครสมาชิกไม่สำเร็จ'})
            return
        }
    }catch(error){
        response.status(500).json({'status': false, 'message': 'สมัครสมาชิกไม่สำเร็จ'})
        return
    }
}

module.exports.reciveOTP = (request, response) => {
    const recivedOTP = request.body.recivedOTP
    if(recivedOTP === verifyOTP){
        response.status(200).json({'status': true, 'message': 'ยืนยัน OTP สำเร็จ'})
    }else{
        response.status(200).json({'status': false, 'message': 'รหัส OTP ไม่ถูกต้อง'})
    }
}