"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

import ImageCropper1 from "@/components/ImageCropper1";
import {
  useUpdateUserProfileMutation,
  useUploadProfileImageMutation,
} from "@/redux/profile/profileApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import ThemeSection from "@/components/ThemeSection";

import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";
import { setSelectedShareLinkBackgroundIndex } from "@/redux/profile/profileSlice";

type Props = {};

const Page = (props: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [fileName, setFileName] = useState<string>("");
  const [textColor, setTextColor] = useState<string>("");
  const [imgSrc, setImgSrc] = useState("");
  const [profileTitle, setProfileTitle] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [croppedImageUrl, setCroppedImageUrl] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [cropped, setCropped] = useState<boolean>(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [uploadProfileImage, { isError, isLoading, isSuccess }] =
    useUploadProfileImageMutation();

  const [updateProfile] = useUpdateUserProfileMutation();

  const {
    image,
    username,
    profile_title,
    bio: stateBio,
    theme,
  } = useSelector((state: RootState) => state.profile);

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

  const saveProfileTitle = useCallback(
    debounce((title: string) => {
      updateProfile({
        profile_title: title,
      });
    }, 1000),
    []
  );

  const saveBio = useCallback(
    debounce((bio: string) => {
      updateProfile({
        bio: bio,
      });
    }, 1000), // Debounce time is 1000ms (1 second)
    []
  );

  const updateProfileTitle = (title: string) => {
    if (profileTitle.length <= 30) {
      setProfileTitle(title);
      saveProfileTitle(title);
    }
  };

  const updateBio = (bio: string) => {
    if (bio.length <= 80) {
      setBio(bio);
      saveBio(bio);
    }
  };

  const changeBackground = (bg_color: string, index: number) => {
    dispatch(setSelectedShareLinkBackgroundIndex(index));
    const newTheme = { ...theme, selectedShareLinkBackgroundIndex: index };
    console.log("newTheme", newTheme);
    updateProfile({
      theme: newTheme,
    });
  };

  useEffect(() => {
    setProfileTitle(profile_title);
    setBio(stateBio);
  }, [username, stateBio]);

  useEffect(() => {}, [theme]);

  return (
    <div className="flex flex-col gap-4 mb-16">
      <div className="flex flex-col w-full">
        <div className="">
          <div className="font-semibold pb-4  text-xl ">Profile</div>
          <div className="w-full bg-white rounded-3xl p-6">
            <div className="flex items-center justify-between gap-4">
              <span className="relative flex shrink-0 overflow-hidden rounded-full size-32 cursor-pointer ring-offset-2 ring-2 ring-slate-200">
                <img
                  src={image ? image : "/unnamed.png"}
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
                value={profileTitle}
                maxLength={30}
                onChange={(e) => updateProfileTitle(e.target.value)}
              />
              <div className="flex items-center justify-end text-[#676B5F] text-[13px]">
                {`${profileTitle.length} / 30`}
              </div>
            </div>
            <textarea
              name=""
              id=""
              placeholder="bio"
              className="w-full mt-4 bg-[#EFF0EB] text-gray-800 border-2 text-sm border-[#EFF0EB] rounded-xl py-3.5 px-3 placeholder-gray-500 resize-none focus:outline-none"
              onChange={(e) => updateBio(e.target.value)}
              maxLength={80}
              value={bio}
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
              <ThemeSection />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="">
          <div className="font-semibold pb-1  text-xl ">Sharing Preview</div>
          <div className="font-normal pb-4 text-md ">
            Your sharing preview is the image that's displayed when you share
            your Linktree with others.
          </div>
          <div className="w-full bg-white rounded-3xl p-6">
            <div
              className={`w-full h-96 ${
                theme.shareLink_background[
                  theme.selectedShareLinkBackgroundIndex
                ].background
              } rounded-3xl flex flex-col transition-colors duration-300 ease-linear`}
            >
              <div className="w-full h-[55%] flex items-center justify-center mt-5">
                <span className="flex shrink-0 overflow-hidden rounded-full size-40 cursor-pointer ">
                  <img
                    src={image ? image : "/unnamed.png"}
                    className="h-full w-full object-cover"
                    alt=""
                  />
                </span>
              </div>
              <div
                className={`w-full h-auto flex justify-center  ${
                  theme.shareLink_background[
                    theme.selectedShareLinkBackgroundIndex
                  ]?.textColor
                }  font-[900] text-[34px] `}
              >
                {profile_title ? profile_title : username}
              </div>
              <div
                className={`w-full h-auto flex items-center  ${
                  theme.shareLink_background[
                    theme.selectedShareLinkBackgroundIndex
                  ]?.textColor
                } justify-center tracking-tighter text-center  font-[700] text-[20px]`}
              >
                /{username}
              </div>
            </div>
            <div className="w-full mt-4 font-bold">Custom background</div>
            <div className="w-full h-20 flex flex-row items-center gap-3">
              {theme.shareLink_background?.map((background_color, index) => (
                <div
                  className="w-14 h-14 border flex items-center justify-center border-black rounded-full"
                  key={index}
                >
                  <div
                    className={`${background_color.background} rounded-full ${
                      theme.selectedShareLinkBackgroundIndex === index
                        ? "w-10 h-10 transition-all duration-300"
                        : "w-12 h-12"
                    }`}
                    onClick={() =>
                      changeBackground(background_color.background, index)
                    }
                  ></div>
                </div>
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
        fileName={fileName}
        setFileName={setFileName}
      />
    </div>
  );
};

export default Page;
