// external imports
const express = require('express')

// internal imports
const { getInbox } = require('../controller/inboxController')
const decorateHtmlResponse = require('../middlewares/common/decorateHTMLResponse')
const { checkLogin } = require('../middlewares/common/checkLogin')


const router = express.Router()

// login page
router.get('/', decorateHtmlResponse('Inbox'), checkLogin, getInbox)


module.exports = router