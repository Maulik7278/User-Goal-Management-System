const mongoose = require("mongoose")


const connection = async () => {
    await mongoose.connect(process.env.DATA_BASE).then(console.log("data_Base connected")).catch((error) => { console.log(error); })
}

module.exports = connection