"use client";
import React, { useRef, useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import ImageCropper1 from "@/components/ImageCropper1";
import {
  useUpdateThemeMutation,
  useUploadProfileImageMutation,
} from "@/redux/profile/profileApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Theme } from "@/types/Theme";

type Props = {};

const themes: Theme[] = [
  {
    id: 1,
    color: "bg-white",
    text: "text-black",
    name: "Air White",
    linkStyle: "rounded-md",
    boxColor: "bg-red-200",
    embosedBox: false,
    embosedBoxColor: "bg-yellow-800",
  },
  {
    id: 2,
    color: "bg-[#000957]", // Deep Blue
    text: "text-white", // White text for contrast
    name: "Blue Horizon",
    linkStyle: "rounded-md", // Rounded link style
    boxColor: "bg-[#344CB7]", // Lighter Blue
    embosedBox: true,
    embosedBoxColor: "bg-[#FFEB00]", // Yellow for embossed effect
  },
  {
    id: 3,
    color: "bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500",
    text: "text-black",
    name: "Purple Pie",
    linkStyle: "rounded-3xl",
    boxColor: "bg-orange-300",
    embosedBox: false,
    embosedBoxColor: "bg-yellow-800",
  },
  {
    id: 4,
    color: "bg-gradient-to-t from-[#16C47F] via-[#FFD65A] to-[#FF9D23]",
    text: "text-black", // White text for contrast
    name: "Tropical Vibes",
    linkStyle: "rounded-md", // Rounded link style
    boxColor: "bg-[#FFD65A]", // Soft Yellow
    embosedBox: true,
    embosedBoxColor: "bg-[#FF9D23]", // Orange for embossed effect
  },
  {
    id: 5,
    color: "bg-gradient-to-t from-orange-500 via-green-500 to-red-500",
    text: "text-white",
    name: "Traffic Lights",
    linkStyle: "rounded-3xl",
    boxColor: "bg-pink-500",
    embosedBox: true,
    embosedBoxColor: "bg-yellow-800",
  },
  {
    id: 6,
    color: "bg-gradient-to-b from-blue-800 via-blue-500 to-green-500",
    text: "text-slate-900",
    name: "Blue Sky",
    linkStyle: "rounded-md",
    boxColor: "bg-lime-200",
    embosedBox: false,
    embosedBoxColor: "bg-yellow-800",
  },
  {
    id: 7,
    color: "bg-gradient-to-t from-lime-500 via-indigo-700 to-amber-500",
    text: "text-white",
    name: "Soft Horizon",
    linkStyle: "rounded-xl",
    boxColor: "bg-purple-300",
    embosedBox: true,
    embosedBoxColor: "bg-yellow-800",
  },
  {
    id: 8,
    color: "bg-gradient-to-t from-gray-800 to-emerald-500",
    text: "text-white",
    name: "Tinted Lake",
    linkStyle: "rounded-full bg-transparent border ",
    boxColor: "",
    embosedBox: false,
    embosedBoxColor: "bg-yellow-800",
  },
  {
    id: 9,
    color: "bg-gradient-to-t from-pink-600 via-pink-500 to-pink-300",
    text: "text-white",
    name: "Cotton Candy",
    linkStyle: "rounded-lg",
    boxColor: "bg-indigo-400",
    embosedBox: false,
    embosedBoxColor: "bg-yellow-800",
  },
  {
    id: 10,
    color: "bg-[#f8d210]",
    text: "text-white", // White text for contrast
    name: "Tropical Burst",
    linkStyle: "rounded-md", // Rounded link style
    boxColor: "bg-[#f51720]", // Red for the box
    embosedBox: true,
    embosedBoxColor: "bg-[#fa26a0]", // Pink for embossed effect
  },
  {
    id: 11,
    color: "bg-gradient-radial from-[#3d550c] via-[#81b622] to-[#ecf87f]", // Circular gradient from deep green to lime yellow
    text: "text-black", // Black text for contrast
    name: "Lush Green",
    linkStyle: "rounded-lg", // Rounded link style
    boxColor: "bg-[#59981a]", // Dark green for the box
    embosedBox: true,
    embosedBoxColor: "bg-[#81b622]", // Lime green for embossed effect
  },
  {
    id: 12,
    color: "bg-gradient-to-t from-[#fd7f20] via-[#fc2e20] to-[#fdb750]", // Linear gradient from orange to red, to yellow
    text: "text-white", // White text for contrast
    name: "Fiery Blaze",
    linkStyle: "rounded-3xl", // Rounded link style
    boxColor: "bg-[#010100]", // Dark background for the box
    embosedBox: true,
    embosedBoxColor: "bg-[#fdb750]", // Red for the embossed effect
  },
];

const Page = (props: Props) => {
  const [imgSrc, setImgSrc] = useState("");
  const [croppedImageUrl, setCroppedImageUrl] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [cropped, setCropped] = useState<boolean>(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [uploadProfileImage, { isError, isLoading, isSuccess }] =
    useUploadProfileImageMutation();
  const [
    updateTheme,
    { isError: isUpdateThemeError, isLoading: isUpdateThemeLoading },
  ] = useUpdateThemeMutation();

  const { image } = useSelector((state: RootState) => state.profile);

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageUrl = reader.result?.toString() || "";
      setImgSrc(imageUrl);
    });

    reader.readAsDataURL(file);
  };

  const updateSelectedTheme = (id: number) => {
    const foundTheme = themes.find((theme) => theme.id === id);
    console.log("foundTheme", foundTheme);
    updateTheme({ theme: JSON.stringify(foundTheme) });
  };

  return (
    <div className="flex ">
      <div className="flex flex-col w-full">
        <div className="">
          <div className="font-semibold pb-4  text-xl ">Profile</div>
          <div className="w-full bg-white rounded-3xl p-6">
            <div className="flex items-center justify-between gap-4">
              <span className="relative flex shrink-0 overflow-hidden rounded-full size-32 cursor-pointer ring-offset-2 ring-2 ring-slate-200">
                <img
                  src={image}
                  className="h-full w-full object-cover"
                  alt=""
                />
              </span>

              <div className="w-full">
                <button
                  className="flex items-center justify-center w-full py-3 rounded-full text-white font-semibold bg-[#8228D9] hover:bg-[#6c21b3] mb-2"
                  onClick={() => setOpen((prev) => !prev)}
                >
                  Pick image
                </button>
              </div>
            </div>
            <div className="mt-4">
              <input
                placeholder="Profile Title"
                type="text"
                className="w-full bg-[#EFF0EB] text-gray-800 border-2 text-sm rounded-xl py-3.5 px-3 placeholder-gray-500 focus:outline-none"
              />
            </div>
            <textarea
              name=""
              id=""
              placeholder="bio"
              className="w-full mt-4 bg-[#EFF0EB] text-gray-800 border-2 text-sm border-[#EFF0EB] rounded-xl py-3.5 px-3 placeholder-gray-500 resize-none focus:outline-none"
            ></textarea>
            <div className="flex items-center justify-end text-[#676B5F] text-[13px]">
              biolength/80
            </div>
          </div>
        </div>
        {/* theme selection */}
        <div className="">
          <div className="font-semibold pb-4 mt-20 md:mt-8 text-xl">Themes</div>
          <div className="w-full bg-white rounded-3xl p-6">
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
              {themes.map((theme: Theme, index) => (
                <React.Fragment key={index}>
                  <div onClick={() => updateSelectedTheme(theme.id)}>
                    <div className="border-2 border-gray-500 rounded-lg aspect-[2/3] border-dashed cursor-pointer transition-all duration-150 ease-in p-2">
                      <div
                        className={`w-full h-full  flex flex-col items-center gap-3 ${theme.color}`}
                      >
                        <div className="w-12 h-12 mt-3 bg-[#EFF0EA] bg-opacity-70 rounded-full"></div>
                        <div className="relative w-[calc(100%-20px)] h-6">
                          <div
                            className={`w-full h-full ${theme.boxColor} absolute z-20 ${theme.linkStyle}`}
                          ></div>
                          {theme.embosedBox && (
                            <div
                              className={`w-full h-full ${theme.embosedBoxColor} absolute top-0.5 left-0.5 z-10 ${theme.linkStyle}`}
                            ></div>
                          )}
                        </div>
                        <div className="relative w-[calc(100%-20px)] h-6">
                          <div
                            className={`w-full h-full ${theme.boxColor} absolute z-20 ${theme.linkStyle}`}
                          ></div>
                          {theme.embosedBox && (
                            <div
                              className={`w-full h-full ${theme.embosedBoxColor} absolute top-0.5 left-0.5 z-10 ${theme.linkStyle}`}
                            ></div>
                          )}
                        </div>
                        <div className="relative w-[calc(100%-20px)] h-6">
                          <div
                            className={`w-full h-full ${theme.boxColor} absolute z-20 ${theme.linkStyle}`}
                          ></div>
                          {theme.embosedBox && (
                            <div
                              className={`w-full h-full ${theme.embosedBoxColor} absolute top-0.5 left-0.5 z-10 ${theme.linkStyle}`}
                            ></div>
                          )}
                        </div>
                      </div>
                      {/* <div className="relative rounded-xl h-full mx-auto">
                        <div
                          className={`absolute left-0 top-0 h-full w-full z-0 ${color.color}`}
                        >
                          <div className="relative z-10 pt-9">
                            <div className="rounded-full mx-auto w-12 h-12 bg-[#EFF0EA] bg-opacity-70"></div>
                          </div>
                          <div
                            className={`w-[calc(100%-20px)] bg-[#EFF0EA] h-6 ${color.linkStyle} mx-auto mt-1`}
                          ></div>
                          <div
                            className={`w-[calc(100%-20px)] bg-[#EFF0EA] h-6 ${color.linkStyle} mx-auto mt-1`}
                          ></div>
                          <div
                            className={`w-[calc(100%-20px)] bg-[#EFF0EA] h-6 ${color.linkStyle} mx-auto mt-1`}
                          ></div>
                        </div>
                      </div> */}
                    </div>
                    <div className="text-center">{theme.name}</div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ImageCropper1
        open={open}
        setOpen={setOpen}
        croppedImageUrl={croppedImageUrl}
        setCroppedImageUrl={setCroppedImageUrl}
        uploadProfileImage={uploadProfileImage}
      />
    </div>
  );
};

export default Page;
