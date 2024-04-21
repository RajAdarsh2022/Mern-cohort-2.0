const { Router } = require("express")
const {Admin , Course} = require("../db/index")
const adminMiddleware = require("../middleware/admin")
const router = Router()

const jwt = require('jsonwebtoken')
const jwtSecretKey = '<yourSecretKey>'

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username
    const password = req.body.password

    Admin.create({
        username,
        password
    })
    .then(function(newAdmin){
        res.json({
            mssg : `New admin created successfully`,
        })
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({mssg : "Error in creating admin"})
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username
    const password = req.body.password

    const user = await Admin.findOne({
        username,
        password
    })

    if(user){
        const token = jwt.sign({username : username}, jwtSecretKey)
        console.log(token)
        res.json({token : token})
    }
    else{
        res.status(403).json({ mssg : "Bad authentication"})
    }


});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const title = req.body.title
    const description = req.body.description
    const price = req.body.price
    const imageLink = req.body.imageLink

    Course.create({
        title,
        description,
        price,
        imageLink
    })
    .then((newCourse) => {
        res.json({ mssg : "Course added successfully!"})
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({ mssg : "unable to add course"})
    })

});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Course.find()
    .then((allCourses) => {
        res.json({ courses : allCourses})
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({ mssg : "Unable to fetch courses!"})
    })
});

module.exports = router;