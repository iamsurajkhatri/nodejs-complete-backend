import mongoose ,{Schema} from "mongoose";

const subscriptionSchema = new Schema({
   subscriber:{
    //the One who is subscribing the channel
    type:Schema.Types.ObjectId,
    ref:"User"
   },
   channel:{
         //One to whom 'Subscriber is subscribing'
    type:Schema.Types.ObjectId,
    ref:"User"
   }    

},{timestamps:true})

export const Subscription = mongoose.model("Subscription", subscriptionSchema);