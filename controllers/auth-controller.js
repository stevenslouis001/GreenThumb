const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const checkExistingUser = await User.findOne({ email: email })
        if (checkExistingUser) {
            return res.status(400).json({
                success: false,
                message: "A user already exists with same email"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newlyCreatedUser = new User({
            name,
            email,
            password: hashedPassword,
            role: 'customer'        // default to customer on register
        })

        await newlyCreatedUser.save()

        if (newlyCreatedUser) {
            res.status(201).json({
                success: true,
                message: "user registered successfully"
            })
        } else {
            res.status(500).json({
                success: false,
                message: "unable to register user"
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "something went wrong with registration, try again later"
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "invalid email or password"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "invalid email or password"
            })
        }

        const accessToken = jwt.sign({
            userId: user._id,
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h'
        })

        res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: false,      // set to true in production
            sameSite: 'none',
            maxAge: 3600000
        })

        res.status(200).json({
            success: true,
            message: "logged in successfully",
            data: {
                role: user.role,
                email: user.email,
                name: user.name,
                id: user._id
            }
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "something went wrong, try again later"
        })
    }
}

const checkLogin = async (req, res) => {
    try {
        if (req.userInfo.userId) {
            const user = await User.findById(req.userInfo.userId)

            return res.status(200).json({
                success: true,
                message: "user currently signed in",
                data: {
                    role: user.role,
                    email: user.email,
                    name: user.name,
                    id: user._id
                }
            })
        }
        res.status(500).json({
            success: false,
            message: "something went wrong with check login, try again later"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "something went wrong with check login, try again later"
        })
    }
}

const logOutUser = async (req, res) => {
    res.clearCookie('access_token', {
        httpOnly: true,
        secure: false,      // set to true in production
        sameSite: 'none',
    })
    res.status(200).json({ 
        success: true, 
        message: 'logged out successfully' 
    })
}

module.exports = { registerUser, loginUser, checkLogin, logOutUser }