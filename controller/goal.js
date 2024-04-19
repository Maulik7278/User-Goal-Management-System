const { goalModel, otpModel, userModel } = require("../model/index")
const { hash, compare } = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const { send_mail } = require("../utility/index")




module.exports = {
    getallgoal: async (req, res) => {
        try {
            // let goals = await goalModel.find({})
            let total = await goalModel.countDocuments();
            console.log("🚀 ~ avg: ~ total:", total);

            let istrue = await goalModel.countDocuments({ goalscomplet: true });
            console.log("🚀 ~ avg: ~ istrue:", istrue);

            let isfalse = total - istrue;
            let percentage = (istrue * 100) / total;
            console.log(percentage);
            return res.status(200).json({
                message: "it is all goals get",
                Data: goals,
                percentage: percentage
            })
        } catch (error) {
            return res.status(500).json({
                message: "it is all goals get error",
                error: error.message
            })
        }
    },
    getgoal: async (req, res) => {
        try {
            let goal = req.user
            goal = await goalModel.findOne({ person: goal._id })
            return res.status(200).json({
                message: "it is goals get",
                Data: goal
            })
        } catch (error) {
            return res.status(500).json({
                message: "it is goals get error",
                error: error.message
            })
        }
    },
    creategoal: async (req, res) => {
        try {
            let user = req.user
            let { name, discription, date } = req.body
            let goal = await goalModel.create({
                name: name,
                discription: discription,
                person: user._id,
                date: date
            })
            let usergoal = await userModel.findOneAndUpdate({ _id: user._id }, { $push: { goals: goal.id } })
            return res.status(200).json({
                message: "it is goals create",
                Data: goal
            })
        } catch (error) {
            return res.status(500).json({
                message: "it is create goals get error",
                error: error.message
            })
        }
    },
    statusupdate: async (req, res) => {
        try {
            let user = req.user
            let { name, date } = req.body
            let goal = await goalModel.findOneAndUpdate({ person: user.id }, { $set: { name: name, goalscomplet: true, date: date } }, { new: true })

            return res.status(200).json({
                message: "it is goals create",
                Data: goal
            })
        } catch (error) {
            return res.status(500).json({
                message: "it is update goals get error",
                error: error.message
            })
        }
    },
    datebetweengoal: async (req, res) => {
        try {
            let user = req.user
            let { start, end } = req.body;
            start = new Date(start);
            end = new Date(end);
            user = await goalModel.find({
                person: user.id,
                createdAt: {
                    $gte: start,
                    $lte: end,
                },
            });
            return res.status(200).json({
                message: "its a diffrent between date",
                user: user
            });
        } catch (error) {
            return res.status(500).json({
                message: "its a date between error",
                error: error
            });
        }
    },
    completegoal: async (req, res) => {
        try {
            let user = req.user
            let { start, end } = req.body;
            start = new Date(start);
            end = new Date(end);
            user = await goalModel.find({
                person: user.id,
                createdAt: {
                    $gte: start,
                    $lte: end
                },
                goalscomplet: true
            });

            return res.status(200).json({
                message: "its a diffrent between date",
                user: user
            });

        } catch (error) {
            return res.status(500).json({
                message: "its a date goal complete error",
                error: error
            });
        }
    },
    uncompletegoal: async (req, res) => {
        try {
            let user = req.user
            let { start, end } = req.body;
            start = new Date(start);
            end = new Date(end);
            user = await goalModel.find({
                person: user.id,
                createdAt: {
                    $gte: start,
                    $lte: end
                },
                goalscomplet: false
            });

            return res.status(200).json({
                message: "its a diffrent between date",
                user: user
            });

        } catch (error) {
            return res.status(500).json({
                message: "its a date goal complete error",
                error: error
            });
        }
    },
    avg: async (req, res) => {
        try {

            let user = req.user
            let goals = await goalModel.find({ person: user.id })
            console.log("🚀 ~ avg: ~ user:", goals.length)

            let completgoal = await goalModel.find({ person: user.id, goalscomplet: true })
            console.log("🚀 ~ avg: ~ completgoal:", completgoal.length)
            let complete = completgoal.length
            let total = goals.length
            let percentage = (complete * 100) / total
            return res.status(200).json({
                message: "Difference between completion statuses",
                percentage: percentage
            });

        } catch (error) {
            return res.status(500).json({
                message: "Error occurred while processing completion status",
                error: error
            });
        }
    }
}