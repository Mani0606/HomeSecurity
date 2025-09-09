import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../../API.mjs";

export default function Add_Building() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data)
    try {
      const response = await api.post(
        "/apart/create",
        data
      );
      if (response.status === 201 && response.data) {
        return navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
   <div className="max-w-md mx-auto mt-30 p-6 bg-lime-500 text-lime-100 shadow-md rounded-md">
  <h2 className="text-2xl font-bold mb-6 text-center">Apartment Register</h2>

  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
    <div>
      <label className="block mb-1 font-medium">Name</label>
      <input
        {...register("Name", { required: "Apartment name is required" })}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-100"
        type="text"
        placeholder="Apartment Name"
      />
      {errors.name && (
        <p className="text-red-500 text-sm mt-1">{errors.Name.message}</p>
      )}
    </div>

    <div>
      <label className="block mb-1 font-medium">Buildings</label>
      <input
        {...register("buildings", {
          required: "Number of buildings is required",
        })}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-100"
        type="number"
        placeholder="Number of buildings"
      />
      {errors.buildings && (
        <p className="text-red-500 text-sm mt-1">{errors.buildings.message}</p>
      )}
    </div>

    <div>
      <label className="block mb-1 font-medium">Floors</label>
      <input
        {...register("floors", {
          required: "Number of floors is required",
        })}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-100"
        type="number"
        placeholder="Number of floors"
      />
      {errors.floors && (
        <p className="text-red-500 text-sm mt-1">{errors.floors.message}</p>
      )}
    </div>

    <div>
      <label className="block mb-1 font-medium">Flats</label>
      <input
        {...register("flats", {
          required: "Number of flats is required",
        })}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-100"
        type="number"
        placeholder="Number of flats"
      />
      {errors.flats && (
        <p className="text-red-500 text-sm mt-1">{errors.flats.message}</p>
      )}
    </div>

    <button
      type="submit"
      className="w-full bg-lime-100 text-lime-500 font-black py-2 rounded-md hover:bg-lime-300 transition"
    >
      Register the Apartments
    </button>
  </form>
</div>

  );
}
