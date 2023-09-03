"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import { User } from "next-auth";

const Profile = () => {
  const { data } = useSession();
  const user = data?.user as User | null;

  return (
    <>
      <h2 className='text-2xl mb-4'>Profile</h2>
      <div className='mb-4'>
        <p className='text-gray-600 text-lg font-semibold'>
          {user?.name} {user?.role === "admin" && "(ADMIN)"}
        </p>
        <p className='text-gray-500'>{user?.email}</p>
      </div>
      <button
        onClick={() => signOut()}
        className='bg-red-500 text-white p-2 rounded-md hover:bg-red-600'
      >
        Logout
      </button>
    </>
  );
};

export default Profile;
