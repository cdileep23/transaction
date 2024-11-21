import { User } from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";


export const register=async(req,res)=>{
    try {

        const {userName,email,password}=req.body;
        if(!userName||!email||!password){

           return res.status(400).json({message:"All fields are required", success:false})
        }

        const userexist=await User.findOne({email});

        if(userexist){
            return res.status(400).json({message:'Email already in use', success:false})
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = await bcrypt.hash(password, salt);

        const user=await User.create({
            userName,password:hash,email
        })

       

        return res.status(201).json({message:"User successfully Registere", success:true, user})


        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message,success:false})
    }
}



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

   
    if (!email || !password) {
      return res.status(400).json({ message: "All Fields are required", success: false });
    }

    
    const checkUser = await User.findOne({ email });

  
    if (!checkUser) {
      return res.status(400).json({ message: "Incorrect Email", success: false });
    }

   
    const checkPass = await bcrypt.compare(password, checkUser.password);
    if (!checkPass) {
      return res.status(400).json({ message: "Incorrect Password", success: false });
    }

   
    const userDetails = {
      userId: checkUser._id,
    };

    const token = jwt.sign(userDetails, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      })
      .json({
        message: `Welcome back ${checkUser.userName}`,
        success: true,
      });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};


export const logout=async(req,res)=>{
    try {

        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"Logged Out Successfully ",
            success:true
          })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message,success:false})
    }
}