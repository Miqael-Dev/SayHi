"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  interface user {
    id: string;
    email: string;
    username: string;
    password: string;
    emailVerified: null;
    name: null;
    image: null;
  }
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [userData, setUserData] = useState<user>();
  useEffect(() => {
    const verifyToken = async () => {
      const res = await fetch("http://localhost:3004/chats", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        let response = await res.json();
        if (response.login == false) {
          setAuthorized(false);
          return router.push("/login");
        }
      } else if (res.ok) {
        setAuthorized(true);
        let response = await res.json();
        setUserData(response);
      }
    };

    verifyToken();
  }, [router]);
  console.log(userData);
  return (
    <>
      {authorized && (
        <div className="flex flex-col w-full h-dvh justify-center items-center">
          <h1 className=" text-base">Email : {userData?.email}</h1>
          <h1 className=" text-base">Username : {userData?.username}</h1>
          <h1 className=" text-base">id: {userData?.id}</h1>
        </div>
      )}
    </>
  );
}
