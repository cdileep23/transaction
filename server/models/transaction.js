import mongoose from 'mongoose';


const transactionModel=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true

    },
    amount:{
        type:Number,
        required:true
    },
    transaction_type:{
        type:String,
        required:true,
        enum:["DEPOSIT", "WITHDRAWAL"]
    },
    status:{
        type:String,
        required:true,
        enum:["PENDING", 'COMPLETED', 'FAILED']
    },timestamp:{
        type:Date,
        default:Date.now
    }
},{
    timestamps:true
})

const  transaction=new mongoose.model('Transaction', transactionModel)
export default transaction
