const { Router } = require("express")
const { hashPass, comparePass, emailCheck } = require("../middleware/index")

const userRouter = Router()

const { registerUser, getAllUsers, updateUser, deleteUser, login } = require("./controllers")

userRouter.post("/users/register", emailCheck, hashPass, registerUser)
userRouter.get("/users/all", getAllUsers)
userRouter.put("/users/update", updateUser)
userRouter.delete("/users/delete", deleteUser)
userRouter.post("/users/login", comparePass, login)

module.exports = userRouter