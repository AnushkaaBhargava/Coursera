const express=require("express");
const {userRouter}=require('./routes/user');
const {courseRouter}=require('./routes/course');
const {adminRouter}=require('./routes/admin');
const app=express();
const mongoose=require("mongoose")


app.use("/api/v1/user",userRouter);
app.use("/api/v1/course",courseRouter);
app.use("/api/v1/admin",adminRouter);


async function main(){
    await mongoose.connect("mongodb+srv://e23cseu0612_db_user:t4d937e5A5EfIhEO@cluster0.kq7thpe.mongodb.net/Coursera");
    app.listen(3000);
    console.log("Listening at port 3000")
}

main();
