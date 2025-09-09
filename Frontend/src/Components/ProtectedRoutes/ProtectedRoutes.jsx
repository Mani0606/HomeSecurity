import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoutes({ children }) {
  const { token } = useSelector((state) => state.user);
  if (!token) {
    return <Navigate to={"/home"} replace/>;
  }
  return children;
}