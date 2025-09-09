import e from "express";
import JWT from "jsonwebtoken";
import Aparments from "../Models/Apartment_model.mjs";
import WatchMan from "../Models/Watchman_model.mjs";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import Guest from "../Models/Guest_model.mjs";
import { authenticateToken, guest_role } from "../Middleware/Authorization.mjs";

const Watchman_Router = e.Router();
dotenv.config();

function generate_token(email) {
  return JWT.sign({ Email: email, Role: "Watchman" }, process.env.JWT_KEY, {
    expiresIn: "1d",
  });
}

Watchman_Router.post("/create", async (req, res) => {
  try {
    let { Name, Phonenumber, Email, Password, Apartment } = req.body;
    const exits_watch = await WatchMan.findOne({ watchman_Email: Email });
    if (exits_watch) {
      return res.status(400).json({ msg: "This credentials already exist" });
    }
    const Apart = await Aparments.findOne({ Aparment_name: Apartment });
    if (Apart) {
      Password = await bcrypt.hash(Password, 10);
      const new_watch = new WatchMan({
        watchman_Email: Email,
        watchman_name: Name,
        watchman_PhoneNumber: Phonenumber,
        watchman_to: Apart._id,
        watchman_Password: Password,
      });
      const save_watch = await new_watch.save();
      return res.status(201).json({ save_watch });
    } else {
      return res
        .status(400)
        .json({ mgs: "There is no Apartments by that name" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

Watchman_Router.post("/login", async (req, res) => {
  try {
    let { Email, Password } = req.body;
    const watch = await WatchMan.findOne({ watchman_Email: Email });
    if (watch) {
      const re = bcrypt.compare(Password, watch.watchman_Password);
      if (re) {
        const token = generate_token(Email);
        return res.status(200).json({ Token: token, Role: "Watchman" });
      }
      return res.status(403).json({ msg: "Wrong credentais" });
    }
    return res.status(403).json({ msg: "Wrong credentais" });
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
});

Watchman_Router.get(
  "/requests",
  authenticateToken,
  guest_role,
  async (req, res) => {
    try {
      let { Email } = req.user;
      const watchman = await WatchMan.findOne({ watchman_Email: Email });
      const guest = await Guest.find({
        Status: "Pending",
        Aparment_id: watchman.watchman_to,
      })
        .select("-OTP_id")
        .select("-Aparment_id");
      return res.status(200).json({ guest });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
);

Watchman_Router.get(
  "/approved",
  authenticateToken,
  guest_role,
  async (req, res) => {
    try {
      const guest = await Guest.find({ Status: "Approved" });
      return res.status(200).json({ guest });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
);

export default Watchman_Router;
