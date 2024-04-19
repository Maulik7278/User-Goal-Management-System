const express = require("express")
const { goal } = require("../controller/index")
const auth = require("../middleware/authentication")//authentication
const validater = require("../middleware/validation")
const { goalvalidation } = require("../validationSchema/index")
const goal_router = express.Router()


goal_router.get("/getallgoal",goal.getallgoal)
goal_router.get("/getgoal",auth,goal.getgoal)

//posst
goal_router.post("/creategoal",validater(goalvalidation.create),auth,goal.creategoal)
goal_router.post("/datebetweengoal",validater(goalvalidation.datebetweengoal),auth,goal.datebetweengoal)
goal_router.post("/completegoal",validater(goalvalidation.completegoal),auth,goal.completegoal)
goal_router.post("/uncompletegoal",validater(goalvalidation.uncompletegoal),auth,goal.uncompletegoal)
goal_router.post("/avggoal",auth,goal.avg)

//put
goal_router.put("/updategoal",validater(goalvalidation.update),auth,goal.statusupdate)


module.exports = goal_router
