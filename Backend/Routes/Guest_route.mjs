import nodemailer from "nodemailer";
import e from "express";
import WatchMan from "../Models/Watchman_model.mjs";
import Guest from "../Models/Guest_model.mjs";
import OTP from "../Models/OTP_model.mjs";
import Aparments from "../Models/Apartment_model.mjs";

const Guest_Router = e.Router();
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "raghavendramani89@gmail.com",
    pass: "nmczbedeuhsjosxb",
  },
});

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

Guest_Router.post("/create", async (req, res) => {
  try {
    const { Email, Name, Phonenumber, flat } = req.body;
    let entered = req.user.Email;
    const watchman = await WatchMan.findOne({ watchman_Email: entered });
    if (watchman) {
      let otp = generateOTP();
      let otp_expries = new Date(Date.now() + 10 * 60 * 1000);

      const new_otp = new OTP({
        otp: otp,
        experies: otp_expries,
        email: watchman.watchman_Email,
      });
      const save_otp = await new_otp.save();
      const new_guest = new Guest({
        Guest_name: Name,
        Guest_PhoneNumber: Phonenumber,
        Visiting_Flat: flat,
        Guest_Email: Email,
        Entered_by: watchman._id,
        Verified: "Pending",
        OTP_id: save_otp._id,
        Aparment_id: watchman.watchman_to,
      });
      const save_guest = await new_guest.save();

      await transporter.sendMail({
        from: "raghavendramani89@gmail.com",
        to: Email,
        subject: "Your OTP Code",
        text: `Your OTP code is ${otp}`,
      });

      return res.status(200).json({ msg: "OTP has been sent to your Email" });
    } else {
      return res.status(400).json({ msg: "No watchman with Email" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

Guest_Router.post("/verify", async (req, res) => {
  try {
    const { code } = req.body;
    let Email = req.user.Email;
    const new_code = await OTP.findOne({ email: Email, otp: code });
    if (new_code && new_code.experies > Date.now()) {
      const watchman = await WatchMan.findOne({ watchman_Email: Email });
      if (watchman) {
        const guest = await Guest.findOne({ OTP_id: new_code._id });
        guest.Verified = "Approved";
        await guest.save();
        await OTP.deleteOne({ _id: new_code._id });
        return res.status(201).json({ guest });
      }
      return res.status(400).json({ msg: "wrong code" });
    } else {
      return res.status(400).json({ msg: "Wrong Code" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

export default Guest_Router;
