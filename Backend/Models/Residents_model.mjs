import mongoose from "mongoose";

const ResidentSchema = new mongoose.Schema({
  Resident_name: {
    type: String,
    required: true,
    trim: true,
  },
  Apartment_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  HouseNumber: {
    type: String,
    required: true,
    unique: true,
  },
  Resident_PhoneNumber: {
    type: String,
    required: true,
    trim: true,
    match: [/^.{10}$/, 'Code must be exactly 10 characters long']
  },
  Resident_Email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  Resident_Password: {
    type: String,
    required: true,
    trim: true,
  },  
});

const Residents = mongoose.model("Residents",ResidentSchema)

export default Residents;
