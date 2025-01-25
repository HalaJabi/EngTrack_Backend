const router = require("express").Router();
const authController = require("../controllers/authContoller");


// REGISTRATION 

router.post("/register", authController.createUser);


// LOGIN 
router.post("/login", authController.loginUser);


module.exports = router





















/*const express = require ("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs")  
const {User,validateRegisterUser,validateloginUser}  =require("../models/User");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const jwt = require("jsonwebtoken");

// const{verifyAndAuthorization , verifyToken}= require("../middlewares/verifyToken")
/**
 * @desc Register New User
 * @route /api/auth/register
 * @methos POST
 * @access public
 */
//router.post ("/register",authController.createUser);
//router.put("/:id",verifyAndAuthorization,userController.updateUser);
/*
router.post ("/register",asyncHandler(async(req,res)=>{
     if (!req.body) {
        return res.status(400).json({ message: "Request body is empty" });
    }
const{error} = validateRegisterUser (req.body);
if (error)
{
    return res.status(400).json({message: error.details[0].message})
}
const existingUser = await User.findOne({ email: req.body.email });
if (existingUser) 
{
    return res.status(400).json({ message: "This user already registered" });
}



const salt = await bcrypt.genSalt(10);

req.body.password = await bcrypt.hash(req.body.password,salt)
const newUser= new User({
    email:req.body.email,
    username:req.body.username,
    password:CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString(), 

});

const savedUser = await newUser.save();

if (!savedUser) {
    return res.status(500).json({ message: "Failed to save user" });
}

const token =null;
const {password,...other}= savedUser._doc;

res.status(201).json({...other,token});


}));

*/
/**
 * @desc login User
 * @route /api/auth/login
 * @methos POST
 * @access public
 */
//router.post("/login",authController.loginUser);
/*
router.post ("/login",asyncHandler(async(req,res)=>
{

const{error} = validateloginUser (req.body);
if (error)
{
   return res.status(400).json({message: error.details[0].message})
}
const existingUser = await User.findOne({ email: req.body.email });
if (!existingUser) {
   return res.status(400).json({ message: "invalid email" });
}

const isPasswordMatch = await bcrypt.compare(req.body.password,existingUser.password)

if (!isPasswordMatch)
{
    return res.status(400).json({ message: "invalid password" }); 
}

*/
/*
const token=null ;
//const {password,...other}= existingUser._doc;
const { password, __v, createdAt, ...other } = existingUser._doc;
res.status(200).json({...other,token});

*/
/*
const { password, __v, createdAt, ...other } = existingUser._doc;


const userToken = jwt.sign(
    {
      id: existingUser._id,
      isAdmin: existingUser.isAdmin,
      isAgent: existingUser.isAgent,
    },
    process.env.JWT_SEC,
    { expiresIn: '21d' }
  );

  res.status(200).json({...other,userToken});


}));
module.exports=router

 */