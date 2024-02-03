import { User } from "../models/user.model.js";
import { uploadOnCloudnary } from '../utils/cloudinary.js'
import Jwt from "jsonwebtoken";
const generateAccessAndAccessToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        //save the refresh token in the db
        user.refreshToken = refreshToken
        user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken }
    } catch (error) {
        console.log('something went wrong', error)
    }

}
const registerUser = async (req, res) => {
    const { username, email, fullname, password } = req.body
    //add validation plugin(like zod or any other plugin)
    if (!username && !email && !password) {
        return res.status(400).json({ Message: "all field are required" });
    }
    //check user is already exist or not with email or username
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        return res.status(409).json({ Message: "User is already exist" });
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverLocalPath = req.files?.coverImage[0]?.path;
    if (!avatarLocalPath) {
        return res.status(400).json({ Message: "avatar is required field" });
    }
    //upload on cloudiniary
    const avatar = await uploadOnCloudnary(avatarLocalPath)
    const cover = await uploadOnCloudnary(coverLocalPath)
    if (!avatar) {
        return res.status(400).json({ Message: "avatar is required field" });
    }
    const user = await User.create({
        username, email, fullname, password, avatar: avatar.url, coverImage: cover.url
    })

    //by select command by default gives us all the fields 
    // by giving -(fieldName) means we are unselecting that field
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) {
        return res.status(500).json({ Message: "Something went wrong while registering user" });
    }
    return res.status(201).json({ user: createdUser });
}

const loginUser = async (req, res) => {

    //steps
    //get data from body(req.body)
    //find the user
    //password check
    //access and refresh token
    //send cookie

    const { username, email, password } = req.body
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (!existedUser) {
        return res.status(404).json({ Message: "User does not exit" });
    }
    const isValidPassword = await existedUser.isPasswordCorrect(password);
    if (!isValidPassword) {
        return res.status(404).json({ Message: "User does not exit" });
    }

    //get the access token and refresh token from function(which we already declare above)
    const { accessToken, refreshToken } = await generateAccessAndAccessToken(existedUser._id)
    // now get the logged in user from db beause the above(existedUser) object not have the refresh token
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    //send cookies as response
    //Cookie:- any one can modify the cookies from frontend when we set http only and set secure true then cookies can be modifed from server only
    const options = {
        httpOnly: true,
        secure: true
    }
    //send resposne
    //send response and also send access and refresh token as well so that if user want to use the refresh token or 
    //access token then he can use that
    res.status(200).cookie("accessToken", accessToken, options).cookie('refreshToken', refreshToken, options)
        .json({ user: loggedInUser, accessToken, refreshToken, message: "User logged in successfully" })

}

//logout user

const logOutUser = async (req, res) => {

    //Steps:- clear the cookie, reset the refresh token as well
    await User.findByIdAndUpdate(req.user._id, { $set: { refreshToken: undefined } })
    const options = {
        httpOnly: true,
        secure: true
    }
    res.status(200).clearCookie("accessToken", options).clearCookie('refreshToken', options)
        .json({ message: "User logged Out successfully" })

}

const refreshAccessToken = async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
        if (!incomingRefreshToken) {
            return res.status(404).json({ Message: "unauthorized Request" });
        }
        const decodedToken = Jwt.verify(incomingRefreshToken, process.env.refreshAccessToken)
        const user = await User.findById(decodedToken?._id);
        if (!user) {
            return res.status(404).json({ Message: "invalid refresh token" });
        }
        if (incomingRefreshToken !== user?.refreshToken) {
            return res.status(404).json({ Message: "Refresh token is used or expired" });
        }
        const options = {
            httpOnly: true,
            secure: true
        }
        const { accessToken, newrefreshToken } = await generateAccessAndAccessToken(user._id)
        return res.status(200).cookie("accessToken", accessToken).cookie("refreshToken", newrefreshToken)
            .json({ accessToken, newrefreshToken, message: "access token refreshed successfully" })
    } catch (error) {
        console.log('error', error)
        return res.status(404).json({ Message: "invalid access token" });
    }

}

//update user password
const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body
        const user = User.findById(req.user._id)
        const isPasswordCorrect = await User.isPasswordCorrect(oldPassword)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "invalid old Password" });
        }
        user.password = newPassword
        await user.save({ validateBeforeSave: false })
        return res.status(200).json({ message: "User password has been updated successfully" });
    } catch (error) {
        console.log('error', error);
    }

}

//get current user

const currentUser = async (req, res) => {
    try {
        return res.status(200).json({ currentUser: req.user, message: "User fetched successfully!!" });
    } catch (error) {
        console.log('current user', error);
    }
}

//update user
//to update as well
// then we will write two middlware for this route (for file upload and authentication)
const updateUserDetails = async (req, res) => {
   try {
     const { username, email, fullname } = req.body
 
    const user = await User.findByIdAndUpdate(
         req.user?.id,
         {
             $set: {
                 username,
                 email,
                 fullname
             }
         },
 
         {
             new: true
         }
     ).select("-password")
     return res.status(200).json({user:user, message:"User updated successfully"})
   } catch (error) {
        console.log('error')
   }
}

//req.file we will get from the multer middlewares
const updateUserAvatar = async (req,res) =>{
  try {
      const updateUserAvatar  = req.file?.path
      if(!updateUserAvatar)  {
          return res.status(400).json({message:"Error while uploading avatar"})
      }
     const updateuser = await User.findByIdAndUpdate(
          req.user?._id,
          {$set:{
              avatar:avatar.url
          }},
          {new:true}
          ).select('-password');
          return res.status(200).json({user:updateuser, message:"avatar image updated successfully!!"})
  } catch (error) {
    
  }
}


export { registerUser, loginUser, logOutUser, refreshAccessToken, changePassword, currentUser,updateUserDetails,updateUserAvatar }