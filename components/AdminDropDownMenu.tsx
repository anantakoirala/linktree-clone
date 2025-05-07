"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import ImageCropper1 from "./ImageCropper1";
import { useUploadProfileImageMutation } from "@/redux/profile/profileApi";
import DisplayNameAndBioModal from "./DisplayNameAndBioModal";
import SocialIconsModal from "./SocialIconsModal";
import { useDispatch } from "react-redux";
import { openSocialIconsModal } from "@/redux/link/linkSlice";
import ProfileImageCropper from "./ProfileImageCropper";

type Props = {};

const AdminDropDownMenu = (props: Props) => {
  const dispatch = useDispatch();
  const [imageCropperOpen, setImageCropperOpen] = useState<boolean>(false);
  const [editDisplayAndBioModalOpen, setEditDispalyAndBioModalOpen] =
    useState<boolean>(false);
  const [socialIconsModalOpen, setSocialIconsModalOpen] =
    useState<boolean>(false);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  const [uploadProfileImage, { isError, isLoading, isSuccess }] =
    useUploadProfileImageMutation();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="ring-offset-0 focus:outline-none ">
          <div className="w-9 lg:w-12 h-9 lg:h-12 rounded-full flex items-center justify-center bg-gray-200 cursor-pointer">
            <Ellipsis />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 -ml-40 rounded-3xl p-2">
          <DropdownMenuItem
            className="rounded-3xl font-bold h-12 text-[15px]"
            onClick={() => setImageCropperOpen((prev) => !prev)}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-black "
              role="img"
              aria-labelledby=" "
            >
              <path
                fill="currentColor"
                d="M1.5 1v.5V1h13l.5.5V14.5l-.5.5H1.5l-.5-.5v-13l.5-.5Zm.5 9.72V14H13.75L6 7.17l-4 3.55ZM2 9.4l3.67-3.26h.66L14 12.88V2H2v7.39Zm9-3.4a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
              ></path>
            </svg>
            Edit Image
          </DropdownMenuItem>
          <DropdownMenuItem
            className="rounded-3xl font-bold h-12 text-[15px]"
            onClick={() => setEditDispalyAndBioModalOpen((prev) => !prev)}
          >
            <svg
              width="14"
              height="16"
              viewBox="0 0 14 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.88208 4.12752C3.88208 2.40014 5.2824 0.999817 7.00978 0.999817C8.73716 0.999817 10.1375 2.40014 10.1375 4.12752C10.1375 5.8549 8.73716 7.25522 7.00978 7.25522C5.2824 7.25522 3.88208 5.8549 3.88208 4.12752ZM7.00978 -0.000183105C4.73012 -0.000183105 2.88208 1.84785 2.88208 4.12752C2.88208 6.40719 4.73012 8.25522 7.00978 8.25522C9.28945 8.25522 11.1375 6.40719 11.1375 4.12752C11.1375 1.84785 9.28945 -0.000183105 7.00978 -0.000183105ZM1.40161 10.2234L0.901611 10.7234V16H1.90161V11.2234H12.1145V16H13.1145V10.7234L12.6145 10.2234H1.40161Z"
                fill="currentColor"
              ></path>
            </svg>
            Edit dispaly name and bio
          </DropdownMenuItem>
          <DropdownMenuItem
            className="rounded-3xl font-bold h-12 text-[15px]"
            onClick={() => {
              dispatch(openSocialIconsModal());
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="max-w-[16px] "
              role="img"
              aria-labelledby=" "
            >
              <path
                fillRule="evenodd"
                d="M6.796 2.205a1.204 1.204 0 1 1 2.408 0 1.204 1.204 0 0 1-2.408 0ZM8 .001a2.204 2.204 0 0 0-.5 4.352v1.294a3.75 3.75 0 0 0-2.977 5.123l-1.154 1.153a2.204 2.204 0 1 0 .707.707l.964-.964A3.743 3.743 0 0 0 8 13.114a3.743 3.743 0 0 0 2.96-1.448l.963.964a2.204 2.204 0 1 0 .707-.707l-1.153-1.153A3.75 3.75 0 0 0 8.5 5.648V4.352A2.205 2.205 0 0 0 8 0Zm0 12.113a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5Zm-5.795.477a1.204 1.204 0 1 0 0 2.409 1.204 1.204 0 0 0 0-2.41Zm10.386 1.204a1.204 1.204 0 1 1 2.408 0 1.204 1.204 0 0 1-2.409 0Z"
                fill="currentColor"
              ></path>
            </svg>
            Edit social icons
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ProfileImageCropper
        open={imageCropperOpen}
        setOpen={setImageCropperOpen}
        croppedImageUrl={croppedImageUrl}
        setCroppedImageUrl={setCroppedImageUrl}
        fileName={fileName}
        setFileName={setFileName}
        uploadProfileImage={uploadProfileImage}
      />

      <DisplayNameAndBioModal
        editDisplayAndBioModalOpen={editDisplayAndBioModalOpen}
        setEditDispalyAndBioModalOpen={setEditDispalyAndBioModalOpen}
      />
      <SocialIconsModal setSocialIconsModalOpen={setSocialIconsModalOpen} />
    </>
  );
};

export default AdminDropDownMenu;
