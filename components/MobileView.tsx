import { RootState } from "@/redux/store";
import { Link as LinkType } from "@/types/Link";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { AuthContext } from "@/contextprovider/AuthProvider";
import { Theme } from "@/types/Theme";
import LinkCard from "./LinkCard";
import ProductCard from "./ProductCard";

type Props = {};

const MobileView = (props: Props) => {
  const { links } = useSelector((state: RootState) => state.link);
  const { image, username, theme, profile_title, bio } = useSelector(
    (state: RootState) => state.profile
  );
  const { products } = useSelector((state: RootState) => state.shop);

  return (
    <>
      {/* flowbite mockup */}
      <div className="mt-10 relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
        {/* Spinner */}
        <div role="status" className="absolute z-50 top-3 left-2">
          <svg
            aria-hidden="true"
            className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-[#8228D9] "
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
        <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
        <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
        <div
          className={`rounded-[2rem] overflow-hidden w-[272px] h-[572px] ${theme?.color} dark:bg-gray-800 relative`}
        >
          {/* Background Image */}
          {/* <img
            src="/background-mobile-hires.png"
            className="dark:hidden w-[272px] h-[572px] absolute z-0"
            alt=""
          /> */}

          {/* Content Container */}
          <div className="h-full mx-auto w-full overflow-auto z-10 relative">
            {/* Profile Image */}
            <div className="flex items-center justify-center mt-10">
              <span className="relative flex shrink-0 overflow-hidden rounded-full size-20 cursor-pointer ">
                <img
                  src={image ? image : "/unnamed.png"}
                  className="h-full w-full object-cover"
                  alt=""
                />
              </span>
            </div>
            {/* Username */}
            <div
              className={`text-center text-sm font-semibold mt-2 break-words ${theme?.text}`}
            >
              @{profile_title}
            </div>
            {/* Bio */}
            <div
              className={`text-center text-[8px] font-semibold mt-1 ${theme?.text}`}
            >
              <div className="px-8 break-words">{bio}</div>
            </div>

            {/* Tabs */}
            <div className="w-full flex items-center justify-center mt-2">
              <Tabs defaultValue="account" className="w-full">
                <TabsList className="flex justify-center w-fit mx-auto rounded-full mb-4">
                  <TabsTrigger
                    value="account"
                    className={`
                      flex-1 px-4 py-2 text-center text-sm font-medium rounded-full transition-all duration-200 data-[state=active]:bg-[#8228D9] data-[state=active]:text-white data-[state=inactive]:text-gray-700`}
                  >
                    Links
                  </TabsTrigger>
                  <TabsTrigger
                    value="password"
                    className={
                      "flex-1 px-4 py-2 text-center text-sm font-medium rounded-full transition-all duration-200 data-[state=active]:bg-[#8228D9] data-[state=active]:text-white data-[state=inactive]:text-gray-700"
                    }
                  >
                    Shop
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="">
                  {/* Links */}
                  <div className="w-full">
                    {links.map((link: LinkType, index) => (
                      // <div
                      //   className="relative w-[calc(100%-15px)] h-[42px] mx-auto "
                      //   key={index}
                      // >
                      //   <div className="w-full h-full absoulte z-20">
                      //     <div
                      //       className={`flex flex-row items-center justify-around relative ${theme?.linkStyle} mx-auto z-20 ${theme?.boxColor} mt-2 px-1 h-full`}
                      //     >
                      //       <div className="left-1.5 absolute ">
                      //         <span
                      //           className={`relative flex shrink-0 overflow-hidden ${theme?.linkStyle} size-8 cursor-pointer `}
                      //         >
                      //           <img
                      //             src={"/placeholder.jpg"}
                      //             className={`h-full w-full object-cover ${theme?.linkStyle}`}
                      //             alt=""
                      //           />
                      //         </span>
                      //       </div>

                      //       <div className="">
                      //         <div
                      //           className={`max-w-[70%] w-full mx-auto text-[10px] ${theme?.text} text-center  `}
                      //         >
                      //           youtube
                      //         </div>
                      //       </div>
                      //     </div>
                      //   </div>
                      //   {/* Embosed shadow */}
                      //   {theme?.embosedBox && (
                      //     <div
                      //       className={`absolute ${
                      //         index === 0 ? "top-[1.5px]" : "top-[2px]"
                      //       } left-0.5 z-10 w-full h-full ${theme?.linkStyle} ${
                      //         theme?.embosedBoxColor
                      //       }`}
                      //     ></div>
                      //   )}
                      // </div>
                      <LinkCard
                        theme={theme}
                        index={index}
                        mobileView={true}
                        link={link}
                      />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="password">
                  <div className="w-full p-2">
                    <div className="w-full">
                      <div className="grid grid-cols-2 gap-x-0.5">
                        {products.map((product: any, index: number) => (
                          <ProductCard
                            key={index}
                            theme={theme}
                            product={product}
                            mobileView={true}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Links */}

            {/* Extra padding for spacing */}
            <div className="pb-12"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileView;
