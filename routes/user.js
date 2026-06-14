const {Router} = require('Express');
const jwt=require("jsonwebtoken");
const JWT_SECRET="nushki1205";
const bcrypt=require("bcrypt");
const {z}=require("zod");
const userRouter= Router();
const mongoose=require("mongoose");

app.use(express.json());

userRouter.post('/signup',function(req,res){
     const requiredBody= zod.object({
      email:z.string().min(3).max(100).email(),
      password:string.min(3).max(100),
      firstName:string.min(3).max(20),
      lastName:string.min(3).max(20)
     })

     const parsedDataSuccess=zod.safeParse(req.body);

     if(!parsedDataSuccess.success){
      res.json({
         message:"Incorrect Format",
         error:parsedDataSuccess.error
      })
      return
     }

     

     res.json({
        message: "Signup endpoint"
     })
})

userRouter.post('/signin',function(req,res){
     res.json({
        message: "Signin endpoint"
     })
})

userRouter.get('/purchases',function(req,res){

})

module.exports={
   userRouter:userRouter
}