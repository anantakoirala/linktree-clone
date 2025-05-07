"use client";
import { setIdForNameEdit, setIdForUrlEdit } from "@/redux/link/linkSlice";
import { Link } from "@/types/Link";
import { Bell, Image, Pencil, Trash, X } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@/components/ui/switch";
import { handleApiError } from "@/lib/handleApiError";
import {
  useDeleteLinkMutation,
  useRemoveImageMutation,
} from "@/redux/link/linkApi";
import toast from "react-hot-toast";
import LinkImageCropper from "./LinkImageCropper";
import ImageRemoveDialog from "./ImageRemoveDialog";

type Props = {
  link: Link;
  idForNameEdit: string;
  idForUrlEdit: string;
};

const LinkBox = ({ link, idForNameEdit, idForUrlEdit }: Props) => {
  const dispatch = useDispatch();
  const [isPublished, setIsPublished] = useState(link.publish);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isImage, setIsImage] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");
  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);
  const [deleteImageModalOpen, setDeleteImageModalOpen] =
    useState<boolean>(false);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string>("");

  const [onDeleteLink, { isLoading }] = useDeleteLinkMutation();

  const setIdForEdit = (_id: string, type: "Name" | "Url") => {
    if (type === "Name") {
      dispatch(setIdForNameEdit(_id));
    } else {
      dispatch(setIdForUrlEdit(_id));
    }
  };

  const deleteLink = async (id: string) => {
    try {
      await onDeleteLink(id).unwrap();
      toast.success("Link deleted successfully");
      setIsDelete(false);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handlePublishToggle = (id: string) => {
    try {
      const newPublishState = !isPublished;
      setIsPublished(newPublishState);
    } catch (error) {
      handleApiError(error);
    }
  };

  const deleteImage = async (id: string) => {};

  return (
    <>
      <div className="w-full bg-white rounded-3xl mb-3">
        <div className="px-4 lg:px-8 py-2 lg:py-5 ">
          <div className="flex flex-row gap-1 w-full h-16  lg:h-20">
            {/* Input fields */}
            <div className="w-[85%] lg:w-[90%]  h-full">
              <div className="flex items-center justify-between py-1 h-[50%] ">
                <div className="flex items-center w-full">
                  {idForNameEdit === link._id ? (
                    <>
                      <input
                        type="text"
                        className="w-full text-sm font-semibold focus:outline-none"
                        autoFocus
                        value={link.name}
                      />
                    </>
                  ) : (
                    <>
                      <div className="flex items-center w-full">
                        <div className="font-semibold mr-2 cursor-pointer text-xl">
                          {link.name}
                        </div>
                        <Pencil
                          size={17}
                          className="cursor-pointer"
                          color="#676B5F"
                          onClick={() => setIdForEdit(link._id, "Name")}
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="flex items-center ">
                  {/* <Bell
              color="#676B5F"
              className="cursor-pointer min-w-[17px]"
              size={20}
            /> */}
                </div>
              </div>
              <div className="flex items-center justify-between py-1 h-[50%] ">
                <div className="flex items-center w-full">
                  {idForUrlEdit === link._id ? (
                    <>
                      <input
                        type="text"
                        className="w-full text-sm  focus:outline-none"
                        autoFocus
                        value={link.url}
                      />
                    </>
                  ) : (
                    <>
                      <div className="flex items-center w-[calc(100%-2px)]">
                        <div className=" mr-2 truncate cursor-pointer text-xl">
                          {link.url}
                        </div>
                        <Pencil
                          size={17}
                          className="cursor-pointer min-w-[17px]"
                          color="#676B5F"
                          onClick={() => setIdForEdit(link._id, "Url")}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            {/* Switch */}
            <div className="w-[15%] lg:w-[10%] h-full  flex items-center justify-center">
              <Switch
                id="airplane-mode"
                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                checked={isPublished} // Controlled state
                onCheckedChange={(e) => {
                  handlePublishToggle(link._id);
                }} // Handle toggle
              />
            </div>
          </div>

          <div className="flex items-center justify-between py-1 mt-4">
            <div className="flex items-center w-full relative">
              <div
                className={`flex items-center px-1.5 py-[2px] absolute -left-[6px] rounded-md ${
                  isImage ? "bg-[#8228D9]" : "hover:bg-gray-200"
                }`}
                onClick={() => setIsImage((prev) => !prev)}
              >
                <Image
                  className="cursor-pointer"
                  size={17}
                  color={isImage ? "#FFFFFF" : "#676B5F"}
                />
              </div>
            </div>
            {/* delete  */}
            <div className="flex items-center">
              <div className="flex items-center px-1.5 py-[2px] rounded-md relative">
                <button
                  className={`flex items-center px-1.5 py-[2px] absoulte -right-[6px] rounded-md ${
                    isDelete ? "bg-[#8228D9]" : "hover:bg-gray-200"
                  } `}
                  onClick={() => setIsDelete((prev) => !prev)}
                >
                  <Trash
                    size={20}
                    className="cursor-pointer"
                    color={isDelete ? "#FFFFFF" : "#676B5F"}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Delete message div */}
        <div
          className={`overflow-hidden  ${
            isDelete
              ? "max-h-[180px] transition-all duration-300 ease-in"
              : "max-h-0 transition-all duration-200 ease-out"
          }`}
        >
          <button className="relative w-full bg-[#DFE2D9] py-1.5">
            <X
              className="absolute right-1 top-[6px] cursor-pointer"
              size="20"
              color="#45494A"
              onClick={() => setIsDelete((prev) => !prev)}
            />

            <div className="text-center text-sm font-bold text-[#45494A]">
              Delete
            </div>
          </button>
          <div className="flex items-center justify-center pt-3">
            Delete this forever?
          </div>
          <div className="w-full px-4 py-3">
            <button
              className="flex items-center border justify-center w-full py-3 rounded-full text-black font-semibold hover:bg-gray-100"
              onClick={() => deleteLink(link._id)}
            >
              Remove
            </button>
          </div>
        </div>
        {/* Image change message div */}
        <div
          className={`overflow-hidden ${
            isImage
              ? "max-h-[180px] transition-all duration-300 ease-in"
              : "max-h-0 transition-all duration-200 ease-out"
          }`}
        >
          <div className="relative w-full bg-[#DFE2D9] py-1.5">
            <X
              className="absolute right-1 top-[6px] cursor-pointer"
              size={20}
              color="#45494A"
              onClick={() => setIsImage((prev) => !prev)}
            />
            <div className="text-center text-sm font-bold text-[#45494A]">
              Add Thumbnail
            </div>
          </div>
          <div className="w-full flex items-center justify-between px-4 py-5">
            {link.image ? (
              <img
                src={link.image}
                alt=""
                className="rounded-lg w-[80px] aspect-square"
              />
            ) : (
              <img
                src="/placeholder.jpg"
                alt=""
                className="rounded-lg w-[80px] aspect-square"
              />
            )}

            <div className="flex flex-col w-full">
              <div className="w-full pl-3">
                <button
                  className="flex items-center justify-center w-full py-3 rounded-full text-white font-semibold bg-[#8228D9] mb-2"
                  onClick={() => setImageModalOpen(true)}
                >
                  Change
                </button>
              </div>
              {link.image && (
                <div className="w-full pl-3">
                  <button
                    className="flex items-center justify-center w-full py-3 rounded-full text-white font-semibold bg-red-500 mb-2"
                    onClick={() => setDeleteImageModalOpen(true)}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <LinkImageCropper
        open={imageModalOpen}
        setOpen={setImageModalOpen}
        croppedImageUrl={croppedImageUrl}
        setCroppedImageUrl={setCroppedImageUrl}
        fileName={fileName}
        setFileName={setFileName}
        link={link}
        setIsImage={setIsImage}
      />
      <ImageRemoveDialog
        deleteImageModalOpen={deleteImageModalOpen}
        setDeleteImageModalOpen={setDeleteImageModalOpen}
        link={link}
      />
    </>
  );
};

export default LinkBox;
