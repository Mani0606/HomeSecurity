import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../Redux/UserSlice.mjs";

export default function NavBar() {
  const { role } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <nav className="min-w-full flex flex-row p-3 items-center justify-between">
      <Link to={"/"}>
        <p className="text-3xl font-medium text-lime-500">HomeSecurity</p>
      </Link>
      {role == "none" ? (
        <div className="flex flex-row justify-between space-x-3">
          <Link to={"/resi/login"}>
            <button className="bg-lime-500 text-lime-100 p-2 hover:bg-lime-600 hover:scale-110 transform duration-500 rounded-2xl">
              Login
            </button>
          </Link>
          <Link to={"/resi/signup"}>
            <button className="bg-lime-500 text-lime-100 p-2 hover:bg-lime-600 hover:scale-110 transform duration-500 rounded-2xl">
              Signup
            </button>
          </Link>
        </div>
      ) : (
        <div className="space-x-4">
          {["Owner", "Watchman"].includes(role) && (
            <button className="bg-lime-500 text-lime-100 p-2 hover:bg-lime-600 hover:scale-110 transform duration-500 rounded-2xl">
              Add a Guest
            </button>
          )}
          {role == "Owner" && (
            <Link to={"/owner/building"}>
              <button className="bg-lime-500 text-lime-100 p-2 hover:bg-lime-600 hover:scale-110 transform duration-500 rounded-2xl">
                Add a building
              </button>
            </Link>
          )}
          {["Resident", "Owner", "Watchman"].includes(role) && (
            <button
              className="bg-lime-500 text-lime-100 p-2 hover:bg-lime-600 hover:scale-110 transform duration-500 rounded-2xl"
              onClick={() => {
                dispatch(removeUser());
              }}
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
