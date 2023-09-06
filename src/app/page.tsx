import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className='min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950'>
        <div className='bg-white dark:bg-gray-800 p-8 rounded shadow-md w-96 text-center'>
          <h2 className='text-2xl mb-4'>Welcome!</h2>

          <p className='mt-4 text-center'>
            <Link
              href='/auth/login'
              className='text-blue-500 hover:text-blue-600'
            >
              Login
            </Link>
            {"  "}
            or {"  "}
            <Link
              href='/auth/sign-up'
              className='text-blue-500 hover:text-blue-600'
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
