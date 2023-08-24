const { Router } = require("express")
const { hashPass, comparePass, emailCheck, checkToken } = require("../middleware/index")

const userRouter = Router()

const { registerUser, getAllUsers, updateUser, deleteUser, login } = require("./controllers")

userRouter.post("/users/register", emailCheck, hashPass, registerUser)
userRouter.get("/users/all", checkToken, getAllUsers)
userRouter.put("/users/update", emailCheck, updateUser)
userRouter.delete("/users/delete", deleteUser)
userRouter.post("/users/login", comparePass, login)
userRouter.get("/users/authCheck", checkToken, login)

module.exports = userRouter