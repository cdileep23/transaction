import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const connect=async()=>{
    try {
        console.log("hello")

       await mongoose.connect(process.env.MONGO_DB_URL).then(()=>{
        console.log("connected to DB")
       }).catch((err)=>{
        console.log(err)
       })
        
    } catch (error) {
        console.log(error)
    }
}


export default connect