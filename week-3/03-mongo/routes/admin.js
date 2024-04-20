const { Router } = require("express");
const {Admin , Course} = require("../db/index.js")
const adminMiddleware = require("../middleware/admin");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic

    const username = req.body.username
    const password = req.body.password 

    try {

        const newAdmin =  await Admin.create({
            username : username,
            password : password
        })
        
        console.log(newAdmin)
        res.json({ mssg : "Admin created successfully"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({mssg : "Error while creating admin"})
    }

});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic

    const title = req.body.title
    const description = req.body.description
    const price = req.body.price
    const imageLink = req.body.imageLink

    try {
        const newCourse =  await Course.create({
            title,
            description,
            price,
            imageLink
             
        })

        console.log(newCourse)
        res.json({ mssg : "Course added successfully!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({mssg : "Internal server error"})
    }

});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic

    try {
        const allCourses = await Course.find()
        console.log(allCourses)
        res.json({courses : allCourses})
    } catch (error) {
        console.log(error)
        res.status(500).json({ mssg : "Error in fetching data"})
    }
    


});

module.exports = router;