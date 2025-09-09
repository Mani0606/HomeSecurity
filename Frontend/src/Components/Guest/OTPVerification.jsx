import React, { useState } from "react";
import axios from "axios";
import api from "../../API.mjs";
import { useNavigate } from "react-router-dom";

export default function OTPVerification() {
  const [code, setOtp] = useState("");

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // remove non-digits
    if (value.length <= 6) setOtp(value);
  };

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/guest/verify", { code });
      if(response.status==201){
        return navigate("/home")
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-md bg-lime-50 p-8 rounded-lg shadow-lg border-t-4 border-lime-500">
        <h2 className="text-3xl font-bold text-center text-lime-600 mb-6">
          OTP Verification
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Enter 6-digit OTP
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={code}
              onChange={handleChange}
              placeholder="------"
              className="w-full text-center tracking-widest text-2xl px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-lime-500 hover:bg-lime-600 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}
