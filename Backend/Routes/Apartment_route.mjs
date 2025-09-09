import e from "express";
import { authenticateToken,owner_role } from "../Middleware/Authorization.mjs";
import Owners from "../Models/Owner_model.mjs";
import Aparments from "../Models/Apartment_model.mjs";

const Apartment_router = e.Router();

Apartment_router.post("/create", owner_role, async (req, res) => {
  try {
    let { Name, buildings, floors, flats } = req.body;
    const { Email } = req.user;
    const owner = await Owners.findOne({ Owner_Email: Email });
    if (owner) {
      const apart = new Aparments({
        Aparment_name: Name,
        No_of_Buildings: buildings,
        No_of_floors: floors,
        No_of_flats: flats,
        Owner_id:owner._id
      });
      const save_apart = await apart.save();
      owner.Owner_to = save_apart._id;
      await owner.save();
      return res.status(201).json({  owner });
    }
    return res.status(400).json({ msg: "Something went wrong" });
  } catch (error) {
    return res.status(400).json({ error });
  }
});


export default Apartment_router;