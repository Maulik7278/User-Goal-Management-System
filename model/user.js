const { string } = require("joi")
const { Schema, model } = require("mongoose")

const userSchema = new Schema({
    name: { type: String, default: null, require: true },
    email: { type: String, default: null},
    password: { type: String, default: null, require: true },
    contact: { type: String, default: null, require: true },
    profile: { type: String, default: null, require: true },
    goals: [{ type: Schema.Types.ObjectId, ref: 'goal' }]
}, { versionKey: false, timestamps: true })

const userModel = model("user", userSchema, "user")

module.exports = userModel