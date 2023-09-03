"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function AuthProfileMenu() {
  const { status } = useSession();

  const isAuth = status === "authenticated";
  const router = useRouter();

  if (isAuth) {
    return (
      <ul className='flex items-center space-x-4'>
        <li>
          <button
            className='text-white hover:text-blue-200 transition duration-300'
            onClick={() => signOut()}
          >
            Logout
          </button>
        </li>
        <li>
          <button
            onClick={() => router.push("/profile")}
            className='text-white hover:text-blue-200 transition duration-300'
          >
            <FontAwesomeIcon icon={faUser} />
          </button>
        </li>
      </ul>
    );
  }

  return (
    <ul className='flex items-center space-x-4'>
      <li>
        <Link
          href='/auth/login'
          className='text-white hover:text-blue-200 transition duration-300'
        >
          Login
        </Link>
      </li>
    </ul>
  );
}
