import React from "react";
import CustomerNav from "./CustomerNav";
import Feed from "../Feed";

function CustomerFeed({ user, setUser }) {
  return (
    <div>
      <CustomerNav user={user} setUser={setUser} />
      <Feed />
    </div>
  );
}

export default CustomerFeed;
