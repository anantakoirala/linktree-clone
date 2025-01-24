import { useMediaQuery } from "@/app/hooks/user-media-query";
import React from "react";

type Props = {
  fill?: string;
};

const Email = ({ fill }: Props) => {
  const isLargeScreen = useMediaQuery("(min-width:640px)");
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.13 5.00024H3.86998L12 11.8466L20.13 5.00024ZM3 5.57497V19.0002H21V5.57497L12.3221 12.8827H11.6779L3 5.57497ZM2 4.00024H3H21H22V5.00024V19.0002V20.0002H21H3H2V19.0002V5.00024V4.00024Z"
        fill={fill ? fill : "currentColor"}
      ></path>
    </svg>
  );
};

export default Email;
