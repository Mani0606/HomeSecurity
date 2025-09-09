import mongoose from "mongoose";

const Apartment_Schema = new mongoose.Schema({
  Aparment_name: {
    type: String,
    required: true,
    trim: true,
  },
  No_of_Buildings: {
    type: Number,
    required: true,
    default: 1,
  },
  No_of_floors: {
    type: Number,
    required: true,
    default: 1,
  },
  No_of_flats: {
    type: Number,
    required: true,
    default: 1,
  },
  Owner_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

const Aparments = mongoose.model("Apartments", Apartment_Schema);

export default Aparments;
