import mongoose from "mongoose";
import Aparments from "./Apartment_model.mjs";

const Guest_schema = new mongoose.Schema({
  Guest_name: {
    type: String,
    required: true,
    trim: true,
  },
  Guest_PhoneNumber: {
    type: String,
    required: true,
    trim: true,
    match: [/^.{10}$/, "Code must be exactly 10 characters long"],
  },
  Visiting_Flat: {
    type: String,
    required: true,
    trim: true,
  },
  Status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  Entered_by: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  Guest_Email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  Verified: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  OTP_id:{
    type:mongoose.Types.ObjectId,
    required:true
  },
  Aparment_id:{
    type:mongoose.Types.ObjectId
  }
});

const Guest = mongoose.model("Guest", Guest_schema);

export default Guest;
