import dotenv from 'dotenv'
import connectDB from "./db/index.js";
dotenv.config({
    path:"./env"
});

//call th db connection
connectDB();

/* This is the first approach to connect db and server connection
import express from "express";
const app = express();
//IIFi(immidiately invoked function) function(fuction call immediately after function declared)
( async ()=>{
 try{
   await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
   app.on("error",(error)=>{
    console.log('error', error);
    throw error
   });
   app.listen(process.env.PORT,()=>{
    console.log(`Server is running on: http://localhost:${process.env.PORT}`)
   })
 } catch(error){
    console.log('error', error)
    throw error
 }
})()

*/