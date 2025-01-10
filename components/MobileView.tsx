import { RootState } from "@/redux/store";
import { Link as LinkType } from "@/types/Link";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

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
  const { links } = useSelector((state: RootState) => state.link);
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
            {links.map((link: LinkType) => (
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
