import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronRight, Plus, Search } from "lucide-react";
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

  const [ogdata, setOgData] = useState<{ ogTitle: string; ogImage: string }>();
  const [isLabelUp, setIsLabelUp] = useState(false);

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

      setOgData({ ogTitle: response.ogTitle, ogImage: response.ogImage });
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
                <Search size={20} className="w-8 h-8 absolute top-4 left-4" />
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
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
