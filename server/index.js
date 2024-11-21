import express from "express"
import connect from "./db.js";
import userRouter from "./routes/user-route.js"
import transactionRoute from "./routes/transaction-route.js"
import cors from "cors"
import cookieParser from "cookie-parser";
const app=express()

app.use(cors())

app.use(cookieParser())
app.use(express.json())
const PORT=process.env.PORT||5050;


app.use('/api/user/', userRouter)
app.use('/api/transaction', transactionRoute)
app.get('/', (req,res)=>{
    res.send("hi")
})

app.listen(PORT, ()=>{
    console.log("connected to server")
    connect();
})