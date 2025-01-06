"use client";
import React from "react";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {};

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const Page = (props: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = form;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("data", data);
  };
  return (
    <div className="mt-10 ">
      <h1 className="lg:text-5xl text-3xl text-center font-extrabold">
        Log in to your Linktree{" "}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-12">
        <div className="mt-4">
          <input
            placeholder="Email"
            type="email"
            className="w-full bg-[#EFF0EB] text-gray-800 border-2 rounded-xl py-3.5 px-3 placeholder-gray-500 focus:outline-none"
            {...register("email")}
          />
          {errors && errors.email && (
            <span className="text-red-600 text-sm">
              {errors?.email.message}
            </span>
          )}
        </div>
        <div className="mt-4">
          <input
            placeholder="password"
            type="password"
            className="w-full bg-[#EFF0EB] text-gray-800 border-2 rounded-xl py-3.5 px-3 placeholder-gray-500 focus:outline-none"
            {...register("password")}
          />
          {errors && errors.password && (
            <span className="text-red-600 text-sm">
              {errors?.password.message}
            </span>
          )}
        </div>
        <div className="mt-10">
          <button
            className="rounded-full w-full p-3 font-bold bg-[#8228D9] hover:bg-[#6c21b3] text-white disabled:bg-[#EFF0EB] disabled:text-[#A7AAA2]"
            type="submit"
            disabled={!watch("email") || !watch("password")}
          >
            Log In
          </button>
        </div>
      </form>
      <div className="text-[14px text-center pt-12]">
        Dont have an account?
        <Link href={"/register"} className="text-[#8228D9] underline">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Page;
