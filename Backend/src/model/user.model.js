import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    refreshToken:{
        type:String
    },
    username:{
        type:String,

    },
    userProfile:{
        type:String,

    },
},{
    timestamps:true,
})


userSchema.pre("save",async function(next){
    if(this.isModified("password")){  
        this.password = await bcrypt.hash(this.password,10)
       
            next(); 
    }
})


userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=async function( ){
    const accessToken= await  jwt.sign({
          id:this._id,
          username:this.username,
          email:this.email
      },process.env.ACCESS_TOKEN_SECRET,
      {
          expiresIn:process.env.ACCESS_TOKEN_EXPIRY
      })
      return accessToken
  }


userSchema.methods.generateRefreshToken=async function( ){
    const refreshToken= await  jwt.sign({
          id:this.email,
      },process.env.REFRESH_TOKEN_SECRET,
      {
          expiresIn:process.env.REFRESH_TOKEN_EXPIRY
      })
      return refreshToken
  }

const userModel=new mongoose.model("users",userSchema);
export default userModel;