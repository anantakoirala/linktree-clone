"use client";
import { useMediaQuery } from "@/app/hooks/user-media-query";
import React from "react";

type Props = {
  fill?: string;
};

const Instagram = ({ fill }: Props) => {
  const isLargeScreen = useMediaQuery("(min-width:640px)");
  console.log("islargescsreen", isLargeScreen);
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className=" "
      role="img"
      aria-hidden="true"
      aria-labelledby=" "
    >
      <path
        fill={fill ? fill : "currentColor"}
        d="M21.94 7.71a7.33 7.33 0 0 0-.46-2.4 4.62 4.62 0 0 0-1.1-1.69 4.61 4.61 0 0 0-1.7-1.1 7.32 7.32 0 0 0-2.4-.45C15.19 2 14.83 2 12 2s-3.19.01-4.29.06a7.33 7.33 0 0 0-2.4.46 4.62 4.62 0 0 0-1.69 1.1 4.61 4.61 0 0 0-1.1 1.7 7.32 7.32 0 0 0-.46 2.39C2.01 8.81 2 9.18 2 12s.01 3.19.06 4.29a7.33 7.33 0 0 0 .46 2.4 4.62 4.62 0 0 0 1.1 1.69 4.61 4.61 0 0 0 1.7 1.1 7.32 7.32 0 0 0 2.4.45c1.1.05 1.46.07 4.28.07s3.19-.02 4.3-.07a7.33 7.33 0 0 0 2.38-.45 4.9 4.9 0 0 0 2.8-2.8 7.32 7.32 0 0 0 .46-2.4c.05-1.1.06-1.47.06-4.29s-.01-3.18-.06-4.28Zm-1 8.53a6.35 6.35 0 0 1-.39 2.08 3.9 3.9 0 0 1-2.23 2.23 6.36 6.36 0 0 1-2.08.39c-1.08.05-1.44.06-4.24.06s-3.16-.01-4.24-.06a6.35 6.35 0 0 1-2.08-.39 3.63 3.63 0 0 1-1.35-.88 3.63 3.63 0 0 1-.88-1.35 6.36 6.36 0 0 1-.39-2.08C3.01 15.16 3 14.8 3 12s.01-3.16.06-4.24a6.35 6.35 0 0 1 .39-2.08 3.63 3.63 0 0 1 .88-1.35 3.63 3.63 0 0 1 1.35-.88 6.36 6.36 0 0 1 2.08-.39C8.84 3.01 9.2 3 12 3s3.16.01 4.24.06a6.35 6.35 0 0 1 2.08.39 3.63 3.63 0 0 1 1.35.88 3.63 3.63 0 0 1 .88 1.35 6.36 6.36 0 0 1 .39 2.08C20.99 8.84 21 9.2 21 12s-.01 3.16-.06 4.24Z"
      ></path>
      <path
        fill={fill ? fill : "currentColor"}
        d="M17.58 5.47a.95.95 0 1 0 .95.95.95.95 0 0 0-.95-.95ZM12 7.07A4.93 4.93 0 1 0 16.93 12 4.93 4.93 0 0 0 12 7.07Zm0 8.86A3.93 3.93 0 1 1 15.93 12 3.93 3.93 0 0 1 12 15.93Z"
      ></path>
    </svg>
  );
};

export default Instagram;
