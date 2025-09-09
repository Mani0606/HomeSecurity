import mongoose from "mongoose";

const Owner_Schema = new mongoose.Schema({
  Owner_name: {
    required: true,
    type: String,
  },
  Owner_PhoneNumber: {
    type: String,
    required: true,
    trim: true,
    match: [/^.{10}$/, "Code must be exactly 10 characters long"],
  },
  Owner_Email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  Owner_Password: {
    type: String,
    minlength: 8,
    required: true,
    trim: true,
  },
  Owner_to:{
    type:mongoose.Types.ObjectId
  }
});

const Owners = mongoose.model("Owners", Owner_Schema);

export default Owners;
