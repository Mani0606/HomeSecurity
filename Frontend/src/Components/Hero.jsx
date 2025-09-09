import React from "react";
import { useSelector } from "react-redux";
import Residents from "./Resident/Residents";
import Owners from "./Owner/Owners";
import WacthMan from "./Watchman/Watchman";




export default function Hero(){
    const {role,token} = useSelector((state) => state.user);
    let tag = <Residents/>
    if(role=='Owner'){
        tag=<Owners/>
    }
    else if(role=='Watchman'){
        tag=<WacthMan/>
    }
    return(
    <>
    {tag}
    </>
    )
}