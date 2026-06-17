const {Router} = require('express');
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const {z}=require("zod");
const userRouter= Router();
const mongoose=require("mongoose");
const express=require("express");
const app=express();
const { UserModel } = require("../db");
const {PurchaseModel,CourseModel}=require('../db')
const {userMiddleware}=require('../middleware/user');
require("dotenv").config();

app.use(express.json());

userRouter.post('/signup', async function(req, res) {

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

        await UserModel.create({
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
});

userRouter.post('/signin',async function(req,res){
     const email=req.body.email;
     const password=req.body.password;

     const user=await UserModel.findOne({
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
      },process.env.JWT_USER_PASSWORD);
      res.json({
         token:token
      })
     }else{
      res.status(403).json({
         message:"Invalid password"
      })
     }
})

userRouter.get('/purchases',userMiddleware,async function(req,res){
   const userId=req.userId;

   const purchases=await PurchaseModel.find({
    userId:userId
   });

   const coursesData= await CourseModel.find({
    _id: {$in : purchases.map(x => x.courseId)}
   })

   res.json({
    purchases,
    coursesData
   });
})

module.exports={
   userRouter:userRouter
}

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMzIzMTBiODM0M2IxZjMwMTEyNjlkNSIsImlhdCI6MTc4MTY3NDcxN30.EmRQMRF0lELqR7CN5U2GJoW3rI65pWXZIFphCeL6FtY"