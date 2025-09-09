import e from "express";
import mongoose from "mongoose";
import Owner_Router from "./Routes/Owner_route.mjs";
import Apartment_router from "./Routes/Apartment_route.mjs";
import { authenticateToken } from "./Middleware/Authorization.mjs";
import Watchman_Router from "./Routes/Watchman_route.mjs";
import Resident_Router from "./Routes/Resident_route.mjs";
import Guest_Router from "./Routes/Guest_route.mjs";
import cors from "cors";

const app = e();

const corsConfig = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsConfig));
app.use(e.json());
app.use(e.urlencoded({ extended: true }));
app.use("/owner", Owner_Router);
app.use("/watch", Watchman_Router);
app.use("/resident", Resident_Router);
app.use(authenticateToken);
app.use("/guest", Guest_Router);
app.use("/apart", Apartment_router);
mongoose.connect("mongodb://localhost:27017/ApartmentSecurity").then(() => {
  console.log("Database is connected");
});
app.listen(3000, () => {
  console.log("Server is running");
});
