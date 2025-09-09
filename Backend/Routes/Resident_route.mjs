import e from "express";
import Aparments from "../Models/Apartment_model.mjs";
import Residents from "../Models/Residents_model.mjs";
import {
  Resident_Login,
  Ressident_Create_Validation,
} from "../Validtores/Resident_vaildtor.mjs";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import { authenticateToken } from "../Middleware/Authorization.mjs";
import Guest from "../Models/Guest_model.mjs";
import WatchMan from "../Models/Watchman_model.mjs";
import Watchman_Router from "./Watchman_route.mjs";

dotenv.config();

const Resident_Router = e.Router();

function generate_token(Email) {
  return JWT.sign({ Email: Email, Role: "Resident" }, process.env.JWT_KEY, {
    expiresIn: "1d",
  });
}

Resident_Router.post(
  "/create",
  Ressident_Create_Validation,
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (result.isEmpty()) {
        let { Name, Email, Phonenumber, Password, HouseName, ApartName } =
          req.body;
        const apart = await Aparments.findOne({ Aparment_name: ApartName });
        if (apart) {
          Password = await bcrypt.hash(Password, 10);
          const new_resi = new Residents({
            Resident_name: Name,
            Resident_Password: Password,
            Resident_Email: Email,
            Resident_PhoneNumber: Phonenumber,
            HouseNumber: HouseName,
            Apartment_id: apart._id,
          });
          const save_resi = await new_resi.save();
          return res.status(201).json({ save_resi });
        } else {
          return res.status(400).json({ msg: "No Apartment by this name" });
        }
      } else {
        return res.status(400).json({ result });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

Resident_Router.post("/login", Resident_Login, async (req, res) => {
  try {
    const result = validationResult(req.body);
    if (result.isEmpty()) {
      let { Email, Password } = req.body;
      const resi = await Residents.findOne({ Resident_Email: Email });
      if (resi) {
        const re = bcrypt.compare(Password, resi.Resident_Password);
        if (re) {
          const token = generate_token(Email);
          return res.status(200).json({ Token: token, Role: "Resident" });
        }
        return res.status(403).json({ msg: "Wrong credentais" });
      }
      return res.status(403).json({ msg: "Wrong credentais" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

Resident_Router.get("/requestes", authenticateToken, async (req, res) => {
  try {
    let { Email } = req.user;
    const resident = await Residents.findOne({ Resident_Email: Email });
    if (resident) {
      const guests = await Guest.find({
        Visiting_Flat: resident.HouseNumber,
        Status: "Pending",
        Aparment_id:resident.Apartment_id,
        Verified:"Approved"
      }).select("-Aparment_id").select("-OTP_id").select("-Entered_by");
       if (guests) {
        return res.status(200).json({ guests });
      }
      return res.status(200).json({ msg: "no request for you right now" });
    }
    return res.status(400).json({ msg: `No user with this ${Email}` });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

Resident_Router.put("/approve/:id", authenticateToken, async (req, res) => {
  try {
    let { Email } = req.user;
    let id = req.params.id;
    if (!id) {
      return res.status(400).json({ msg: "please provide id" });
    }

    const resident = await Residents.findOne({ Resident_Email: Email });
    const guest = await Guest.findById(id);

    if (resident.HouseNumber === guest.Visiting_Flat) {
      guest.Status = "Approved";
      await guest.save();

      return res.status(200).json({ msg: "Succesee" });
    }
    return res.status(403).json({ msg: "Your not allowed" });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

Resident_Router.put("/rejected/:id", authenticateToken, async (req, res) => {
  try {
    let { Email } = req.user;
    let id = req.params.id;
    if (!id) {
      return res.status(400).json({ msg: "please provide id" });
    }

    const resident = await Residents.findOne({ Resident_Email: Email });
    const guest = await Guest.findById(id);

    if (resident.HouseNumber === guest.Visiting_Flat) {
      guest.Status = "Rejected";
      await guest.save();

      return res.status(200).json({ msg: "Succesee" });
    }
    
    return res.status(403).json({ msg: "Your not allowed" });
  } catch (error) {
    return res.status(400).json({ error });
  }
});
Watchman_Router.get("/name",async(req,res)=>{
  try {
    const names = await Aparments.find({}).select("Aparment_name");
    return res.status(200).json(names)
  } catch (error) {
    return res.status(403).json({error})
  }
})
export default Resident_Router;
