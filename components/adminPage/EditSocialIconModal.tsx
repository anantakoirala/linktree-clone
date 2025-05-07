"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { SocialIcon } from "@/types/SocialIcon";
import { ListedSocialIcons } from "@/lib/socialIcons";
import { SocialMediaName, socialMediaSchemas } from "@/schema";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { socialIconPlaceHolders } from "@/lib/placeHolder";
import { Pencil, Plus } from "lucide-react";
import {
  useLazyGetSingleSocialIconQuery,
  useUpdateSocialIconMutation,
} from "@/redux/socialIcon/socialIconApi";
import { z } from "zod";
import toast from "react-hot-toast";
import {
  setClickedSocialMediaId,
  setIconsSelectionViewOnDisplay,
} from "@/redux/socialIcon/socialIconSlice";

type Props = {
  editModalOpen: boolean;
  setEditModalOpen: Dispatch<SetStateAction<boolean>>;
};

const EditSocialIconModal = ({ editModalOpen, setEditModalOpen }: Props) => {
  const dispatch = useDispatch();
  const { editSocialIconId, socialIcons } = useSelector(
    (state: RootState) => state.socialIcon
  );
  const [selectedSocialIcon, setSelectedSocialIcon] =
    useState<SocialIcon | null>(null);

  const [updateSocialIcon, { isLoading, isSuccess, isError }] =
    useUpdateSocialIconMutation();

  const placeholder = selectedSocialIcon
    ? socialIconPlaceHolders[selectedSocialIcon?.name as SocialMediaName]
    : { placeholder: "", description: "" };

  const schema = selectedSocialIcon
    ? socialMediaSchemas[selectedSocialIcon.name as SocialMediaName]
    : z.object({});

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      value: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  useEffect(() => {
    if (editSocialIconId) {
      const res = socialIcons.find((social) => social._id === editSocialIconId);
      if (res) {
        const icon = ListedSocialIcons.find(
          (listed) => listed.name === res.name
        );
        setSelectedSocialIcon(icon || null);

        // Reset form with the updated default value
        reset({
          value: res.value || "", // Set value from `socialIcons` or fallback to an empty string
        });
      }
    }
  }, [editSocialIconId, socialIcons, reset]);

  // useEffect(() => {
  //   if (editSocialIconId) {
  //     trigger(editSocialIconId);
  //   }
  // }, [trigger, editSocialIconId]);

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      const result = await updateSocialIcon({
        id: editSocialIconId,
        data,
      }).unwrap();
      toast.success(result.message);
      setEditModalOpen(false);
      dispatch(setClickedSocialMediaId(0));
      dispatch(setIconsSelectionViewOnDisplay(false));
    } catch (error) {}
  };

  return (
    <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Social Icon</DialogTitle>
          <DialogDescription>
            Please provide the new value for the selected social icon.
          </DialogDescription>
        </DialogHeader>

        {/* {isLoading && <p>Loading...</p>}

        {isError && <p className="text-red-500">Failed to load data.</p>} */}

        {selectedSocialIcon && (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <input
              placeholder={placeholder.placeholder}
              type="text"
              className="w-full bg-[#EFF0EB] text-gray-800 border-2 rounded-xl py-3.5 px-3 placeholder-gray-500 focus:outline-none"
              {...register("value")}
            />
            {errors?.value && (
              <span className="text-red-600 text-sm">
                {errors?.value.message}
              </span>
            )}
            <span className="text-sm text-gray-500">
              {placeholder.description}
            </span>
            <button
              className="w-full mt-5 rounded-full h-12 bg-[#8228D9] hover:bg-[#6c21b3] text-white flex text-[17px] font-semibold items-center justify-center flex-row"
              type="submit"
              disabled={isLoading}
            >
              <Pencil size={25} className="mr-0.5 font-thin" />
              <span> Edit</span>
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditSocialIconModal;
