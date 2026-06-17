const {Router}=require('express');
const {userMiddleware}=require('../middleware/user');
const courseRouter=Router();
const {PurchaseModel}=require('../db');
const {CourseModel}=require("../db");



courseRouter.post('/purchase',userMiddleware,async function(req,res){
   //you would expect the user to pay and buy the course
     const userId=req.userId;
     const courseId=req.body.courseId;

     await PurchaseModel.create({
      userId,
      courseId
     });

     res.json({
      message:"You have successfully bought the course"
     });
})



courseRouter.get('/preview', async function(req,res){

     const allCourses=await CourseModel.find({})
  res.json({
    message: "course preview endpoint",
    allCourses
  })
})

module.exports={
    courseRouter:courseRouter
}