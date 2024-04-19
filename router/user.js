const express = require("express")
const { user } = require("../controller/index")//controller
const { upload } = require("../utility/index")//file uploading
const auth = require("../middleware/authentication")//authentication
const validater = require("../middleware/validation")
const { userValidation } = require("../validationSchema/index")
const user_router = express.Router()

//get methods
user_router.get("/userget", user.get)

//post methods
user_router.post("/userotp", validater(userValidation.otp), user.otp)
user_router.post("/usercreate", upload.single("profile"), validater(userValidation.create), user.create)
user_router.post("/userlogin", validater(userValidation.login), user.login)

//put method
user_router.put("/userupdate",upload.single("profile"),auth,validater(userValidation.update), user.update)
user_router.put("/userpasschange", auth, validater(userValidation.changepass), user.changpassword)
user_router.put("/userpassforget", auth, validater(userValidation.forgetpass), user.forget)


module.exports = user_router