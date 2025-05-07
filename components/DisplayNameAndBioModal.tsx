"use client";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useUpdateUserProfileMutation } from "@/redux/profile/profileApi";
import { handleApiError } from "@/lib/handleApiError";

type Props = {
  editDisplayAndBioModalOpen: boolean;
  setEditDispalyAndBioModalOpen: React.SetStateAction<any>;
};

const formSchema = z.object({
  profile_title: z
    .string()
    .max(30, "Profile title must not exceed more than 30 characters"),
  bio: z.string().max(80, "Bio should not exceed more than 80 characters"),
});

const DisplayNameAndBioModal = ({
  editDisplayAndBioModalOpen,
  setEditDispalyAndBioModalOpen,
}: Props) => {
  const [updateProfile] = useUpdateUserProfileMutation();
  const { profile_title, bio } = useSelector(
    (state: RootState) => state.profile
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    watch,
  } = form;

  const bioValue = watch("bio") || "";
  const profileTitleValue = watch("profile_title") || "";

  const submitData = (data: z.infer<typeof formSchema>) => {
    console.log("data", data);
    try {
      updateProfile({
        profile_title: data.profile_title,
        bio: data.bio,
      })
        .then((res) => {
          setEditDispalyAndBioModalOpen(false);
        })
        .catch((error) => console.log("error"));
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    reset({
      profile_title: profile_title,
      bio: bio,
    });
  }, [profile_title, bio]);
  return (
    <Dialog
      open={editDisplayAndBioModalOpen}
      onOpenChange={setEditDispalyAndBioModalOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Display name and bio</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="w-full h-auto">
          <form
            onSubmit={handleSubmit(submitData)}
            className="flex flex-col w-full"
          >
            <input
              placeholder="Profile Title"
              type="text"
              className="w-full bg-[#EFF0EB] text-gray-800 border-2 text-sm rounded-xl py-3.5 px-3 placeholder-gray-500 focus:outline-none"
              maxLength={30}
              {...register("profile_title")}
            />
            <div className="flex items-center justify-end text-[#676B5F] text-[13px]">
              {`${profileTitleValue.length} / 30`}
            </div>
            {errors && errors?.profile_title && (
              <span className="bg-red-700 text-sm">
                {errors?.profile_title?.message}
              </span>
            )}
            <textarea
              id=""
              placeholder="bio"
              className="w-full  bg-[#EFF0EB] text-gray-800 border-2 text-sm border-[#EFF0EB] rounded-xl py-3.5 px-3 placeholder-gray-500 resize-none focus:outline-none"
              maxLength={80}
              {...register("bio")}
            ></textarea>
            <div className="flex items-center justify-end text-[#676B5F] text-[13px]">
              {`${bioValue.length} / 80`}
            </div>
            {errors && errors?.bio && (
              <span className="bg-red-700 text-sm">{errors?.bio?.message}</span>
            )}
            <button
              className="rounded-full p-3 px-4 lg:px-6 disabled:bg-[#EFF0EB] disabled:text-[#A7AAA2] bg-[#8228D9] hover:bg-[#6c21b3] text-white"
              type="submit"
            >
              Save
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DisplayNameAndBioModal;
