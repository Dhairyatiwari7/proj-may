import mongoose from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
const videoSchema=new mongoose.Schema(
    {
        videoFile : {
            type : String, //cloudinary url
            required : true
        },
        thumbNail : {
            type : String, //cloudinary url
            required : true
        },
        title : {
            type : String,
            required : true
        },
        description : {
            type : String,
            required : true,  
        },
        Duration : {
            type : Number,
            required : true
        },
        views : {
            type : Number,
            default : 0
        },
        isPublished : {
            type : Boolean,
            default : true
        },
        Owner : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }

    },{
    timestamps : true
    }
)
videoSchema.plugin(mongooseAggregatePaginate)

export const Video=mongoose.Schema("Video",videoSchema)