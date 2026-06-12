const {Router} = require('Express');

const userRouter= Router();

userRouter.post('/signup',function(req,res){
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