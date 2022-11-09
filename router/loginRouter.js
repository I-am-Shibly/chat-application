// external imports
const express = require('express')

// internal imports
const { getLogin, login, logout } = require('../controller/loginController')
const { redirectLoggedIn } = require('../middlewares/common/checkLogin')
const decorateHtmlResponse = require('../middlewares/common/decorateHTMLResponse')
const { loginValidationHandler, loginValidators } = require('../middlewares/login/loginValidators')


const router = express.Router()

// set page title
const page_title = "Login"

// login page
router.get('/', decorateHtmlResponse(page_title), redirectLoggedIn, getLogin)

// login process
router.post("/",
    decorateHtmlResponse(page_title),
    loginValidators,
    loginValidationHandler,
    login
)

// logout
router.delete("/", logout)


module.exports = router