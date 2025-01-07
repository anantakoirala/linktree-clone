import Link from "next/link";
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
  {
    id: 12,
    name: "facebook",
    url: "https://www.facebook.com",
    image: "https://picsum.photos/id/8/300/200",
  },
  {
    id: 13,
    name: "facebook",
    url: "https://www.facebook.com",
    image: "https://picsum.photos/id/8/300/200",
  },
];

const MobileView = (props: Props) => {
  return (
    <div className="md:block fixed hidden right-0 lg:w-[500px] w-[310px] h-[calc(100%-100px)] pt-9 border-l border-l-gray-300">
      <div className="mx-auto mb-16 flex items-center justify-center w-full lg:max-w-[300px] max-w-[200px] lg:h-[600px] h-[400px] p-3 rounded-3xl relative">
        {/* Image should always be on top */}
        <img
          src={"/mobile-case.png"}
          alt=""
          className="absolute z-50 pointer-events-none select-none"
        />
        {/* Background div for layering below the image */}
        <div className="w-full h-full absolute lg:max-w-[220px] max-w-[195px] rounded-3xl bg-gray-100 z-10"></div>
        {/* Content div */}
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
                <div className="max-w-[70%] w-full mx-auto text-[10px] text-center">
                  {link.name}
                </div>
              </div>
            </a>
          ))}
          <div className="pb-12"></div>
        </div>
      </div>
    </div>
  );
};

export default MobileView;
