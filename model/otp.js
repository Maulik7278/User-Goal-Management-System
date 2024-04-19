const { Schema, model } = require("mongoose")

const otpschema = new Schema({
    email: { type: String, default: null, require: true },
    otp: { type: Number, default: null, require: true },
},{versionKey:false,timestamps:true})

const otpModel = model("otp", otpschema, "otp")

module.exports = otpModel