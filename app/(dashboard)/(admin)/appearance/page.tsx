"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

import ImageCropper1 from "@/components/ImageCropper1";
import {
  useUpdateUserProfileMutation,
  useUploadProfileImageMutation,
} from "@/redux/profile/profileApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import ThemeSection from "@/components/ThemeSection";

import debounce from "lodash.debounce";

type Props = {};

const Page = (props: Props) => {
  const [fileName, setFileName] = useState<string>("");
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
        field: "profile_title",
        value: title,
      });
    }, 1000),
    []
  );

  const saveBio = useCallback(
    debounce((bio: string) => {
      updateProfile({
        field: "bio",
        value: bio,
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

  useEffect(() => {
    setProfileTitle(profile_title);
    setBio(stateBio);
  }, [username, stateBio]);

  return (
    <div className="flex ">
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
