"use client";
import { X } from "lucide-react";
import React from "react";

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
  {
    id: 11,
    name: "facebook",
    url: "https://www.facebook.com",
    image: "https://picsum.photos/id/8/300/200",
  },
];

const PreviewSection = (props: Props) => {
  return (
    <div className="md:hidden fixed bg-red-300 z-30 top-0 h-full w-full overflow-auto">
      <div className="h-full mx-auto w-full overflow-auto z-20">
        <img
          src="https://picsum.photos/id/8/300/320"
          alt=""
          className="rounded-full min-w-[60px] w-[60px] mx-auto mt-8"
        />
        <div className="text-center text-sm font-semibold mt-4 break-words">
          @ananta
        </div>
        <div className="text-center text-[8px] font-semibold mt-2">
          <div className="px-8 break-words">this is bio</div>
        </div>
        {dummyLink.map((link: any) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            className="flex items-center relative w-[calc(100%-15px)] mx-auto border bg-white mt-2 p-1 rounded-xl z-20"
          >
            <img
              src={link.image}
              alt=""
              className="rounded-lg h-[30px] aspect-square"
            />
            <div className="absolute w-full">
              <div className="max-w-[70%] w-full mx-auto text-[14px] text-center">
                {link.name}
              </div>
            </div>
          </a>
        ))}
        <div className="pb-12"></div>
      </div>
      <div className="fixed bottom-16 w-full flex items-center justify-center z-50">
        <button className="md:hidden flex items-center text-[17px] rounded-full font-semibold px-2 py-2 bg-gray-400 gap-2">
          <X />
        </button>
      </div>
    </div>
  );
};

export default PreviewSection;
