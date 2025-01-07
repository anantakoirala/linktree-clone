"use client";
import MobileView from "@/components/MobileView";
import PreviewSection from "@/components/PreviewSection";
import { Eye } from "lucide-react";
import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  const [preview, setPreview] = useState<boolean>(false);
  return (
    <div className="flex flex-row relative bg-[#f3f3f1]">
      <div className="h-screen w-1/6  hidden md:block border-r">
        {/* Desktop sidebar */}
        <div className=" h-screen mx-5 py-6 flex flex-col gap-3">
          <div>
            <img
              src={"/linktree-logo-icon.png"}
              alt=""
              className="w-[23px] min-w-[23px] select-none"
            />
          </div>
          <div className="w-full ">
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
            <div className="flex flex-row items-center w-full h-10 gap-2 text-[#8228D9] text-sm hover:bg-gray-300 p-2 rounded-md transition-all duration-100 font-semibold text-[14px]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  fill="currentColor"
                  d="M3.54 0h16.92l.22.37 3.21 5.35.11.18v5.56l-.75.76h-.32v11.03l-.75.75H1.83l-.75-.75V12.22H.75v-.75H0V5.9l.11-.19L3.32.37zM.75 11.47v.75L0 11.47zm.75-3.75v3h6V6.65H9v4.07h6V6.65h1.5v4.07h6V6.31L19.61 1.5H4.4L1.5 6.32zm1.08 4.5V22.5h18.85V12.22z"
                ></path>
              </svg>
              Shop
            </div>
            <div className="flex flex-row items-center w-full h-10 gap-2 text-[#8228D9] text-sm hover:bg-gray-300 p-2 rounded-md transition-all duration-100 font-semibold text-[14px]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  fill="currentColor"
                  d="m9 9.8.8-.7h13.4l.8.7v13.5l-.8.8H9.8l-.8-.8V9.8Zm1.5.8v12h12v-12h-12ZM1.5 9.3c0-4.4 3.4-7.8 7.4-7.8V0C4 0 0 4.2 0 9.3 0 14 3.5 18 8 18.5V17a7.6 7.6 0 0 1-6.5-7.7ZM17.8 8h-1.6A7.5 7.5 0 0 0 9 1.5V0a9 9 0 0 1 8.9 8Z"
                ></path>
              </svg>
              Appearance
            </div>
            <div className="flex flex-row items-center w-full h-10 gap-2 text-[#8228D9] text-sm hover:bg-gray-300 p-2 rounded-md transition-all duration-100 font-semibold text-[14px]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  fillRule="evenodd"
                  fill="currentColor"
                  d="M1.5 10.5 0 12v9.7l1.5 1.5h21l1.5-1.5V2.3L22.5.8h-6l-1.4 1.5v3.4H9L7.4 7.2v3.3h-6Zm15-8.2h6v19.4h-6V2.3ZM15 7.2H9v14.5h6V7.2ZM7.4 12H1.5v9.7h6V12Z"
                ></path>
              </svg>
              Analytics
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen w-full md:w-3/6 p-4">{children}</div>
      {/* Mobile view */}
      <div className="h-screen w-2/6  hidden md:block ">
        <MobileView />
      </div>
      {/* Preview button */}

      <div className="fixed bottom-16 w-full flex items-center justify-center ">
        <button
          className="md:hidden flex items-center text-[17px] rounded-full font-semibold px-5 py-2.5 bg-[#DFE2D9] gap-2"
          onClick={() => setPreview((prev) => !prev)}
        >
          <Eye />
          Preview
        </button>
      </div>
      {/* Mobile menu */}

      <div className="w-full h-14 md:hidden rounded-full flex flex-row items-center justify-between p-4 absolute bottom-1 bg-white shadow-lg">
        {/* Menu div */}
        <div className="flex flex-col items-center w-1/4 h-auto gap-0.5 text-[#8228D9] text-sm hover:bg-gray-300 p-2 rounded-md transition-all duration-100 font-semibold text-[12px] ">
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
        {/* Menu div */}
        <div className="flex flex-col items-center w-1/4 h-auto gap-0.5 text-[#8228D9] text-sm hover:bg-gray-300 p-2 rounded-md transition-all duration-100 font-semibold text-[12px]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              fill="currentColor"
              d="M3.54 0h16.92l.22.37 3.21 5.35.11.18v5.56l-.75.76h-.32v11.03l-.75.75H1.83l-.75-.75V12.22H.75v-.75H0V5.9l.11-.19L3.32.37zM.75 11.47v.75L0 11.47zm.75-3.75v3h6V6.65H9v4.07h6V6.65h1.5v4.07h6V6.31L19.61 1.5H4.4L1.5 6.32zm1.08 4.5V22.5h18.85V12.22z"
            ></path>
          </svg>
          Shop
        </div>
        {/* Menu div */}
        <div className="flex flex-col items-center w-1/4 h-auto gap-0.5  text-[#8228D9] text-sm hover:bg-gray-300 p-2 rounded-md transition-all duration-100 font-semibold text-[12px]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              fill="currentColor"
              d="m9 9.8.8-.7h13.4l.8.7v13.5l-.8.8H9.8l-.8-.8V9.8Zm1.5.8v12h12v-12h-12ZM1.5 9.3c0-4.4 3.4-7.8 7.4-7.8V0C4 0 0 4.2 0 9.3 0 14 3.5 18 8 18.5V17a7.6 7.6 0 0 1-6.5-7.7ZM17.8 8h-1.6A7.5 7.5 0 0 0 9 1.5V0a9 9 0 0 1 8.9 8Z"
            ></path>
          </svg>
          Appearance
        </div>
        {/* Menu div */}
        <div className="flex flex-col items-center w-1/4 h-auto gap-0.5  text-[#8228D9] text-sm hover:bg-gray-300 p-2 rounded-md transition-all duration-100 font-semibold text-[12px]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              fillRule="evenodd"
              fill="currentColor"
              d="M1.5 10.5 0 12v9.7l1.5 1.5h21l1.5-1.5V2.3L22.5.8h-6l-1.4 1.5v3.4H9L7.4 7.2v3.3h-6Zm15-8.2h6v19.4h-6V2.3ZM15 7.2H9v14.5h6V7.2ZM7.4 12H1.5v9.7h6V12Z"
            ></path>
          </svg>
          Analytics
        </div>
      </div>
      {preview && <PreviewSection />}
    </div>
  );
};

export default layout;
