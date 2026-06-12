const mongoose=require("mongoose");
console.log("Connected to")
mongoose.connect("mongodb+srv://e23cseu0612_db_user:t4d937e5A5EfIhEO@cluster0.kq7thpe.mongodb.net/Coursera");
const Schema=mongoose.Schema;
const model=mongoose.model;
const ObjectId=mongoose.ObjectId;

const UserSchema=new Schema({
    email:{type:String, unique:true},
    password:String,
    firstName:String,
    lastName:String
});

const AdminSchema=new Schema({
    email:String,
    password:String,
    firstName:String,
    lastName:String
})

const CourseSchema=new Schema({
    title:String,
    description:String,
    price:Number,
    imageUrl:String,
    creatorId:ObjectId

})

const PurchaseSchema=new Schema({
    userId:ObjectId,
    courseId:ObjectId

})

const UserModel=mongoose.model("user",UserSchema);
const AdminModel=mongoose.model("admin",AdminSchema);
const CourseModel=mongoose.model("course",CourseSchema);
const PurchaseModel=mongoose.model("purchase",PurchaseSchema);

module.exports={
    UserModel:UserModel,
    AdminModel:AdminModel,
    CourseModel:CourseModel,
    PurchaseModel:PurchaseModel
};