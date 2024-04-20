const { Router } = require("express");
const {User , Course} = require("../db/index")
const router = Router();
const userMiddleware = require("../middleware/user");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username
    const password = req.body.password

    try {
        const newUser = await User.create({
            username,
            password
        })

        res.json({mssg : "User created successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({mssg : "Unable to create user!"})
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    try {
        const allCourses = await Course.find();
        console.log(allCourses)
        res.json({courses : allCourses})
    } catch (error) {
        console.log(error)
        res.status(500).json({mssg : "unable to fetch courses!"})
    }
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const username = req.headers.username
    const password = req.headers.password 
    const courseId = req.params.courseId

    User.updateOne({
        username,
        password
    } , {
        "$push" : {purchasedCourses : courseId}
    })
    .then(()=>{
        res.json({mssg : "Course added successfully"})
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({mssg : "error in handling courses"})
    })

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic

    const username = req.headers.username 
    const password = req.headers.password

    const user = await User.findOne({
        username,
        password
    })
    if(user){
        console.log(user.purchasedCourses)
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
        res.json({mssg : "unable to find!"})
    }

});

module.exports = router