import mongoose, { Schema } from "mongoose";

const userModel=new mongoose.Schema({

    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

},{
    timestamps:true
})

export const User=new mongoose.model('User', userModel)