"use client";
import { SignupSchema } from "@/app/schemas/signup";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

export const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SignupSchema>) => {
    setIsLoading(false);
    let userData = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    console.log(userData);
    await fetch("http://localhost:3004/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        if (data) {
          setIsLoading(true);
          return router.push("/login");
        }
      })
      .catch((err) => {
        setIsLoading(true);
        console.error("Signup error", err);
      });
  };
  console.log(errors.username);

  return (
    <>
      <div className="w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center"
        >
          <div className="w-full">
            <p className="text-sm font-medium text-slate-700">Username </p>
            <input
              {...register("username")}
              type={"text"}
              name="username"
              placeholder="Enter your username..."
              className=" focus:ring-1 focus:ring-sky-500 rounded-md w-full py-2 px-2 border-slate-300 focus:outline-none border"
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>
          <div className="w-full mt-5">
            <p className="text-sm font-medium text-slate-700">Email </p>
            <input
              {...register("email")}
              type="email"
              name="email"
              placeholder="Enter your email..."
              className=" focus:ring-1 focus:ring-sky-500 rounded-md w-full py-2 px-2 border-slate-300 focus:outline-none border"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="w-full mt-5 gap-2 flex">
            <div className="w-1/2">
              <p className="text-sm font-medium text-slate-700">Password </p>
              <input
                {...register("password")}
                type="password"
                name="password"
                placeholder="Enter password..."
                className=" focus:ring-1 focus:ring-sky-500 rounded-md w-full py-2 px-2 border-slate-300 focus:outline-none border"
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="w-1/2">
              <p className="text-sm font-medium text-slate-700">
                Confirm password
              </p>
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="Enter password again..."
                className=" focus:ring-1 focus:ring-sky-500 rounded-md w-full py-2 px-2 border-slate-300 focus:outline-none border"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
          <button className=" flex items-center justify-center cursor-pointer w-full py-2 px-2 rounded-md bg-sky-500 text-white text-center mt-5">
            {isLoading ? (
              <p>Sign up</p>
            ) : (
              <Image
                className="animate-spin"
                src={"/loading.png"}
                width={20}
                height={20}
                alt=""
              />
            )}
          </button>
          <div className=" my-3 flex w-full items-center">
            <div className=" bg-slate-300 w-full h-px"></div>
            <p className=" px-1">Or</p>
            <div className=" bg-slate-300 w-full h-px"></div>
          </div>
          <div
            onClick={() => signIn("google")}
            className=" cursor-pointer hover:bg-slate-50 w-full border-2 rounded-md py-2 flex justify-center items-center"
          >
            <Image src="/Google.png" alt="google icon" width={30} height={30} />
            <p className=" text-sm ml-2">Sign up with Google</p>
          </div>
          <div
            onClick={() => signIn("facebook")}
            className=" cursor-pointer hover:bg-slate-50 w-full mt-3 border-2 rounded-md py-2 flex justify-center items-center"
          >
            <Image
              src="/Facebook.png"
              alt="google icon"
              width={30}
              height={30}
            />
            <p className=" text-sm ml-2">Sign up with Facebook</p>
          </div>
        </form>
      </div>
    </>
  );
};
