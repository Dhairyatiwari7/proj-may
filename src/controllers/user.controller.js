import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js"
import {upload} from "../middlewares/multer.middleware.js"
import {uploadFileOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser=asyncHandler( async (req,res)=>{
    const {fullName,email,userName,password}=req.body
    console.log("email",email); 
    if( [fullName,email,userName,password].some((field)=>field.trim()==="") ){
        throw new ApiError(400,"All fields are required");
    }
    const existedUser=User.findOne({
        $or :[{email},{userName}]
    })
    if(existedUser){
        throw new ApiError(409,"User already exists")
    }
    const avatarLocalPath=req.files?.avatar[0].path;
    const coverImageLocalPath=req.files?.coverImage[0].path;
    console.log("avatarLocalPath",avatarLocalPath)
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required");
    }
    const avatar=await uploadFileOnCloudinary(avatarLocalPath)
    const coverImage=await uploadFileOnCloudinary(coverImageLocalPath)
    if(!avatar){
        throw new ApiError(400,"Avatar file is required");
    }
    const user = await User.create({
        fullname,
        avatar : avatar.url,
        coverImage : coverImage?.url || "",
        email,
        password,
        userName : toLowerCase(userName)
    })

    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registration")
    }
    return res.status(201).send(new ApiResponse(200,createdUser,"User created successfully"))

})

const loginUser=asyncHandler( async (req,res)=>{
    res.status(200).send({
        message : "OK"
    })  
})
export {registerUser,loginUser} 