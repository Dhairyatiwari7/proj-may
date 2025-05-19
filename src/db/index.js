import mongoose from "mongoose"
import {DB_NAME} from "../constants.js"
const connectDB=async ()=>{
    try {
        const connecrtionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected .. HOST ${connecrtionInstance.connection.host} `)
    } catch (error) {
        console.error("MONGODB connection error",error)
        throw error
    }
}
export default connectDB
