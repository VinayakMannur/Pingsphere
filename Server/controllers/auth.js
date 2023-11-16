const User = require("../models/user");
const ResetPassword = require("../models/resetPassword");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const filterObj = require('../util/filterObj')
const otpGenerator = require('otp-generator')
const { Op } = require("sequelize");
const { v4: uuidv4 } = require('uuid');
const resetPassword = require("../Templates/resetPassword");
// const mailService = require('../services/mailer')
const brevo = require('@getbrevo/brevo');

const JWT_SECRET = process.env.TOCKEN_SECRET;

exports.signup = async (req, res, next) => {
    try {
        
        const { firstName, lastName, email, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        req.body.password = hash
        
        const existing_user = await User.findOne({ where: { email: email } });

        const filteredBody = filterObj(req.body, "firstName", "lastName", "password", "email", "phonenumber")

        if(existing_user && existing_user.verified){
            res.status(400).json({status: "error", msg: "Email already in use, Please Login!"})
        }
        else if(existing_user){
            existing_user.set(filteredBody)
            const updated_user = await existing_user.save()

            req.userId = updated_user.id
            next()
        }
        else{
            const new_user = await User.create(filteredBody)
            req.userId = new_user.id
            next()
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "error", msg: "Internal Server Error!!" })
    }
}

exports.sendOTP = async (req, res, next) => {
    try {
        
        const {userId} = req

        const new_otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false })
        console.log("OTP", new_otp);

        let defaultClient = brevo.ApiClient.instance;

        let apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = process.env.SG_KEY;

        let apiInstance = new brevo.TransactionalEmailsApi();
        let sendSmtpEmail = new brevo.SendSmtpEmail();

        sendSmtpEmail.subject = "{{params.subject}}";
        sendSmtpEmail.htmlContent = "<html><body><h1>OTP to verify your email {{params.parameter}}</h1></body></html>";
        sendSmtpEmail.sender = { "name": "Vinayak", "email": "vinayakmannur20@gmail.com" };
        sendSmtpEmail.to = [
            { "email": `${req.body.email}`, "name": "Name" }
        ];
        sendSmtpEmail.replyTo = { "email": "vinayakmannur20@gmail.com", "name": "Vinayak" };
        sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
        sendSmtpEmail.params = { "parameter": `${new_otp}`, "subject": "Hyy There!! Here's Your OTP to Login" };
        const data = await apiInstance.sendTransacEmail(sendSmtpEmail)

        const otp_expiry_time = Date.now() + 10*60*1000 //10min

        const updating_otp = await User.findByPk(userId)

        await updating_otp.update({
            otp: new_otp,
            otp_expiry_time,
        })

        //send mail
        // mailService.sendEmail({
        //     from: "vinayakmannur20@gmail.com",
        //     to: "vinayakvviet@gmail.com",
        //     subject: "OTP for Pingsphere",
        //     text: `Your OTP is ${new_otp}, this is valid for only 10 minutes.`
        // })

        res.status(200).json({status: "success", msg: "OTP sent to your Email!"})

    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "error", msg: "Internal Server Error!!" })
    }
}

exports.verifyOTP = async (req, res, next) =>{
    try {
        
        req.body.otp = parseInt(req.body.otp)
        const {email, otp} = req.body

        const user = await User.findOne({
            where: { 
                email: email,
                otp_expiry_time : {
                    [Op.gte]: Date.now(), 
                }
            }
        })

        if(!user){
            return res.status(400).json({status: "error", msg: "OTP expired"})
        }

        if(otp !== user.otp){
            return res.status(400).json({status: "error", msg: "Incorrect OTP"})
        }

        await user.update({
            verified: true,
            otp: null
        })
        const data = {
            user: {
                userId: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        res.status(200).json({status: "success", authToken, email,  user_id: user.id, msg: "OTP verified"})


    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "error", msg: "Internal Server Error!!" })
    }
}

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: "error", msg: "Both email and password is required!" })
        }

        const user = await User.findOne({ 
            where: { 
                email: email 
            },
            attributes: ['id', 'email', 'password'], 
        });

        if (user === null) {
            return res.status(400).json({ status: "error", msg: "User doesnt Exists!!" });
        }

        const result = await bcrypt.compare(password, user.password)

        if (result) {
            const data = {
                user: {
                    userId: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET)
            return res.status(200).json({status: "success", authToken, email, user_id: user.id, msg: "Login Successfull !!" });
        }
        else {
            return res.status(400).json({status: "error", msg: "Invalid credentials !!" });
        }

        

    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "error", msg: "Internal Server Error !" })
    }
};

exports.forgotPassword = async (req, res, next) =>{
    try {
        
        const user = await User.findOne({where: {email: req.body.email}})

        if(!user){
            return res.status(400).json({status: "error", msg: "User doesnt Exists !" });
        }

        const uniqueId = uuidv4()
        const resetURL = `http://localhost:3000/auth/newpassword/?token=${uniqueId}`
        // console.log(uniqueId);
        //send mail

        let defaultClient = brevo.ApiClient.instance;

        let apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = process.env.SG_KEY;

        let apiInstance = new brevo.TransactionalEmailsApi();
        let sendSmtpEmail = new brevo.SendSmtpEmail();

        sendSmtpEmail.subject = "{{params.subject}}";
        sendSmtpEmail.htmlContent = "<html><body><h1>Click on the link provided and reset your password {{params.parameter}}</h1></body></html>";
        sendSmtpEmail.sender = { "name": "Vinayak", "email": "vinayakmannur20@gmail.com" };
        sendSmtpEmail.to = [
            { "email": `${req.body.email}`, "name": "Name" }
        ];
        sendSmtpEmail.replyTo = { "email": "vinayakmannur20@gmail.com", "name": "Vinayak" };
        sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
        sendSmtpEmail.params = { "parameter": `${resetURL}`, "subject": "Hyy There!! Here's Your Link to Reset Your Password" };
        const data = await apiInstance.sendTransacEmail(sendSmtpEmail)
        // console.log('API called successfully. Returned data: ' + JSON.stringify(data));
            
        // mailService.sendEmail({
        //     from: "vinayakmannur20@gmail.com",
        //     to: "vinayakvviet@gmail.com",
        //     subject: "OTP for Pingsphere",
        //     html: resetPassword(user.firstName, resetURL),
        //     attachments: []
        // })
        
        const reset = ResetPassword.create({
            passwordResetToken: uniqueId,
            passwordResetExpires: Date.now() + 10*60*1000,
            userId: user.id,
        })

        return res.status(200).json({status: "success", msg: "Reset password link sent to mail"})


    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "error", msg: "Internal Server Error !" })
    }
}

exports.resetPassword = async (req, res, next) =>{
    try {
        
        const {password, uniqueId} = req.body
        // console.log("?????",uniqueId);

        const reset = await ResetPassword.findOne({
            where: { 
                passwordResetToken: uniqueId,
                passwordResetExpires : {
                    [Op.gte]: Date.now(), 
                }
            }
        })

        if(!reset){
            return res.status(400).json({status: "error", msg: "Token expired"})
        }

        await reset.update({
            passwordChangedAt: Date.now(),
            passwordResetToken: null,
            passwordResetExpires: null
        })

        const user = await User.findByPk(reset.userId)

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        req.body.password = hash

        await user.update({
            password: req.body.password
        })

        const data = {
            user: {
                userId: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)

        return res.status(200).json({status: "success", authToken,  msg: "Password reset successfull !"})

    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "error", msg: "Internal Server Error !" })
    }
}
