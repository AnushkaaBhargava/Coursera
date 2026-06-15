const {Router}=require("express");
const adminRouter=Router();
const {AdminModel}= require('../db');
const {z}=require("zod");
const jwt=require("jsonwebtoken");
const JWT_ADMIN_PASSWORD="anuaastha1205";
const bcrypt=require("bcrypt");
const mongoose=require("mongoose");

adminRouter.post('/signup',async function(req,res){
     
         const requiredBody = z.object({
             email: z.string().min(3).max(100).email(),
             password: z.string().min(3).max(100),
             firstName: z.string().min(3).max(20),
             lastName: z.string().min(3).max(20)
         });
     
         const parsedDataSuccess = requiredBody.safeParse(req.body);
     
         if (!parsedDataSuccess.success) {
             return res.status(400).json({
                 message: "Incorrect Format",
                 error: parsedDataSuccess.error
             });
         }
     
         const { email, password, firstName, lastName } = req.body;
     
         try {
             const hashedPassword = await bcrypt.hash(password, 5);
     
             await AdminModel.create({
                 email,
                 password: hashedPassword,
                 firstName,
                 lastName
             });
     
             return res.json({
                 message: "You are signed up!"
             });
     
         } catch (e) {
             console.log(e);
     
             if (e.code === 11000) {
                 return res.status(409).json({
                     message: "User with this email already exists!"
                 });
             }
     
             return res.status(500).json({
                 message: "Error occurred",
                 error: e.message
             });
         }
})

adminRouter.post('/signin',async function(req,res){
         const email=req.body.email;
         const password=req.body.password;
    
         const user=await AdminModel.findOne({
          email:email
         })
    
         if(!user){
          res.json({
             message:"User with this email not found!"
          })
          return;
         }
    
         const passwordMatch=await bcrypt.compare(password,user.password);
    
         if(passwordMatch){
          const token=jwt.sign({
             id:user._id.toString()
          },JWT_ADMIN_PASSWORD);
          res.json({
             token:token
          })
         }else{
          res.status(403).json({
             message:"Invalid password"
          })
         }
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