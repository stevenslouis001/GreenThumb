const express = require('express')

const router = express.Router()

const {registerUser, loginUser, checkLogin, logOutUser} = require('../controllers/auth-controller')

// add after other stuff works 
// sendResetLink, checkResetToken, updatePassword

const authMiddleware = require('../middleware/auth-middleware')
const adminRoute = require('./admin-route')

router.post("/register",registerUser)
router.post("/login", loginUser)
router.post("/logout", logOutUser)
router.get("/check", authMiddleware, checkLogin)


// // router.post("/auth", adminRoute)


// router.post("/send-reset-link", sendResetLink)

// router.put("/reset-password", updatePassword)
// router.post("/check-password-reset-token", checkResetToken)



module.exports = router