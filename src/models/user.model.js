import mongoose ,{Schema} from "mongoose";
import  Jwt  from "jsonwebtoken";
import bcrypt from "bcrypt"
//index:true for enable indexing 
const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String, //cloudnary url(upload on cloudnairy and it return us a url)
        required:true,
      
    },
    coverImage:{
        type:String, //cloudnary url(upload on cloudnairy and it return us a url)
       
    },
watchHistory:[
    {
    type:Schema.Types.ObjectId,
    ref:"Vido"
        
    }
],
password: {
    type:String,
    required:[true, 'Password is required']
},
refreshToken:{
    type:String
}

},{ timestamps:true} )

//hooks middleware in mongoose

//bcrypt the password before save in db
// only bcryt password filed when there is changes in the password field
//after bcrypt call the next middlware to run the code next

userSchema.pre("save", async function(next){
 if(!this.isModified('password')) return next()
 this.password = await bcrypt.hash(this.password, 10);
 next();
})

//custom method in mongoose
//compare password during access 
userSchema.methods.isPasswordCorrect = async function (password){
 return await bcrypt.compare(password, this.password)
} 

//custom methods
//generate access token method
userSchema.methods.generateAccessToken = async function(){
return Jwt.sign({
    _id:this._id,
    email:this.email,
     username:this.username,
     fullName:this.fullName
 },
 process.env.ACCESS_TOKEN_SECRET,
 {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
 }
 )
}

//generate refresh token method
userSchema.methods.generateRefreshToken = async function(){
    return Jwt.sign({
        _id:this._id,
     },
     process.env.REFRESH_TOKEN_SECRET,
     {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
     }
     )
}

export const User = mongoose.model("User", userSchema);
