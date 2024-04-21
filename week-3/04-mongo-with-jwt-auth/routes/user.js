const { Router } = require("express")
const {User , Course} = require("../db/index")
const router = Router()
const userMiddleware = require("../middleware/user")

const jwt = require('jsonwebtoken')
const jwtSecretKey = '<yourSecretKey>'

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username
    const password = req.body.password

    User.create({
        username,
        password
    })
    .then((newUser) => {
        res.json({ mssg : `New user added !`})
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({ mssg : "unable to add user"})
    })

});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username
    const password = req.body.password

    const user = await User.findOne({
        username,
        password
    })

    if(user){
        const userToken = jwt.sign({username : username} , jwtSecretKey);
        res.json({ token : userToken})
    }
    else{
        res.status(403).json({ mssg : "Invalid user!"})
    }
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find()
    .then((allCourses) => {
        res.json({ courses : allCourses})
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({ mssg : "Unable to fetch courses!"})
    })
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic

    const token = req.headers.authorization
    const requiredToken = token.slice(7)
    const decodedPayload = jwt.decode(requiredToken)

    //getting the username
    const username  = decodedPayload.username
    const courseId = req.params.courseId

    User.updateOne({username} , {
        "$push" : {purchasedCourses : courseId}
    })
    .then((r) => {
        res.json({mssg : "Course Added succesfully"})
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({ mssg : "unable to add courses"})
    })


});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const token = req.headers.authorization
    const requiredToken = token.slice(7)
    const decodedPayload = jwt.decode(requiredToken)

    //getting the username
    const username  = decodedPayload.username
    
    const user = await User.findOne({username})
    if(user){
        Course.find({
            _id : {"$in" : user.purchasedCourses}
        })
        .then((allCoursesPurchasedByUser) => {
            res.json({courses : allCoursesPurchasedByUser})
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ mssg : "Unable to find courses"})
        })
    
    }
    else{
        console.log(error)
        res.status(500).json({ mssg : "Unable to get bought courses"});
    }



});

module.exports = router