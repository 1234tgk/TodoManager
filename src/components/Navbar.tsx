import Link from "next/link";
import React from "react";
import AuthProfileMenu from "./AuthProfileMenu";

const NavBar = () => {
  return (
    <nav className='bg-blue-500 p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link href='/todo' className='text-white text-2xl font-bold'>
          Home
        </Link>
        <AuthProfileMenu />
      </div>
    </nav>
  );
};

export default NavBar;
