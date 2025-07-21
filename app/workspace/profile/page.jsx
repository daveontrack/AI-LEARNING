import { UserProfile } from "@clerk/nextjs";
import React from "react";

function Profile() {
  return (
    <div>
      
      <h2 className="font-bold text-3xl mb-7">Manage your profile</h2>
        <UserProfile/>
    </div>
  );
}

export default Profile;
