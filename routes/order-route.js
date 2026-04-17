const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth-middleware')
const { registerUser, loginUser, logOutUser } = require('../controllers/auth-controller')

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", authMiddleware, logOutUser)

module.exports = router