"use client";
import HookFormError from "@/components/HookFormError";
import LinkBox from "@/components/LinkBox";
import { handleApiError } from "@/lib/handleApiError";
import {
  useCreateLinkMutation,
  useLazyGetAllLinksQuery,
} from "@/redux/link/linkApi";
import { RootState } from "@/redux/store";
import { Link } from "@/types/Link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { z } from "zod";

type Props = {};

const dummyLink = [
  {
    id: 1,
    name: "youtube channel",
    url: "https://www.youtube.com/watch?v=NtsbjB8QD3Y&t=3981s&ab_channel=JohnWeeksDev",
    image: "https://picsum.photos/id/8/300/200",
  },
  {
    id: 2,
    name: "facebook",
    url: "https://www.facebook.com",
    image: "https://picsum.photos/id/8/300/200",
  },
];

const formSchema = z.object({
  name: z.string().min(2, "Minimum 2 characters needed"),
  url: z.string(),
});

const Page = (props: Props) => {
  const [trigger, { data: allLinks, isSuccess: getAllLinkSuccess }] =
    useLazyGetAllLinksQuery();

  const { links, idForNameEdit, idForUrlEdit } = useSelector(
    (state: RootState) => state.link
  );

  const [createLink, { isError, isLoading, isSuccess }] =
    useCreateLinkMutation();
  const [addClicked, setAddClicked] = useState<boolean>(false);
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

  useEffect(() => {
    trigger({});
  }, []);

  return (
    <div className="flex ">
      {/* add link button */}

      <div className="flex flex-col w-full">
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
