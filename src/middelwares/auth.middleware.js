import  Jwt  from "jsonwebtoken";
import { User } from "../models/user.model";
export const verifyJWT = async (req,res,next) =>{
   try {
     const token =  req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer","")
     if(!token) {
         res.status(401).json({message:"unauthorized request"})
     }
    const decodedInfo =  Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const user = await User.findById(decodedInfo?._id).select('-password -refreshToken')
    if(!user) {
     res.status(401).json({message:"invalid access Token"})
    }
    req.user = user
    next();
   } catch (error) {
     console.log('invalid access token')
     res.status(401).json({message:"invalid access Token"})
   }
}