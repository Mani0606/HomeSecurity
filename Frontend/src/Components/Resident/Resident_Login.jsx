import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../Redux/UserSlice.mjs";
import axios from "axios";

export default function Resident_Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, Seterrors] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/resident/login",
        data
      );
      if (response.status == 200 && response.data.Token) {
        dispatch(addUser(response.data));
        return navigate("/home");
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.msg) {
        Seterrors(error.response.data.msg);
      } else {
        Seterrors("An unexpected error occurred");
      }
    }
  };

  const password = watch("Password");

  return (
    <div className="max-w-md mx-auto mt-30 p-6 bg-lime-500 text-lime-100  shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Login for Residents
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            {...register("Email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-100"
            type="email"
            placeholder="example@email.com"
          />
          {errors.Email && (
            <p className="text-red-500 text-sm mt-1">{errors.Email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            {...register("Password", {
              required: "Password is required",
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-100"
            type="password"
            placeholder="******"
          />
          {errors.Password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.Password.message}
            </p>
          )}
        </div>
        <div>{error && <p className="text-red-500">{error}</p>}</div>

        <button
          type="submit"
          className="w-full bg-lime-100 text-lime-500 font-black py-2 rounded-md hover:bg-lime-200 transition"
        >
          Login
        </button>
      </form>
      <Link to={"/resi/signup"}>
        <p className="text-center mt-3">Don't have an Accout? SignUp</p>
      </Link>
    </div>
  );
}
