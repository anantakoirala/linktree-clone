import React from "react";

type Props = {
  fill?: string;
};

const Spotify = ({ fill }: Props) => {
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
        d="M18,10.561a.494.494,0,0,1-.245-.065,15.2,15.2,0,0,0-10.95-1.55.5.5,0,0,1-.232-.973A16.2,16.2,0,0,1,18.25,9.626a.5.5,0,0,1-.247.935Z"
      ></path>
      <path
        fill={fill ? fill : "currentColor"}
        d="M16.646,13.632a.5.5,0,0,1-.249-.066,12.459,12.459,0,0,0-9.121-1.292.5.5,0,1,1-.237-.971A13.458,13.458,0,0,1,16.9,12.7a.5.5,0,0,1-.25.933Z"
      ></path>
      <path
        fill={fill ? fill : "currentColor"}
        d="M15.312,16.583a.5.5,0,0,1-.251-.068,9.777,9.777,0,0,0-7.295-1.033.5.5,0,0,1-.245-.97,10.768,10.768,0,0,1,8.043,1.139.5.5,0,0,1-.252.932Z"
      ></path>
      <path
        fill={fill ? fill : "currentColor"}
        d="M12,23A11,11,0,1,1,23,12,11.013,11.013,0,0,1,12,23ZM12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Z"
      ></path>
    </svg>
  );
};

export default Spotify;
