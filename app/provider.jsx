"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
// import { UserDetailContext } from "@/context/UserDetailContext";
import { UserDetailContext } from "../context/UserDetailContext";
import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContext";

function Provider({ children }) {
  const { user } = useUser();
  const [UserDetail, setUserDetail] = useState();
  const [SelectedChapterIndexContext, setSelectedChapterIndexContext] =
    useState(0);

  useEffect(() => {
    user && CreateNewUser();
  }, [user]);

  const CreateNewUser = async () => {
    try {
      const result = await axios.post("/api/user", {
        name: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
      });
      console.log(result.data);
      setUserDetail(result.data);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <UserDetailContext.Provider value={{ UserDetail, setUserDetail }}>
      <SelectedChapterIndexContext.Provider
        value={{ SelectedChapterIndexContext, setSelectedChapterIndexContext }}
      >
        <div>{children}</div>
      </SelectedChapterIndexContext.Provider>
    </UserDetailContext.Provider>
  );
}

export default Provider;
