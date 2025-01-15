import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronRight, Pen, Plus, Search } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import * as cheerio from "cheerio";
import { restApi } from "@/api";
import { handleApiError } from "@/lib/handleApiError";
import { Skeleton } from "./ui/skeleton";
import {
  useLazyFetchOgQuery,
  useSaveProductMutation,
} from "@/redux/shop/shopApi";
import toast from "react-hot-toast";

type Props = {
  open: boolean;
  setOpen: React.SetStateAction<any>;
};

const formSchema = z.object({
  linkValue: z.string().url("Please enter a valid URL"), // You can add more validation here
});

const AddProductModal = ({ open, setOpen }: Props) => {
  const [noTitleImage, setNoTitleImage] = useState<boolean>(false);
  const [ogdata, setOgData] = useState<{ ogTitle: string; ogImage: string }>();
  const [isLabelUp, setIsLabelUp] = useState(false);

  const [trigger, { data, isLoading, isError, isSuccess }] =
    useLazyFetchOgQuery();

  const [
    saveProductData,
    {
      isError: errorProductSave,
      isLoading: loadingProductSave,
      isSuccess: successProductSaving,
    },
  ] = useSaveProductMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      linkValue: "",
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDisplayRightArrowButton(value.length > 2);
    setIsLabelUp(value.length > 0); // Keep label up if input has text
  };

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = form;

  const onSubmitLink = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await trigger({ url: data.linkValue }).unwrap();

      if (response.ogTitle === "No title" && response.ogImage === "No image") {
        setNoTitleImage(true);
      } else {
        setOgData({ ogTitle: response.ogTitle, ogImage: response.ogImage });
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const [displayRightArrowButton, setDisplayRightArrowButton] =
    useState<boolean>(false);

  // Handle submit manually
  const handleManualSubmit = () => {
    handleSubmit(onSubmitLink)();
  };

  const saveProduct = async () => {
    try {
      const response = await saveProductData({ data: ogdata }).unwrap();
      console.log("response", response.data);
      console.log("success", successProductSaving);
      if (response.success) {
        // Check `success` from the response object
        setOpen(false);
        toast.success("Product added successfully");
      } else {
        // Handle failure case based on the response data
        toast.error("Failed to add product");
      }
      console.log("success after", successProductSaving);
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[95vw] lg:max-w-[60vw]" autoFocus={false}>
        <DialogHeader>
          <DialogTitle className="text-center mb-2">
            Add to your shop
          </DialogTitle>
        </DialogHeader>
        {noTitleImage ? (
          <>
            <div className="w-full h-full flex flex-col gap-2">
              {/* Image div */}
              <div className="w-full h-40 flex items-center justify-center ">
                <div className="w-40 h-40 flex items-center justify-center rounded-xl hover:border-[3px] hover:border-gray-300 cursor-pointer">
                  <div className="w-28 h-28 flex items-center justify-center relative ">
                    <svg
                      width="81"
                      height="80"
                      viewBox="0 0 61 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full text-concrete"
                    >
                      <path
                        className="fill-[currentColor]"
                        d="M3.9 3.3v.5-.5h52.5l.5.5v52.6l-.5.5H3.8l-.5-.5V3.8l.5-.5Zm.5 38.5v14h51.5v-.6L21.5 27l-17 15Zm0-1.3L21 25.9h.7l34.2 28V4.3H4.4v36.2Zm39.5-28.8a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm-5.5 4.6a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0Z"
                      ></path>
                    </svg>
                    <div className="absolute w-10 h-10 rounded-full bg-[#0000004d] -right-4 -bottom-4 flex items-center justify-center">
                      <Pen className="text-white font-sm w-3-h-3" size={18} />
                    </div>
                  </div>
                </div>
              </div>
              {/* Url div */}
              <div className="w-full">
                <input
                  placeholder="Url"
                  type="text"
                  className="w-full bg-[#EFF0EB] text-gray-800 border-2 rounded-xl py-3.5 px-3 placeholder-gray-500 focus:outline-none"
                  value={getValues("linkValue")}
                />
              </div>
              {/* Title */}
              <div className="w-full">
                <input
                  placeholder="Title"
                  type="text"
                  className="w-full bg-[#EFF0EB] text-gray-800 border-2 rounded-xl py-3.5 px-3 placeholder-gray-500 focus:outline-none"
                />
                <span className="text-right w-full mt-1 inline-block text-gray-500">
                  0/250
                </span>
              </div>
              {/* Price and Currency */}
              <div className="w-full h-auto flex flex-row gap-4">
                {/* Price */}
                <div className="w-[50%]">
                  <input
                    placeholder="Price (Optional)"
                    type="text"
                    className="w-full bg-[#EFF0EB] text-gray-800 border-2 rounded-xl py-3.5 px-3 placeholder-gray-500 focus:outline-none"
                  />
                </div>
                {/* Currency */}
                <div className="w-[50%]">
                  <select className="w-full bg-[#EFF0EB] text-gray-800 border-2 rounded-xl py-3.5 px-3 placeholder-gray-500 focus:outline-none">
                    <option value="" disabled selected>
                      Currency
                    </option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </div>
              </div>
              <div className="w-full">
                <div className="mt-10">
                  <button
                    className="rounded-full w-full p-3 font-bold bg-[#8228D9] hover:bg-[#6c21b3] text-white "
                    type="submit"
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col w-full">
              {/* Paste link input field */}
              <div className="w-full">
                <div className="relative">
                  <div className="group">
                    <input
                      type="text"
                      id="text"
                      autoComplete="off"
                      placeholder="Paste link"
                      className="w-full bg-[#EFF0EB] text-gray-800 border-2 rounded-full px-14  h-16 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#8228D9]"
                      {...register("linkValue", {
                        onChange: handleInputChange,
                      })}
                    />
                    {errors && errors?.linkValue && (
                      <span>{errors?.linkValue.message}</span>
                    )}
                    <Search
                      size={20}
                      className="w-8 h-8 absolute top-4 left-4"
                    />
                    <label
                      htmlFor="text"
                      className={`absolute left-14 text-sm transition-all ${
                        isLabelUp
                          ? "top-1 text-[#8228D9] text-sm"
                          : "top-6 text-gray-500"
                      }`}
                    >
                      Paste link
                    </label>
                  </div>
                  {displayRightArrowButton && (
                    <button
                      type="button"
                      className="w-14 h-14  z-50 rounded-full bg-[#8228D9] hover:bg-[#6c21b3] absolute top-1 right-1 flex items-center justify-center cursor-pointer"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={handleManualSubmit}
                    >
                      <ChevronRight className="text-white" />
                    </button>
                  )}
                </div>
              </div>
              {/* Skeleton div */}
              {isLoading ? (
                <>
                  <div className="w-full h-40 rounded-md mt-5 ">
                    <div className="flex flex-row h-full rounded-md">
                      <div className="w-[20%] h-full  rounded-l-md">
                        <Skeleton className="w-full h-full rounded-l-md" />
                      </div>
                      <div className="w-[80%] h-full  rounded-r-md">
                        <div className="space-y-2 mt-10 pl-5">
                          <Skeleton className="h-4 w-[100%]" />
                          <Skeleton className="h-4 w-[90%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {isSuccess && (
                    <div className="w-full h-40 rounded-md mt-5">
                      <div className="flex flex-row h-full rounded-md">
                        <div className="w-[20%] h-full rounded-l-md  overflow-hidden">
                          <img
                            src={ogdata?.ogImage}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-[70%] h-full  rounded-r-md flex p-8 items-center">
                          <span>{ogdata?.ogTitle}</span>
                        </div>
                        <div className="w-[10%] h-full pl-7  flex items-center justify-center">
                          <button
                            type="button"
                            className="w-14 h-14  z-50 rounded-full bg-[#8228D9] hover:bg-[#6c21b3] flex items-center justify-center cursor-pointer"
                            onClick={saveProduct}
                            disabled={loadingProductSave}
                          >
                            <Plus className="text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
