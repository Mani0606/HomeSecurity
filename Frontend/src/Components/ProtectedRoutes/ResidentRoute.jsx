import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function ResidentRoute({ children }){
    const{role,token} = useSelector((state)=>state.user);

    if(!token && role!=='Resident'){
        return <Navigate to={"/home"} replace/>
    }
      return children;
}