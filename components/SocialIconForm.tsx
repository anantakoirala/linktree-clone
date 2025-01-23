"use client";
import { ListedSocialIcons } from "@/lib/socialIcons";
import { SocialIcon } from "@/types/SocialIcon";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SocialMediaName, socialMediaSchemas } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodObject } from "zod";
import { socialIconPlaceHolders } from "@/lib/placeHolder";
import { Plus } from "lucide-react";
import z from "zod";
import { useSaveSocialIconMutation } from "@/redux/socialIcon/socialIconApi";
import { handleApiError } from "@/lib/handleApiError";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  setClickedSocialMediaId,
  setIconsSelectionViewOnDisplay,
} from "@/redux/socialIcon/socialIconSlice";

type Props = {
  id: number;
  setSocialIconsModalOpen: React.SetStateAction<any>;
  socialIconsModalOpen: boolean;
};

const SocialIconForm = ({
  id,
  setSocialIconsModalOpen,
  socialIconsModalOpen,
}: Props) => {
  const dispatch = useDispatch();
  const [socialMedia, setSocialMedia] = useState<SocialIcon>();
  const [saveSocialIcons, { isError, isLoading, isSuccess }] =
    useSaveSocialIconMutation();

  useEffect(() => {
    const res = ListedSocialIcons.find((social) => social._id === id);

    setSocialMedia(res);
  }, [id]);

  // Get the schema based on the social media name

  const schema: ZodObject<any, any, any, any> =
    socialMediaSchemas[socialMedia?.name as SocialMediaName];
  const form = useForm({
    resolver: zodResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const placeholder =
    socialIconPlaceHolders[socialMedia?.name as SocialMediaName];

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      const result = await saveSocialIcons(data).unwrap(); // Extracts the raw response

      toast.success(result.message);
      setSocialIconsModalOpen(false);
      dispatch(setClickedSocialMediaId(0));
      dispatch(setIconsSelectionViewOnDisplay(false));
    } catch (error) {
      // Handles any error from the mutation
      console.error("Mutation error:", error);
      handleApiError(error); // Your error handling function
    }
  };

  return (
    <>
      {socialMedia ? (
        <>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <input
                placeholder={placeholder.placeholder}
                type="text"
                className="w-full bg-[#EFF0EB] text-gray-800 border-2 rounded-xl py-3.5 px-3 placeholder-gray-500 focus:outline-none"
                {...register("value")}
              />
              {errors && errors.value && (
                <span className="text-red-600 text-sm">
                  {errors?.value.message as string}
                </span>
              )}
              <span className="text-sm text-gray-500">
                {placeholder.description}
              </span>
              <button
                className="w-full mt-5 rounded-full h-12 bg-[#8228D9] hover:bg-[#6c21b3] text-white flex text-[17px] font-semibold items-center justify-center flex-row"
                type="submit"
              >
                <Plus size={25} className="mr-0.5 font-thin" />
                <span> Add social icon</span>
              </button>
            </form>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default SocialIconForm;
