import e from "express";
import {
  Owner_Create_Validation,
  Owner_Login,
} from "../Validtores/Owner_validtor.mjs";
import Owners from "../Models/Owner_model.mjs";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import JWT from "jsonwebtoken";
import Guest from "../Models/Guest_model.mjs";
import Aparments from "../Models/Apartment_model.mjs";
import { authenticateToken, owner_role } from "../Middleware/Authorization.mjs";

const Owner_Router = e.Router();
dotenv.config();
const key = process.env.JWT_KEY;

function token_genrator(email) {
  return JWT.sign({ Email: email, Role: "Owner" }, key, { expiresIn: "1d" });
}

Owner_Router.post("/CreateOwner", Owner_Create_Validation, async (req, res) => {
  const result = validationResult(req.body);
  if (result.isEmpty()) {
    try {
      let { Email, Password, Name, Phonenumber } = req.body;
      const does_owner_exits = await Owners.findOne({ Owner_Email: Email });
      if (does_owner_exits) {
        res.status(400).json({ msg: "Owner already exist" });
      }

      Password = await bcrypt.hash(Password, 10);

      const owner = new Owners({
        Owner_name: Name,
        Owner_Email: Email,
        Owner_PhoneNumber: Phonenumber,
        Owner_Password: Password,
      });
      const save_owner = await owner.save();

      res.status(201).json({ save_owner });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  } else {
    res.status(400).json({ result });
  }
});

Owner_Router.post("/OwnerLogin", Owner_Login, async (req, res) => {
  const result = validationResult(req.body);
  try {
    if (result.isEmpty()) {
      let { Email, Password } = req.body;
      const owner = await Owners.findOne({ Owner_Email: Email });
      if (!owner) {
        res.status(403).json({ msg: "No user with those crendentails" });
      }
      const re = await bcrypt.compare(Password, owner.Owner_Password);
      if (re) {
        const token = token_genrator(Email);
        return res.status(200).json({ Token: token, Role: "Owner" });
      } else {
        return res.status(403).json({ msg: "No user with those crendentails" });
      }
    }
    return res.status(403).json({ result });
  } catch (error) {
    return res.status(403).json({ msg: error });
  }
});

Owner_Router.get(
  "/requests",
  authenticateToken,
  owner_role,
  async (req, res) => {
    try {
      let { Email } = req.user;
      const owner = await Owners.findOne({ Owner_Email: Email }).select(
        "-Owner_Password"
      );
      const aparts = await Aparments.findOne({ Owner_id: owner._id });
      if (aparts) {
        res.status(200).json({ aparts, owner });
      }
      res.status(204).json({ msg: "no data found" });
    } catch (error) {
      res.status(404).status({ error });
    }
  }
);

Owner_Router.get(
  "/all_request",
  authenticateToken,
  owner_role,
  async (req, res) => {
    try {
      let { Email } = req.user;
      const owner = await Owners.findOne({ Owner_Email: Email });
      const guest = await Guest.find({ Aparment_id: owner.Owner_to });
      return res.status(200).json({ guest });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
);

export default Owner_Router;
