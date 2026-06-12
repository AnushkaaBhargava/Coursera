const {Router}=require('express');

const courseRouter=Router();


courseRouter.post('/purchase',function(req,res){
   //you would expect the user to pay and buy the course
})



courseRouter.get('/preview', function(req,res){
  res.json({
    message: "course preview endpoint"
  })
})

module.exports={
    courseRouter:courseRouter
}