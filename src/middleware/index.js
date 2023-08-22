const User = require("../users/model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const saltRounds = process.env.SALT_ROUNDS 


// hash password for data safety
const hashPass = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, parseInt(saltRounds))
        next()
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }

}

// check username and password to see if they match
const comparePass = async (req, res, next) => {
    try{
        const userNameCheck = await User.findOne({where: {username: req.body.username}})
        if (userNameCheck === null) {
            throw new Error("Username or password not found in database")
        }
        
        req.user = await User.findOne({where: {username: req.body.username}})
    //     const token = req.header("Authorization")
    //     if (token !== undefined){
    //         const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    //         if (decodedToken.id === req.user.id){
    //         next()
    //     }
    // }
    //     if(token === undefined){
            const match = await bcrypt.compare(req.body.password, req.user.password)

            if (!match) {
                const error = new Error("Username or password not found in database")
                res.status(500).json({ errorMessage: error.message, error: error })
            } else {
                next()
            }
        // }
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }
}


// verify email is in correct format
const emailCheck = async (req, res, next) => {
    try{
        if(req.body.email === undefined && req.body.key !== "email") {
            next()
        } else if (req.body.key === "email"){
            const email =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(await(req.body.value))

            if (!email) {
                const error = new Error("Invalid Email")
                res.status(500).json({ errorMessage: error.message, error: error })
            } else {
                next()
            }
        } else {
            const email =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(await(req.body.email))

            if (!email) {
                const error = new Error("Invalid Email")
                res.status(500).json({ errorMessage: error.message, error: error })
            } else {
                next()
            }

        }
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }
}

const checkToken = async (req, res, next) => {
    try {
        const token = req.header("Authorization")
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findOne({where: {id: decodedToken.id}})
        if (!user){
            throw new Error("User is not authorized")
        }
        next()
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }
}



module.exports = {
    hashPass,
    comparePass,
    emailCheck,
    checkToken
}