const jwt = require('jsonwebtoken')
const User = require('../models/User');


const adminMiddleware = async (req, res, next) => {

    try {
        const user = await User.findById(req.userInfo.userId);
        if (user.role !== 'admin') {

            return res.status(401).json({
                success: false,
                message: "You do not have the proper credentials. Contact admin for help",
            });
        }
        next()
    } catch (err) {
        console.log(err);
        
        return res.status(500).json({
            success: false,
            message: "something went wrong with authorization, try again"
        })
    }
}

module.exports = adminMiddleware 