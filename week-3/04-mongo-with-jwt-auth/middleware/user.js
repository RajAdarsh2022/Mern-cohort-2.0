const jwt = require('jsonwebtoken')
const jwtSecretKey = '<yourSecretKey>'


function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

    const token = req.headers.authorization
    const requiredToken = token.slice(7)

    // console.log(requiredToken)
    try {
        jwt.verify(requiredToken , jwtSecretKey)
        next();
    } catch (error) {
        console.log(error)
        res.status(403).json({ mssg : "Invalid user"})
    }
    

}

module.exports = userMiddleware;