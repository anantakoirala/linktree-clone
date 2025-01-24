import React from "react";

type Props = {
  fill?: string;
};

const X = ({ fill }: Props) => {
  console.log("x fill", fill);
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
        fillRule="evenodd"
        d="m20.9 3-.8-.7-6.5 7.4-5.1-7.2H3L10.6 13l-7.1 8 .7.7 7-7.9 5.6 7.7H22l-8-11L21 3ZM5 3.5l12.2 17h2.9L7.9 3.5H5.1Z"
      ></path>
    </svg>
  );
};

export default X;
