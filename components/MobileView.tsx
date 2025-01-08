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
];

const MobileView = (props: Props) => {
  return (
    <>
      {/* flowbite mockup */}
      <div className="mt-10 relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
        <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
        <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
        <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800 relative">
          {/* Background Image */}
          <img
            src="/background-mobile-hires.png"
            className="dark:hidden w-[272px] h-[572px] absolute z-0"
            alt=""
          />

          {/* Content Container */}
          <div className="h-full mx-auto w-full overflow-auto z-10 relative">
            {/* Profile Image */}
            <img
              src="https://picsum.photos/id/8/300/320"
              alt=""
              className="rounded-full min-w-[60px] w-[60px] mx-auto mt-8"
            />
            {/* Username */}
            <div className="text-center text-sm font-semibold mt-4 break-words">
              @ananta
            </div>
            {/* Bio */}
            <div className="text-center text-[8px] font-semibold mt-2">
              <div className="px-8 break-words">this is bio</div>
            </div>

            {/* Links */}
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

            {/* Extra padding for spacing */}
            <div className="pb-12"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileView;
