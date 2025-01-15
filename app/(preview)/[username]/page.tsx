"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabComponent from "@/components/TabComponent";
import { cn } from "@/lib/utils";

type Props = {};
const dummyLink = [
  {
    id: 1,
    name: "youtube channel",
    url: "https://www.youtube.com/watch?v=NtsbjB8QD3Y&t=3981s&ab_channel=JohnWeeksDev",
    image: "https://picsum.photos/id/8/300/200",
  },
  {
    id: 2,
    name: "facebook",
    url: "https://www.facebook.com",
    image: "https://picsum.photos/id/8/300/200",
  },
  {
    id: 3,
    name: "facebook",
    url: "https://www.facebook.com",
    image: "https://picsum.photos/id/8/300/200",
  },
  {
    id: 4,
    name: "facebook",
    url: "https://www.facebook.com",
    image: "https://picsum.photos/id/8/300/200",
  },
  {
    id: 5,
    name: "facebook",
    url: "https://www.facebook.com",
    image: "https://picsum.photos/id/8/300/200",
  },
  {
    id: 6,
    name: "facebook",
    url: "https://www.facebook.com",
    image: "https://picsum.photos/id/8/300/200",
  },
  {
    id: 7,
    name: "facebook",
    url: "https://www.facebook.com",
    image: "https://picsum.photos/id/8/300/200",
  },
  {
    id: 8,
    name: "facebook",
    url: "https://www.facebook.com",
    image: "https://picsum.photos/id/8/300/200",
  },
  {
    id: 9,
    name: "facebook",
    url: "https://www.facebook.com",
    image: "https://picsum.photos/id/8/300/200",
  },
  {
    id: 10,
    name: "facebook",
    url: "https://www.facebook.com",
    image: "https://picsum.photos/id/8/300/200",
  },
];

const Page = (props: Props) => {
  return (
    <div className="w-full min-h-screen bg-gradient-radial from-[#3d550c] via-[#81b622] bg-fixed to-[#ecf87f] font-poppins ">
      <div className="w-full lg:w-[40%] min-h-screen  lg:mx-auto flex flex-col pt-16 items-center pb-28">
        {/* Profile image */}
        <span className="relative flex shrink-0 overflow-hidden rounded-full size-24 lg:size-28 hover:size-32 transitionall duration-300 cursor-pointer mt-2  ">
          <img
            src={"/wallpaper.jpg"}
            className="h-full w-full object-cover"
            alt=""
          />
        </span>
        {/* Username */}
        <div
          className="mx-3 flex max-w-full items-center mt-2"
          id="profile-title"
        >
          <h1
            className="text-ellipsis text-wrap text-center text-[25px] font-bold tracking-wide leading-[1.5] break-words"
            style={{ wordBreak: "break-word", letterSpacing: "-0.4px" }}
          >
            @amitshrestha111
          </h1>
        </div>
        {/* Bio */}
        <h2
          className="px-8 break-words leading-[1.5] text-[17px] text-center mt-1 font-medium font-poppins"
          style={{ wordBreak: "break-word" }}
        >
          Lorem ipsum dolor sit, amet consectetur Lorem ipsum dolor sit, amet
        </h2>
        {/* Tabs */}
        <div className="w-full flex items-center justify-center mt-6">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="flex justify-center w-fit mx-auto h-14 bg-[#81b622] bg-opacity-70 rounded-full mb-4">
              <TabsTrigger
                value="account"
                className={cn(
                  "flex-1 px-5 lg:px-10 py-3 text-center text-sm font-extralight rounded-full transition-all duration-200",
                  "data-[state=active]:bg-[#8228D9] data-[state=active]:text-white ",
                  "data-[state=inactive]:text-white font-semibold text-[20px]"
                )}
              >
                Links
              </TabsTrigger>
              <TabsTrigger
                value="password"
                className={cn(
                  "flex-1 px-5 lg:px-10 py-3 text-center text-sm font-extralight rounded-full transition-all duration-200",
                  "data-[state=active]:bg-[#8228D9] data-[state=active]:text-white",
                  "data-[state=inactive]:text-gray-700 font-semibold text-[20px]"
                )}
              >
                Shop
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="mt-10 px-2">
              {/* Links */}
              <div className="w-full">
                {/* {links.map((link: LinkType) => (
                  <a
                    key={link._id}
                    href={link.url}
                    target="_blank"
                    className="flex items-center relative w-[calc(100%-15px)] mx-auto border bg-white mt-2 p-1 rounded-xl z-20 h-[35px]"
                  >
                    {link.image && (
                      <img
                        src={link.image}
                        alt=""
                        className="rounded-lg h-[30px] aspect-square"
                      />
                    )}

                    <div className="absolute w-full">
                      <div className="max-w-[70%] w-full mx-auto text-[10px] text-center">
                        {link.name}
                      </div>
                    </div>
                  </a>
                ))} */}
                {dummyLink.map((dummy: any) => (
                  <a
                    key={dummy.id}
                    href={dummy.url}
                    target="_blank"
                    className="flex items-center relative w-[calc(100%-15px)] mx-auto border bg-white mt-2 p-1 rounded-xl z-20 h-[35px] lg:h-[70px]"
                  >
                    <img
                      src={dummy.image}
                      alt=""
                      className="rounded-lg h-[30px] lg:h-[40px] aspect-square"
                    />

                    <div className="absolute w-full">
                      <div className="max-w-[70%] w-full mx-auto text-[10px] lg:text-[14px] text-center">
                        {dummy.name}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="password" className="mt-10">
              <div className="w-full">
                {/* {links.map((link: LinkType) => (
                  <a
                    key={link._id}
                    href={link.url}
                    target="_blank"
                    className="flex items-center relative w-[calc(100%-15px)] mx-auto border bg-white mt-2 p-1 rounded-xl z-20 h-[35px]"
                  >
                    {link.image && (
                      <img
                        src={link.image}
                        alt=""
                        className="rounded-lg h-[30px] aspect-square"
                      />
                    )}

                    <div className="absolute w-full">
                      <div className="max-w-[70%] w-full mx-auto text-[10px] text-center">
                        {link.name}
                      </div>
                    </div>
                  </a>
                ))} */}
                {dummyLink.map((dummy: any) => (
                  <a
                    key={dummy.id}
                    href={dummy.url}
                    target="_blank"
                    className="flex items-center relative w-[calc(100%-15px)] mx-auto border bg-white mt-2 p-1 rounded-xl z-20 h-[35px] lg:h-[50px]"
                  >
                    <img
                      src={dummy.image}
                      alt=""
                      className="rounded-lg h-[30px] aspect-square"
                    />

                    <div className="absolute w-full">
                      <div className="max-w-[70%] w-full mx-auto text-[10px] lg:text-[14px] text-center">
                        {dummy.name}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Page;
