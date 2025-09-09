import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function OwnerRoute({ children }) {
  const { role, token } = useSelector((state) => state.user);

  if (!token) {
    return <Navigate to={"/home"} replace />;
  }
  if (token && role !== "Owner") {
    return <Navigate to={"/"} replace />;
  }
  return children;
}
