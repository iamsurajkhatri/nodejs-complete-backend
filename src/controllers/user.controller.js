
import { User } from "../models/user.model.js";
import { uploadOnCloudnary } from '../utils/cloudinary.js'
const registerUser = async (req, res) => {
    const { username, email, fullname, password } = req.body
        //add validation plugin(like zod or any other plugin)
        if(!username && !email && ! password) {
            return res.status(400).json({Message:"all field are required"});
        }
        //check user is already exist or not with email or username
        const existedUser=  await  User.findOne({
            $or:[{ username }, { email }]
        })
        if(existedUser) {
            return res.status(409).json({Message:"User is already exist"});
        }

       const avatarLocalPath =  req.files?.avatar[0]?.path;
       const coverLocalPath = req.files?.coverImage[0]?.path;
       if(!avatarLocalPath) {
        return res.status(400).json({Message:"avatar is required field"});
       }
       //upload on cloudiniary
       const avatar =  await uploadOnCloudnary(avatarLocalPath)
       const cover  =  await uploadOnCloudnary(coverLocalPath)
       if(!avatar) {
        return res.status(400).json({Message:"avatar is required field"});
       }
 const user = await User.create({
    username,email, fullname, password, avatar:avatar.url, coverImage:cover.url
    })

    //by select command by default gives us all the fields 
    // by giving -(fieldName) means we are unselecting that field
  const createdUser =  await User.findById(user._id).select(
   "-password -refreshToken" 
  )
  if(!createdUser) {
    return res.status(500).json({Message:"Something went wrong while registering user"});
  }
return res.status(201).json({user:createdUser});
}

export { registerUser }