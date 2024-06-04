"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from "@/app/schemas/login";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setIsLoading(false);
    console.log(data);
    const res = await fetch("http://localhost:3004/login", {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      return router.push("/");
    } else if (!res.ok) {
      let respnse = await res.json();
      setIsLoading(true);
      console.log(respnse);
    }
  };
  return (
    <div className="w-full">
      <form
        className=" w-full flex flex-col item-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="text-sm font-medium text-slate-700">Email</label>
        <input
          className=" focus:ring-1 focus:ring-sky-500 rounded-md w-full py-2 px-2 border-slate-300 focus:outline-none border"
          {...register("email", { required: true })}
          type="email"
          name="email"
          placeholder="Enter your email..."
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
        <label className="mt-5 text-sm font-medium text-slate-700">
          Password
        </label>
        <input
          type="password"
          className=" focus:ring-1 focus:ring-sky-500 rounded-md w-full py-2 px-2 border-slate-300 focus:outline-none border"
          {...register("password", { required: true })}
          name="password"
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
        <button
          className="w-full flex justify-center items-center py-2 px-2 rounded-md bg-sky-500 text-white text-center mt-5"
          type="submit"
        >
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
        <div className=" cursor-pointer hover:bg-slate-50 w-full border-2 rounded-md py-2 flex justify-center items-center">
          <Image src="/Google.png" alt="google icon" width={30} height={30} />
          <p className=" text-sm ml-2">Login with Google</p>
        </div>
        <div className=" cursor-pointer hover:bg-slate-50 w-full mt-3 border-2 rounded-md py-2 flex justify-center items-center">
          <Image src="/Facebook.png" alt="google icon" width={30} height={30} />
          <p className=" text-sm ml-2">Login with Facebook</p>
        </div>
      </form>
    </div>
  );
}
