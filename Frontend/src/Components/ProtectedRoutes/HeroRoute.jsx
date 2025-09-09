import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function HeroRoute({ children }) {
  const { role, token } = useSelector((state) => state.user);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
