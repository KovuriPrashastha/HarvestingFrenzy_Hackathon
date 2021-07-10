import React from "react";
import Feed from "../Feed";
import FarmerNav from "./FarmerNav";

function FarmerFeed({ setFarmer, farmer }) {
  return (
    <div>
      <FarmerNav farmer={farmer} setFarmer={setFarmer} />
      <Feed />
    </div>
  );
}

export default FarmerFeed;
