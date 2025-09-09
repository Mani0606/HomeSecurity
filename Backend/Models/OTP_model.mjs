import mongoose from "mongoose";


const OTP_schema = new mongoose.Schema({
    otp:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    experies:{
        type:Date,
        required:true
    }
})


const OTP = mongoose.model("OTP",OTP_schema)

export default OTP
