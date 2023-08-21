const User = require("../users/model")
const bcrypt = require("bcrypt")

const saltRounds = process.env.SALT_ROUNDS 

const hashPass = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, parseInt(saltRounds))
        next()
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }

}

const comparePass = async (req, res, next) => {
    try{
        const userNameCheck = await User.findOne({where: {username: req.body.username}})
        if (userNameCheck === null) {
            throw new Error("Username or password not found in database")
        }
        req.user = await User.findOne({where: {username: req.body.username}})
        const match = await bcrypt.compare(req.body.password, req.user.password)

        if (!match) {
            const error = new Error("Username or password not found in database")
            res.status(500).json({ errorMessage: error.message, error: error })
        } else {
            next()
        }

        
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }
}

const emailCheck = async (req, res, next) => {
    try{
        const email =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(await(req.body.email))

        if (!email) {
            const error = new Error("Invalid Email")
            res.status(500).json({ errorMessage: error.message, error: error })
        } else {
            next()
        }

        
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }
}



module.exports = {
    hashPass,
    comparePass,
    emailCheck
}