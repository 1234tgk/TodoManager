"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { User } from "next-auth";

const Profile = () => {
  const { data } = useSession();
  const user = data?.user as User | null;

  return (
    <div>
      You are {user?.name} ({user?.email})!
      {user?.role === "admin" && "ADMIN"}
    </div>
  );
};

export default Profile;
