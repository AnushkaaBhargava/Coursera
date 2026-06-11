const express=require("express");

const app=express();

app.post('/user/signup',function(req,res){
     res.json({
        message: "Signup endpoint"
     })
})

app.post('/user/signin',function(req,res){
     res.json({
        message: "Signin endpoint"
     })
})

app.post('/purchase',function(req,res){
    
})

app.get('/user/purchases',function(req,res){

})

app.get('/courses', function(req,res){

})














app.listen(3000);