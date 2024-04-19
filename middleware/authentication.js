const jwt = require("jsonwebtoken")
const { userModel } = require("../model/index")
require("dotenv").config()

const authentication = async (req, res, next) => {
    try {

        let token = req.headers.authorization.split(" ")[1]
        console.log(token);

        let user = jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log("Decoded user ID:", user)

        let userfind = await userModel.findById(user.id)
        console.log("User found in database:", userfind)

        if (!userfind) {return res.json({ message: "User not found" })}
        req.user = userfind
        next()

    } catch (error) {
        res.status(404).json({
            message: "its a middleware catch error",
            error: error
        })
    }
}

module.exports = authentication