import { Theme } from "@/types/Theme";
import { Link as LinkType } from "@/types/Link";
import React from "react";

type Props = {
  theme: Theme;
  index: number;
  mobileView?: boolean;
  link: LinkType;
};

const LinkCard = ({ theme, index, mobileView, link }: Props) => {
  return (
    <div
      className={`relative w-[calc(100%-15px)] ${
        mobileView ? "h-[40px]" : "h-[60px]"
      } mx-auto mb-3 ${theme?.text}`}
    >
      <div className="w-full h-full absoulte z-20">
        <div
          className={`flex flex-row items-center justify-around relative ${theme?.linkStyle} ${theme?.hover}  transition-all duration-150 mx-auto z-20 ${theme?.boxColor} mt-2 px-1 h-full`}
        >
          <div className="w-[20%] h-full  flex items-center justify-start">
            <span
              className={`relative flex shrink-0 overflow-hidden ${
                theme?.linkStyle
              } ${mobileView ? "size-8" : "size-12"} cursor-pointer `}
            >
              <img
                src={"/placeholder.jpg"}
                className="h-full w-full object-cover"
                alt=""
              />
            </span>
          </div>
          <div className="w-[60%] h-full flex items-center ">
            <div
              className={`max-w-[70%] w-full mx-auto ${
                mobileView ? "text-[10px]" : "text-[15px]"
              }  text-center whitespace-nowrap `}
            >
              {link.name}
            </div>
          </div>
          <div className="w-[20%] h-full "></div>
          {/* <div className="left-2 bottom-[5px] absolute ">
            <span
              className={`relative flex shrink-0 overflow-hidden ${
                theme?.linkStyle
              } ${mobileView ? "size-8" : "size-12"} cursor-pointer `}
            >
              <img
                src={"/placeholder.jpg"}
                className="h-full w-full object-cover"
                alt=""
              />
            </span>
          </div>

          <div className="">
            <div
              className={`max-w-[70%] w-full mx-auto ${
                mobileView ? "text-[10px]" : "text-[15px]"
              }  text-center  `}
            >
              {link.name}
            </div>
          </div> */}
        </div>
      </div>
      {/* Embosed shadow */}
      {theme?.embosedBox &&
        (mobileView ? (
          <div
            className={`absolute ${
              index === 0 ? "top-[1.5px]" : "top-[2px]"
            } left-0.5 z-10 w-full h-full ${theme?.linkStyle} ${
              theme?.embosedBoxColor
            }`}
          ></div>
        ) : (
          <div
            className={`absolute ${
              index === 0 ? "top-[8px]" : "top-[8.5px]"
            } left-1.5 z-10 w-full h-full ${theme?.linkStyle} ${
              theme?.embosedBoxColor
            }`}
          ></div>
        ))}
    </div>
  );
};

export default LinkCard;
