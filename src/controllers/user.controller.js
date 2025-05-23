import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser=asyncHandler( async (req,res)=>{
    res.status(200).send({
        message : "OK"
    })
})
const loginUser=asyncHandler( async (req,res)=>{
    res.status(200).send({
        message : "OK"
    })
})
export {registerUser,loginUser} 