const { date } = require("joi")
const { Schema, model } = require("mongoose")

let goalSchema = new Schema({
    name: { type: String, default: null, require: true },
    discription: { type: String, default: null, require: true },
    person: { type: Schema.Types.ObjectId, ref: 'user' },
    goalscomplet: { type: Boolean, default: false },
    date: { type: Date, default: null, require: true },
    notifly: { type: Boolean, default: false },
}, { versionKey: false, timestamps: true })

let goalModel = model("goal", goalSchema, "goal")

module.exports = goalModel