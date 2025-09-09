import { useState } from "react";
import "./App.css";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import { Route, Routes } from "react-router-dom";
import Owner_Signup from "./Components/Owner/Owner_Signup";
import Owner_Login from "./Components/Owner/Owner_Login";
import Watchman_Signup from "./Components/Watchman/Watchman_Signup";
import Watchman_Login from "./Components/Watchman/Wactman_Login";
import Resident_Signup from "./Components/Resident/Resident_Signup";
import Resident_Login from "./Components/Resident/Resident_Login";
import Hero from "./Components/Hero";
import Add_Building from "./Components/Owner/Add_Building";
import GuestForm from "./Components/Guest/GuestForm";
import OTPVerification from "./Components/Guest/OTPVerification";
import HeroRoute from "./Components/ProtectedRoutes/HeroRoute";
import OwnerRoute from "./Components/ProtectedRoutes/OwnerRoute";
import WatchmanRoute from "./Components/ProtectedRoutes/WatchmanRoute";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";

function App() {
  return (
    <div className="min-w-full h-screen bg-lime-100 overflow-hidden">
      <NavBar />
      <Routes>
        <Route
          path="/home"
          element={
            <HeroRoute>
              <Home />
            </HeroRoute>
          }
        />
        <Route path="/owner/signup" element={<Owner_Signup />} />
        <Route path="/owner/login" element={<Owner_Login />} />
        <Route path="/watch/signup" element={<Watchman_Signup />} />
        <Route path="/watch/login" element={<Watchman_Login />} />
        <Route path="/resi/signup" element={<Resident_Signup />} />
        <Route path="/resi/login" element={<Resident_Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Hero />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/owner/building"
          element={
            <OwnerRoute>
              <Add_Building />
            </OwnerRoute>
          }
        />
        <Route
          path="/guest/create"
          element={
            <WatchmanRoute>
              <GuestForm />
            </WatchmanRoute>
          }
        />
        <Route
          path="/guest/verify"
          element={
            <WatchmanRoute>
              <OTPVerification />
            </WatchmanRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
