const jwt = require('jsonwebtoken')
const jwtSecretKey = '<yourSecretKey>'

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    const token = req.headers.authorization
    const requiredToken = token.slice(7)
    console.log(requiredToken)
    
    try {
        jwt.verify( requiredToken , jwtSecretKey)
        next();
    } catch (error) {
        console.log(error)
        res.status(403).json({ mssg : "Bad authentication request"})
    }

}

module.exports = adminMiddleware;