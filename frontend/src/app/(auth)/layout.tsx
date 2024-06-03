"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <>
      <div className="flex w-full h-dvh ">
        <div className="w-1/2 flex flex-col items-center justify-center bg-rose-50">
          <div className="flex items-center text-2xl">
            <div>
              <p>
                Welcome to <span className="mr-1 font-semibold"> SayHi</span>
              </p>
            </div>
            <div>
              <Image
                src="/logo-black.svg"
                width={36}
                height={36}
                alt="smilling chat"
              />
            </div>
          </div>
          <Image
            className="mt-5"
            src="/online-worlds.png"
            width={400}
            height={400}
            alt="phone icon"
          />
        </div>
        <div className="flex flex-col w-1/2">
          <div className="flex w-full justify-center mt-5 mb-5">
            <Link href="./login" className="w-1/2">
              <div
                className={
                  pathname.startsWith("/login")
                    ? " text-slate-600 text-center h-fit w-full pt-1 pb-1 bg-blue-100 font-medium border-2 border-cyan-400 transition-colors rounded-l-md"
                    : " text-slate-400 rounded-l-md transition-colors h-fit w-full  flex pt-1 pb-1 justify-center items-center border-2 border-cyan-400 bg-transparent font-normal"
                }
              >
                <p>Login</p>
              </div>
            </Link>
            <Link href="./signup" className="w-1/2">
              <div
                className={
                  pathname.startsWith("/signup")
                    ? " text-slate-600 text-center h-fit w-full pt-1 pb-1 bg-blue-100 font-medium border-2 border-cyan-400 transition-colors rounded-r-md"
                    : " text-slate-400 rounded-r-md transition-colors h-fit  w-full flex pt-1 pb-1 justify-center items-center border-2 border-cyan-400 bg-transparent font-normal"
                }
              >
                <p>Sign up</p>
              </div>
            </Link>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
