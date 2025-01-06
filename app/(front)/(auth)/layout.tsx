"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const pathName = usePathname();
  console.log("pathname", pathName);
  return (
    <div className="h-screen w-full flex justify-between">
      <div className="lg:pt-7 pt-3 lg:px-12 px-6 lg:w-2/3 w-full lg:min-w-[800px]">
        <Link href={"/"} className="inline-block">
          <Image
            src={"/linktree-logo.png"}
            alt=""
            className="lg:w-28 w-[75px] select-none"
            width={100}
            height={30}
          />
        </Link>
        <main className="w-full">
          <div className="w-full md:max-w-[550px] max-w-[360px] mx-auto">
            {children}
          </div>
        </main>
      </div>
      <div className="lg:block hidden w-1/3 pointer-events-none">
        {pathName === "/login" ? (
          <>
            <img
              src={"/side1.png"}
              alt=""
              className="object-cover w-full h-screen select-none"
            />
          </>
        ) : (
          <>
            <img
              src={"/side2.png"}
              alt=""
              className="object-cover w-full h-screen select-none"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Layout;
