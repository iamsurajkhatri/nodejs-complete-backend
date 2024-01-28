
import mongoose, { Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema({
   videoFile:{
    type:String,  //cloudnairy url
    required:true
   },
   thumbnail:{
    type:String,  //cloudnairy url
    required:true
   },
   title:{
    type:String, 
    required:true
   },
   //duration return us from cloudnairy
   duration:{
    type:Number, 
    default:0
   },
   isPublished:{
    type:Boolean,  //cloudnairy url
    default:true
   },
   owner:{
    type:Schema.Types.ObjectId,
    ref:"User"
   }


},{ timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate);
export const Video = mongoose.model("Video", videoSchema)