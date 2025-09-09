import { body } from "express-validator";

export const Ressident_Create_Validation = [
  body("Email")
    .notEmpty()
    .withMessage("Email should be given")
    .isEmail()
    .withMessage("Value should be an Email")
    .isString()
    .withMessage("Email should be an String"),
  body("Name")
    .notEmpty()
    .withMessage("Name should be given")
    .isString()
    .withMessage("Name should only be String")
    .isLength({ max: 10, min: 3 })
    .withMessage("Name should have atleast 3 letters and only upto 10 letters"),
  body("Phonenumber")
    .notEmpty()
    .withMessage("Phone Number should be given")
    .isString()
    .withMessage("Phone Number should only be String")
    .isLength({ max: 10, min: 10 })
    .withMessage("Phone Number should exactly have 10 characters"),
  body("Password")
    .notEmpty()
    .withMessage("Password should be given")
    .isString()
    .withMessage("Password should be String")
    .isLength({ max: 14, min: 8 })
    .withMessage("Password should have 4 letters and maxiumu 14 letters")
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=<>?])[A-Za-z\d!@#$%^&*()_\-+=<>?]{8,14}$/
    )
    .withMessage(
      "Password must be 8–14 characters, include at least one uppercase letter and one special character"
    ),
  body("HouseName")
    .notEmpty()
    .withMessage("HouseNumber should be given")
    .isString()
    .withMessage("HouseNumber should be a String"),
  body("ApartName")
    .notEmpty()
    .withMessage("Apartment name should be given")
    .isString()
    .withMessage("Apartment name should be a String"),
];

export const Resident_Login = [
  body("Email").notEmpty().withMessage("Email should be given").isEmail(),
  body("Password")
    .notEmpty()
    .withMessage("Password should be given")
    .isString()
    .withMessage("Password should be a Sring"),
];
