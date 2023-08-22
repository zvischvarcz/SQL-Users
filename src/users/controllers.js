const User = require("./model")
require("dotenv").config()
const jwt = require("jsonwebtoken")

const  registerUser = async (req, res) => {
    try {
        // const user = await  User.create({
        //     username: req.body.username,
        //     email: req.body.email,
        //     password: req.body.password
        // })
        
        const user = await User.create(req.body)
        res.status(201).json({
            message: "Successfully registered",
             user: {username: user.username, email: user.email}
             })
    } catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error})
        console.log(error)
    }
}

const  getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll()


        res.status(201).json({
            message: "Successfull",
             users: users
             })
    } catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error})
        console.log(error)
    }
}

const  updateUser = async (req, res) => {
    try {
        const updatedUser = await User.update({[req.body.key]: req.body.value}, {
            where: {
                 username: req.body.username
            }
        });
        res.status(201).json({
            message: "Successfully updated",
             changed: updatedUser
             })
    } catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error})
        console.log(error)
    }
}

const  deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.destroy({
            where: {
                username: req.body.username
           }
        })
        res.status(201).json({
            message: "Successfully deleted",
             amount: deletedUser
            })
    } catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error})
        console.log(error)
    }
}


const login = async (req, res) => {
    try {
        const token = jwt.sign({id: req.user.id}, process.env.SECRET_KEY)

        res.status(200).json({
            message: "Login success",
            user: {username: req.body.username, email: req.body.email, token: token}
        })
    } catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error})
        console.log(error)
    }
}



module.exports = {
    registerUser,
    deleteUser,
    updateUser,
    getAllUsers,
    login
}