import mongoose from "mongoose";

const Watchman_Schema = new mongoose.Schema({
  watchman_name: {
    required: true,
    type: String,
    trim: true,
  },
  watchman_PhoneNumber: {
    type: String,
    required: true,
    trim: true,
    match: [/^.{10}$/, "Code must be exactly 10 characters long"],
  },
  watchman_Email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  watchman_Password: {
    type: String,
    required: true,
    trim: true,
  },
  watchman_to:{
    type:mongoose.Types.ObjectId,
    required:true
  }
});


const WatchMan  = mongoose.model("WatchMan",Watchman_Schema)

export default WatchMan;
