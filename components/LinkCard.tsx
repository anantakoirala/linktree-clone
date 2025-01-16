import { Theme } from "@/types/Theme";
import React from "react";

type Props = {
  theme: Theme;
  index: number;
};

const LinkCard = ({ theme, index }: Props) => {
  return (
    <div
      className={`relative w-[calc(100%-15px)] h-[60px] mx-auto mb-3 ${theme?.text}`}
    >
      <div className="w-full h-full absoulte z-20">
        <div
          className={`flex flex-row items-center justify-around relative ${theme?.linkStyle} ${theme?.hover}  transition-all duration-150 mx-auto z-20 ${theme?.boxColor} mt-2 px-1 h-full`}
        >
          <div className="left-2 bottom-[5px] absolute ">
            <span
              className={`relative flex shrink-0 overflow-hidden ${theme?.linkStyle} size-12 cursor-pointer `}
            >
              <img
                src={"/wallpaper.jpg"}
                className="h-full w-full object-cover"
                alt=""
              />
            </span>
          </div>

          <div className="">
            <div
              className={`max-w-[70%] w-full mx-auto text-[15px]  text-center  `}
            >
              youtube
            </div>
          </div>
        </div>
      </div>
      {/* Embosed shadow */}
      {theme?.embosedBox && (
        <div
          className={`absolute ${
            index === 0 ? "top-[8px]" : "top-[8.5px]"
          } left-1.5 z-10 w-full h-full ${theme?.linkStyle} ${
            theme?.embosedBoxColor
          }`}
        ></div>
      )}
    </div>
  );
};

export default LinkCard;
