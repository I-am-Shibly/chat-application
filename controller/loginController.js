// external imports
const { compare } = require("bcrypt")
const createHttpError = require("http-errors")
const jwt = require("jsonwebtoken")

// internal imports 
const User = require("../models/people")

// get login page
function getLogin(req, res, next) {
    res.render('index')
}

// login
async function login(req, res, next) {
    try {
        // find the user who has email or phone number
        const user = await User.findOne({
            $or: [{ email: req.body.username }, { mobile: req.body.username }]
        })

        if (user && user._id) {
            const isPasswordValid = await compare(
                req.body.password,
                user.password
            )

            if (isPasswordValid) {
                // prepare the user object to generate token
                const userObject = {
                    username: user.name,
                    mobile: user.mobile,
                    email: user.email,
                    role: "user",
                }

                // token generation 
                const token = jwt.sign(userObject, process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRE })
                
                // set cookie
                res.cookie(process.env.COOKIE_NAME, token, {
                    maxAge: process.env.JWT_EXPIRE,
                    httpOnly: true,
                    signed: true
                })
    
                // set logged in user local identifiers 
                res.locals.loggedIn = userObject

                res.render("inbox")
            } else {
                throw createHttpError("Login failed! Please try again.")
            }
        } else {
            throw createHttpError("Login failed! Please try again.")
        }
    } catch (err) {
        res.render("index", {
            data: {
                username: req.body.username
            },

            errors: {
                common: {
                    msg: err.message
                }
            }
        })
    }
}

// logout
function logout(req, res) {
    res.clearCookie(process.env.COOKIE_NAME)
    res.send("Logged out")
}

module.exports = {
    getLogin,
    login,
    logout
}