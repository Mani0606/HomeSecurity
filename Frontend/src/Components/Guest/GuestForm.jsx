import React from "react";
import { useForm } from "react-hook-form";
import api from "../../API.mjs";
import { useNavigate } from "react-router-dom";

export default function GuestForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      const response = await api.post("/guest/create", data);
      if (
        response.status == 200 &&
        response.data.msg == "OTP has been sent to your Email"
      ) {
        return navigate("/guest/verify");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen  flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-lime-50 rounded-lg shadow-lg p-8 border-t-4 border-lime-500">
        <h2 className="text-3xl font-bold text-center text-lime-600 mb-6">
          Guest Entry Form
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="John Doe"
              {...register("Name", { required: "Name is required" })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
            {errors.Name && (
              <p className="text-red-500 text-sm mt-1">{errors.Name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="example@mail.com"
              {...register("Email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
              })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
            {errors.Email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.Email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="9876543210"
              {...register("Phonenumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit number",
                },
              })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
            {errors.Phonenumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.Phonenumber.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Flat</label>
            <input
              type="text"
              placeholder="A-204"
              {...register("flat", { required: "Flat is required" })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
            {errors.flat && (
              <p className="text-red-500 text-sm mt-1">{errors.flat.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-lime-500 hover:bg-lime-600 text-white font-bold py-2 rounded-md transition duration-200"
          >
            Submit Guest Info
          </button>
        </form>
      </div>
    </div>
  );
}
