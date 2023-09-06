import React, { ReactNode } from "react";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { redirect } from "next/navigation";
import NavBar from "@/components/Navbar";

interface Props {
  children: ReactNode;
}

export default async function PrivateLayout({ children }: Props) {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect("/auth/login");

  return (
    <>
      <NavBar />
      <div className='min-h-screen bg-gray-100 dark:bg-gray-950 p-4'>
        <div className='container mx-auto'>{children}</div>
      </div>
    </>
  );
}
