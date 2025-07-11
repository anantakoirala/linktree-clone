"use client";
import { restApi } from "@/api";
import MobileView from "@/components/MobileView";
import PreviewSection from "@/components/PreviewSection";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AuthProvider from "@/contextprovider/AuthProvider";
import { RootState, store } from "@/redux/store";
import { Eye, LogOut, Settings, Share } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Provider, useSelector } from "react-redux";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  const route = useRouter();

  const { username } = useSelector((state: RootState) => state.profile);
  const [preview, setPreview] = useState<boolean>(false);

  const logout = async () => {
    try {
      await restApi.get("/api/v1/auth/logout");
      route.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Failed to logout. Please try again.");
    }
  };

  const copyLinkToClipboard = () => {
    const shareableLink = `${process.env.NEXT_PUBLIC_BASE_URL}/${username}`;
    navigator.clipboard
      .writeText(shareableLink)
      .then(() => {
        toast.success("The shareable link has been copied to your clipboard.");
      })
      .catch(() => {
        toast.error("Failed to copy the link. Please try again.");
      });
  };

  return (
    <div className="flex flex-row relative bg-[#f3f3f1]">
      <div className="h-screen w-1/6  hidden md:block border-r">
        {/* Desktop sidebar */}
        <div className=" h-screen mx-5 py-6 flex flex-col gap-3 justify-between">
          <div>
            <div>
              <img
                src={"/linktree-logo-icon.png"}
                alt=""
                className="w-[23px] min-w-[23px] select-none"
              />
            </div>
            <div className="w-full ">
              <Link href={"/admin"}>
                <div className="flex flex-row items-center w-full h-10 gap-2 text-[#8228D9] text-sm hover:bg-gray-300 p-2 rounded-md transition-all duration-100 font-semibold text-[14px]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <g fill="currentColor">
                      <path d="M24 5.25L0 5.25V3.75L24 3.75V5.25Z"></path>
                      <path d="M24 5.3H0V3.8h24v1.5Z"></path>
                      <path d="m0 9.5.8-.8h22.4l.8.8v5l-.8.8H.9l-.8-.8v-5Zm1.5.8v3.4h21v-3.4h-21Z"></path>
                      <path d="M0 20.3h24v-1.6H0v1.6Z"></path>
                    </g>
                  </svg>
                  Links
                </div>
              </Link>
              <Link href={"/shop"}>
                <div className="flex flex-row items-center w-full h-10 gap-2 text-[#8228D9] text-sm hover:bg-gray-300 p-2 rounded-md transition-all duration-100 font-semibold text-[14px]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      fill="currentColor"
                      d="M3.54 0h16.92l.22.37 3.21 5.35.11.18v5.56l-.75.76h-.32v11.03l-.75.75H1.83l-.75-.75V12.22H.75v-.75H0V5.9l.11-.19L3.32.37zM.75 11.47v.75L0 11.47zm.75-3.75v3h6V6.65H9v4.07h6V6.65h1.5v4.07h6V6.31L19.61 1.5H4.4L1.5 6.32zm1.08 4.5V22.5h18.85V12.22z"
                    ></path>
                  </svg>
                  Shop
                </div>
              </Link>
              <Link href={"/appearance"}>
                <div className="flex flex-row items-center w-full h-10 gap-2 text-[#8228D9] text-sm hover:bg-gray-300 p-2 rounded-md transition-all duration-100 font-semibold text-[14px]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      fill="currentColor"
                      d="m9 9.8.8-.7h13.4l.8.7v13.5l-.8.8H9.8l-.8-.8V9.8Zm1.5.8v12h12v-12h-12ZM1.5 9.3c0-4.4 3.4-7.8 7.4-7.8V0C4 0 0 4.2 0 9.3 0 14 3.5 18 8 18.5V17a7.6 7.6 0 0 1-6.5-7.7ZM17.8 8h-1.6A7.5 7.5 0 0 0 9 1.5V0a9 9 0 0 1 8.9 8Z"
                    ></path>
                  </svg>
                  Appearance
                </div>
              </Link>
              <div onClick={copyLinkToClipboard}>
                <div className="flex flex-row items-center w-full h-10 gap-2 text-[#8228D9] text-sm hover:bg-gray-300 p-2 rounded-md transition-all duration-100 font-semibold text-[14px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="tabler-icon tabler-icon-share-2 !size-5"
                  >
                    <path d="M8 9h-1a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-8a2 2 0 0 0 -2 -2h-1"></path>
                    <path d="M12 14v-11"></path>
                    <path d="M9 6l3 -3l3 3"></path>
                  </svg>
                  Share
                </div>
              </div>
              {/* <div className="flex flex-row items-center w-full h-10 gap-2 text-[#8228D9] text-sm hover:bg-gray-300 p-2 rounded-md transition-all duration-100 font-semibold text-[14px]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        fillRule="evenodd"
                        fill="currentColor"
                        d="M1.5 10.5 0 12v9.7l1.5 1.5h21l1.5-1.5V2.3L22.5.8h-6l-1.4 1.5v3.4H9L7.4 7.2v3.3h-6Zm15-8.2h6v19.4h-6V2.3ZM15 7.2H9v14.5h6V7.2ZM7.4 12H1.5v9.7h6V12Z"
                      ></path>
                    </svg>
                    Analytics
                  </div> */}
            </div>
          </div>
          {/* Sign out */}
          <div
            className="w-full h-14 cursor-pointer  flex items-center p-2 gap-1 rounded-md bg-[#8228D9] hover:bg-[#6c21b3] text-white"
            onClick={logout}
          >
            <LogOut />
            <span>Logout</span>
          </div>
        </div>
      </div>
      <div className="h-screen w-full md:w-3/6 px-6 py-10 overflow-y-scroll relative">
        <div className="absolute right-2 top-4 w-fit h-7 gap-4  p-1 bg-white hover:bg-gray-50 shadow-sm rounded-sm flex items-center justify-center">
          <Share className="w-4 h-4 text-primary" /> <span>share</span>
        </div>
        {children}
      </div>
      {/* Mobile view */}
      <div className="h-screen w-2/6  hidden md:block pt-10">
        <MobileView />
      </div>
      {/* Preview button */}

      <div className="fixed bottom-16 w-full flex items-center justify-center z-50">
        <button
          className="md:hidden flex items-center text-[17px] rounded-full font-semibold px-5 py-2.5 bg-[#DFE2D9] gap-2"
          onClick={() => setPreview((prev) => !prev)}
        >
          <Eye />
          Preview
        </button>
      </div>
      {/* Mobile menu */}

      <div className="w-full h-14 md:hidden rounded-full flex flex-row items-center justify-between p-4 fixed bottom-1 bg-white shadow-lg z-30">
        {/* Menu div */}
        <Link href={"/admin"} className="w-1/4">
          <div className="flex flex-col items-center  h-auto gap-0.5 text-[#8228D9] text-sm hover:bg-gray-300 p-2 rounded-md transition-all duration-100 font-semibold text-[12px] ">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <g fill="currentColor">
                <path d="M24 5.25L0 5.25V3.75L24 3.75V5.25Z"></path>
                <path d="M24 5.3H0V3.8h24v1.5Z"></path>
                <path d="m0 9.5.8-.8h22.4l.8.8v5l-.8.8H.9l-.8-.8v-5Zm1.5.8v3.4h21v-3.4h-21Z"></path>
                <path d="M0 20.3h24v-1.6H0v1.6Z"></path>
              </g>
            </svg>
            Links
          </div>
        </Link>
        {/* Menu div */}
        <Link href={"/shop"} className="w-1/4 ">
          <div className="flex flex-col items-center h-auto gap-0.5 text-[#8228D9] text-sm hover:bg-gray-300 p-2 rounded-md transition-all duration-100 font-semibold text-[12px]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                fill="currentColor"
                d="M3.54 0h16.92l.22.37 3.21 5.35.11.18v5.56l-.75.76h-.32v11.03l-.75.75H1.83l-.75-.75V12.22H.75v-.75H0V5.9l.11-.19L3.32.37zM.75 11.47v.75L0 11.47zm.75-3.75v3h6V6.65H9v4.07h6V6.65h1.5v4.07h6V6.31L19.61 1.5H4.4L1.5 6.32zm1.08 4.5V22.5h18.85V12.22z"
              ></path>
            </svg>
            Shop
          </div>
        </Link>
        {/* Menu div */}
        <Link href={"/appearance"} className="w-1/4">
          <div className="flex flex-col items-center  h-auto gap-0.5  text-[#8228D9] text-sm hover:bg-gray-300 p-2 rounded-md transition-all duration-100 font-semibold text-[12px]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                fill="currentColor"
                d="m9 9.8.8-.7h13.4l.8.7v13.5l-.8.8H9.8l-.8-.8V9.8Zm1.5.8v12h12v-12h-12ZM1.5 9.3c0-4.4 3.4-7.8 7.4-7.8V0C4 0 0 4.2 0 9.3 0 14 3.5 18 8 18.5V17a7.6 7.6 0 0 1-6.5-7.7ZM17.8 8h-1.6A7.5 7.5 0 0 0 9 1.5V0a9 9 0 0 1 8.9 8Z"
              ></path>
            </svg>
            Appearance
          </div>
        </Link>
        {/* Menu div */}
        <div className="w-1/4" onClick={logout}>
          <div className="flex flex-col items-center  h-auto gap-0.5  text-[#8228D9] text-sm hover:bg-gray-300 p-2 rounded-md transition-all duration-100 font-semibold text-[12px]">
            <svg
              width="20"
              height="20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.334 6.667V5A1.667 1.667 0 0 1 10 3.333h5.834A1.667 1.667 0 0 1 17.5 5v10a1.667 1.667 0 0 1-1.666 1.667H10A1.667 1.667 0 0 1 8.334 15v-1.667"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M12.5 10h-10L5 7.5M5 12.5 2.5 10"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            Logout
          </div>
        </div>
      </div>
      {preview && <PreviewSection />}
    </div>
  );
};

export default layout;
