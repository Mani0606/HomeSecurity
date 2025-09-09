import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Owner_Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/owner/CreateOwner",data)
      if(response.status===201 && response.data){
        navigate("/owner/login")
      }
    } catch (error) {
      console.log(error)
    }
  };

  const password = watch('Password');
  console.log(password)

  return (
    <div className="max-w-md mx-auto mt-30 p-6 bg-lime-500 text-lime-100  shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            {...register('Name', { required: 'Name is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-100"
            type="text"
            placeholder="John Doe"
          />
          {errors.Name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Phone Number</label>
          <input
            {...register('Phonenumber', {
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Enter a valid 10-digit phone number',
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-100"
            type="tel"
            placeholder="1234567890"
          />
          {errors.phonenumber && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            {...register('Email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email',
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-100"
            type="email"
            placeholder="example@email.com"
          />
          {errors.Email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            {...register('Password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-100"
            type="password"
            placeholder="******"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Confirm Password</label>
          <input
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) =>
                value === password || 'Passwords do not match',
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-100"
            type="password"
            placeholder="******"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-lime-100 text-lime-500 font-black py-2 rounded-md hover:bg-lime-300 transition"
        >
          Register
        </button>
      </form>
      <Link to={"/owner/login"}><p className='text-center mt-3'>Already have an Accout? Login</p></Link>
    </div>
  );
}
