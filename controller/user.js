const { userModel, otpModel } = require("../model/index")
const { hash, compare } = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const { send_mail } = require("../utility/index")
module.exports = {
    get: async (req, res) => {
        try {
            let users = await userModel.find({})
            return res.status(200).json({
                message: "it is get users",
                Data: users
            })
        } catch (error) {
            return res.status(500).json({
                message: "it is a internal get user error",
                error: error
            })
        }
    },
    create: async (req, res) => {
        let { name, email, password, contact, otp, path } = req.body
        // console.log("🚀 ~ create: ~ name, password, contact:", name, email, password, contact, otp)

        // console.log("🚀 ~ create: ~ path:", path)
        try {
            let findotp = await otpModel.findOne({ otp: otp })
            console.log("🚀 ~ create: ~ findotp:", findotp)
            if (email == findotp.email && otp == findotp.otp) {
                let user = await userModel.findOne({ email: email })
                if (!user) {
                    user = await userModel.create({
                        name: name,
                        email: email,
                        password: await hash(password, 10),
                        contact: contact,
                        profile: path
                    })
                    return res.status(200).json({
                        message: "it is create users",
                        Data: user
                    })
                }
                return res.status(404).json({
                    message: " email has been already login"
                })
            } else {
                return res.status(404).json({
                    message: "please valid email and otp"
                })
            }
        } catch (error) {
            return res.status(500).json({
                message: "it is a internal create user error",
                error: error.message
            })
        }
    },
    otp: async (req, res) => {
        try {
            let otp = Math.floor(Math.random() * 999999 + 111111)
            console.log("🚀 ~ constotp_user= ~ otp:", otp)
            const { email } = req.body
            console.log("🚀 ~ otp: ~ email:", email)

            await send_mail.send_mail(email, "rgt otp", `your otp${otp}`)
            let find_user = await otpModel.findOne({ email: email })
            console.log("🚀 ~ otp: ~ find_user:", find_user)
            if (find_user) {
                find_user = await otpModel.findOneAndUpdate({ email: find_user.email }, { $set: { otp: otp } }, { new: true })
                return res.json({
                    message: "success",
                    user: find_user
                })
            }

            find_user = await otpModel.create({
                email: email,
                otp: otp
            })

            return res.json({
                message: "success",
                user: find_user
            })
        } catch (error) {
            return res.status(500).json({
                "message": "this is internal otp_users error",
                "error": error.message
            })
        }
    },
    login: async (req, res) => {
        try {
            let { email, password } = req.body
            //check password
            let user = await userModel.findOne({ email: email }).lean()
            console.log("🚀 ~ login: ~ user:", user)

            if (!user) { return res.json({ message: "user is not found" }) }
            //check password
            let checkPassword = await compare(password, user.password)
            console.log("🚀 ~ login: ~ checkPassword:", checkPassword)

            if (!checkPassword) { return res.json({ message: "invalid password" }) }

            delete user.password

            let jwtSecretKey = process.env.JWT_SECRET_KEY

            let data = {
                id: user._id,
                name: user.name,
                email: user.email
            }
            let token = jwt.sign(data, jwtSecretKey)
            console.log(token);

            return res.status(200).json({
                message: "its a user login ",
                user: data,
                token: token
            })

        } catch (error) {
            return res.status(500).json({
                "message": "its a user login error for catch",
                "error": error
            })
        }
    },
    update: async (req, res) => {
        try {
            let user = req.user
            console.log("🚀 ~ update: ~ user:", user)
            let { name, contact, path } = req.body
            user = await userModel.findOneAndUpdate({_id:user._id},{$set:{name:name,contact:contact,profile:path}})
            console.log("🚀 ~ update: ~ user:", user)

            return res.status(200).json({
                message:"user update",
                user:user
            })
        } catch (error) {
            return res.status(500).json({
                message: "it is a internal update user error",
                error: error.message
            })
        }

    },
    changpassword: async (req, res) => {
        try {
            let { email, password, newpassword } = req.body
            let user = req.user

            if (user.email == email && await compare(password, user.password)) {
                let chang_pass = await userModel.findOneAndUpdate({ email: email }, { $set: { password: await hash(newpassword, 10) } }, { new: true })
                return res.status(200).json({
                    message: "change password",
                    user: chang_pass
                })
            }
            else {
                return res.status(404).json({
                    message: "please valid password"
                })
            }
        } catch (error) {
            return res.status(500).json({
                message: "its a user chang password error for catch",
                error: error
            })
        }
    },
    forget: async (req, res) => {
        try {
            let { email, newpassword, random } = req.body
            let user = req.user
            if (user.email == email) {
                user = await otpModel.findOne({ otp: random })
                console.log("🚀 ~ forget: ~ user:", user)
                if (random == user.otp) {
                    user = await userModel.findOneAndUpdate({ email: email }, { $set: { password: await hash(newpassword, 10) } }, { new: true })

                    return res.status(200).json({
                        message: "password forget sucssesfully",
                        user
                    })
                } else {
                    return res.status(404).json({
                        message: "not valid otp"
                    })
                }

            } else {
                return res.status(404).json({
                    message: "not valid mail"
                })
            }
        } catch (error) {
            return res.status(500).json({
                message: "its a user forget password error for catch",
                error: error
            })
        }
    }

}