// external imports
const express = require('express')

// internal imports
const { getUsers, addUser, removeUser } = require('../controller/usersController')
const {checkLogin, redirectLoggedIn } = require('../middlewares/common/checkLogin')
const decorateHtmlResponse = require('../middlewares/common/decorateHTMLResponse')
const avatarUpload = require('../middlewares/users/avatarUpload')
const { addUserValidators, addUserValidationHandler } = require("../middlewares/users/userValidators")


const router = express.Router()

// users page
router.get('/', decorateHtmlResponse('Users'), checkLogin, getUsers)

// add user
router.post(
    "/",
    checkLogin,
    avatarUpload,
    addUserValidators,
    addUserValidationHandler,
    addUser
)

// delete user
router.delete("/:id", removeUser)

module.exports = router