"use client";
import AdminDropDownMenu from "@/components/AdminDropDownMenu";
import HookFormError from "@/components/HookFormError";
import LinkBox from "@/components/LinkBox";
import { handleApiError } from "@/lib/handleApiError";
import { useCreateLinkMutation } from "@/redux/link/linkApi";
import { RootState } from "@/redux/store";
import { Link } from "@/types/Link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ellipsis, Plus, PlusCircle, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import { CiCirclePlus } from "react-icons/ci";

import { z } from "zod";
import { useLazyGetAllSocialIconsQuery } from "@/redux/socialIcon/socialIconApi";
import SocialIconDisplayList from "@/components/adminPage/SocialIconDisplayList";

type Props = {};

const formSchema = z.object({
  name: z.string().min(2, "Minimum 2 characters needed"),
  url: z.string(),
});

const Page = (props: Props) => {
  const [addClicked, setAddClicked] = useState<boolean>(false);
  const [openDropdownMenu, setOpenDropdownMenu] = useState(false);
  const { links, idForNameEdit, idForUrlEdit } = useSelector(
    (state: RootState) => state.link
  );
  const { products } = useSelector((state: RootState) => state.shop);
  const { image, profile_title } = useSelector(
    (state: RootState) => state.profile
  );
  const [
    createLink,
    {
      isError: isCreateLinkError,
      isLoading: isCreateLinkLoading,
      isSuccess: isCreateLinkSuccess,
    },
  ] = useCreateLinkMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = form;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await createLink(data).unwrap(); // Unwrap to handle success or error

      // Display success toast
      setAddClicked(false);
      toast.success("link created successfully!");
    } catch (error: any) {
      // Display error toast
      handleApiError(error);
    }
  };

  // Handle states separately
  useEffect(() => {
    if (isCreateLinkSuccess) {
      console.log("Link created successfully!");
      // Add your success handling logic here
    }

    if (isCreateLinkError) {
      console.error("Failed to create link!");
      // Add your error handling logic here
    }
  }, [isCreateLinkSuccess, isCreateLinkError]);

  return (
    <div className="flex ">
      {/* add link button */}

      <div className="flex flex-col w-full">
        <div className="w-full h-[90px] lg:h-28 mb-2 flex flex-row gap-2 ">
          {/* Image */}
          <div className="w-[12%] lg:w-[10%] h-full flex items-center justify-start ">
            <span className="relative flex shrink-0 overflow-hidden rounded-full  size-12  lg:w-[4.5rem] lg:h-[4.5rem] cursor-pointer ">
              <img
                src={image ? image : "/unnamed.png"}
                className="h-full w-full object-cover"
                alt=""
              />
            </span>
          </div>
          {/* Bio and title and social icons*/}
          <div className="w-[75%] lg:w-[80%] h-full px-2 py-3 mb-4  flex flex-col gap-0.5">
            <div className="w-full font-semibold tracking-tight text-[12px] lg:text-[15px] text-left">
              {profile_title}
            </div>
            <div className="w-full text-gray-500 tracking-tight text-[11px] lg:text-[16px] text-left line-clamp-1 text-ellipsis">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
              asdfadsf asdfasdf
            </div>
            <div className="w-full flex items-center ">
              <SocialIconDisplayList />
            </div>
          </div>
          <div className="w-[7%] lg:w-[7%] h-full  flex items-center justify-center ">
            <AdminDropDownMenu />
          </div>
        </div>
        <button
          className="w-full rounded-full h-12 bg-[#8228D9] hover:bg-[#6c21b3] text-white flex text-[15px] font-semibold items-center justify-center flex-row"
          onClick={() => setAddClicked((prev) => !prev)}
        >
          <Plus size={17} className="mr-0.5 font-semibold" />{" "}
          <span> Add Link</span>
        </button>
        {/* add link form */}
        {addClicked && (
          <>
            <div className="w-full bg-white rounded-3xl overflow-hidden mt-4 transition-all duration-1000 ease-in">
              <div className="flex items-center justify-between px-6 py-1 lg:py-3">
                <div className="text-[19px] font-semibold">Enter Url</div>
                <button
                  className="flex items-center rounded-full p-1.5 hover:bg-[#EFF0EA]"
                  onClick={() => setAddClicked((prev) => !prev)}
                >
                  <X size={20} color="#676B5F" />
                </button>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center gap-2 md:gap-4 w-full pt-2 p-2 lg:p-6"
              >
                <div className="w-full">
                  <input
                    placeholder="name"
                    type="text"
                    className="w-full bg-[#EFF0EB] text-gray-800 border-2 rounded-xl py-2 lg:py-3.5 px-1.5 lg:px-3 placeholder-gray-500 focus:outline-none"
                    {...register("name")}
                  />
                  {errors && errors.name && (
                    <HookFormError message={errors?.name.message} />
                  )}

                  <div className="py-1" />
                  <input
                    placeholder="url"
                    type="text"
                    className="w-full bg-[#EFF0EB] text-gray-800 border-2 rounded-xl py-2 lg:py-3.5 px-1.5 lg:px-3 placeholder-gray-500 focus:outline-none"
                    {...register("url")}
                  />
                  {errors && errors.url && (
                    <HookFormError message={errors?.url.message} />
                  )}
                </div>
                <button
                  className="rounded-full p-3 px-4 lg:px-6 disabled:bg-[#EFF0EB] disabled:text-[#A7AAA2] bg-[#8228D9] hover:bg-[#6c21b3] text-white"
                  type="submit"
                  disabled={!watch("name") || !watch("url")}
                >
                  Add
                </button>
              </form>
            </div>
          </>
        )}

        <div className="mt-4">
          {links.map((link: Link) => (
            <LinkBox
              link={link}
              key={link._id}
              idForNameEdit={idForNameEdit}
              idForUrlEdit={idForUrlEdit}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
