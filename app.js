//its a require
const express = require("express");
const morgan = require("morgan")
const cors = require("cors")
const router = require("./router/index")
const connection = require("./dataBase/db")
let cron = require('node-cron');
let { goalModel, userModel } = require("./model/index")
const { send_mail } = require("./utility/index");

require("dotenv").config()

const app = express()
const server = require('http').createServer(app);
let socket = require("./socket")
socket(server)


app.use(cors())
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/Goal_set", router);


app.all("*", (req, res) => {
    res.status(404).json({
        message: "its a wrong url its a all"
    })
})

const expire = async () => {

    let goal = await goalModel.find({ goalscomplet: "false" })
    for (const i of goal) {
        let today = new Date()
        let expdate = i.date
        expdate.setHours(expdate.getHours() - 24)
        if (today >= expdate) {
            console.log("🚀 ~ expire ~ expdate:", expdate)
            if (i.notifly == false) {
                let user = await userModel.findOne({ _id: i.person })
                await send_mail(user.email, 'sdf', `your ${i.name}`)

                await goalModel.findOneAndUpdate({ _id: i._id }, { $set: { notifly: "true" } })
            }
        }

    }
}

const PORT = process.env.PORT || 3000
console.log("🚀 ~ PORT:", PORT)


const start = async () => {
    await connection()
    server.listen(PORT, () => {
        console.log(`server started port ${PORT}`);
    })
}
start()

// cron.schedule(' * * * * *', () => {
//     console.log(new Date());
//expire()
// });