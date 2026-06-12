const {Router}=require("express");
const adminRouter=Router();
const {adminModel}= require('../db');

adminRouter.post('/signup',function(req,res){
     res.json({
        message: "Signup endpoint for admin"
     })
})

adminRouter.post('/signin',function(req,res){
     res.json({
        message: "Signin endpoint"
     })
})

adminRouter.post('/course',function(req,res){
     res.json({
        message: "Course created by admin"
     })
})

adminRouter.put('/course',function(req,res){
     res.json({
        message: "Update"
     })
})

adminRouter.get('/course/bulk',function(req,res){
     res.json({
        message: "Get my courses"
     })
})

module.exports={
    adminRouter:adminRouter
}