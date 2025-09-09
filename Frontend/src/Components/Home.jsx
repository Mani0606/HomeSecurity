import React from "react";
import { ShieldUser, User, UserCog } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate()
  return (
    <div className="min-w-full h-screen flex items-center justify-center">
      <div className="grid grid-cols-3 grid-rows-1 gap-5">
        <div className="size-32 flex flex-col items-center  hover:text-lime-600 hover:scale-110 transform duration-500" onClick={()=>{navigate("/watch/signup")}}>
          <ShieldUser className="size-28 text-lime-500 " />
          <p className="text-center">Wacth-Man</p>
        </div>
        <div className="size-32 flex flex-col items-center  hover:text-lime-600 hover:scale-110 transform duration-500" onClick={()=>{navigate("/owner/signup")}}>
          <UserCog className="size-28 text-lime-500" />
          <p className="text-center">Owner</p>
        </div>
        <div className="size-32 flex flex-col items-center  hover:text-lime-600 hover:scale-110 transform duration-500" onClick={()=>{navigate("/resi/signup")}}>
          <User className="size-28 text-lime-500" />
          <p className="text-center">Resident</p>
        </div>
      </div>
    </div>
  );
}
