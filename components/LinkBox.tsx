"use client";
import { setIdForNameEdit, setIdForUrlEdit } from "@/redux/link/linkSlice";
import { Link } from "@/types/Link";
import { Bell, Image, Pencil, Trash, X } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  link: Link;
  idForNameEdit: string;
  idForUrlEdit: string;
};

const LinkBox = ({ link, idForNameEdit, idForUrlEdit }: Props) => {
  const dispatch = useDispatch();
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isImage, setIsImage] = useState<boolean>(false);

  const setIdForEdit = (_id: string, type: "Name" | "Url") => {
    if (type === "Name") {
      dispatch(setIdForNameEdit(_id));
    } else {
      dispatch(setIdForUrlEdit(_id));
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl mb-3">
      <div className="px-8 py-5 ">
        <div className="flex items-center justify-between py-1">
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
            <Bell
              color="#676B5F"
              className="cursor-pointer min-w-[17px]"
              size={20}
            />
          </div>
        </div>
        <div className="flex items-center justify-between py-1">
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
          />

          <div className="text-center text-sm font-bold text-[#45494A]">
            Delete
          </div>
        </button>
        <div className="flex items-center justify-center pt-3">
          Delete this forever?
        </div>
        <div className="w-full px-4 py-3">
          <button className="flex items-center border justify-center w-full py-3 rounded-full text-black font-semibold hover:bg-gray-100">
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
          />
          <div className="text-center text-sm font-bold text-[#45494A]">
            Add Thumbnail
          </div>
        </div>
        <div className="w-full flex items-center justify-between px-4 py-5">
          <img
            src="https://picsum.photos/id/8/300/200"
            alt=""
            className="rounded-lg w-[80px] aspect-square"
          />
          <div className="w-full pl-3">
            <button className="flex items-center justify-center w-full py-3 rounded-full text-white font-semibold bg-[#8228D9] mb-2">
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkBox;
