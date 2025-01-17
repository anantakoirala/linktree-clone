"use client";
import React, { useEffect, useState } from "react";
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
import ImageCropper1 from "./ImageCropper1";
import { Pen } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Product } from "@/types/Product";
import { useUpdateProductMutation } from "@/redux/shop/shopApi";
import { handleApiError } from "@/lib/handleApiError";
import toast from "react-hot-toast";

type Props = {
  editModalOpen: boolean;
  setEditModalOpen: React.SetStateAction<any>;
};

const customProductFormSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
  title: z.string().min(3, "Title name must be at least 3 characters"),
  price: z.number().optional(), // Allow the price to be optional (undefined)
});

const EditProductModal = ({ editModalOpen, setEditModalOpen }: Props) => {
  const [fileName, setFileName] = useState<string>("");
  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);
  const [productToBeEdited, setProductToBeEdited] = useState<
    Product | undefined
  >(undefined);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string>("");

  // Get products and shop_edit_id from store
  const { products, shop_edit_id } = useSelector(
    (state: RootState) => state.shop
  );

  const [updateProduct, { isError, error: updateProductError }] =
    useUpdateProductMutation();

  const customProductForm = useForm<z.infer<typeof customProductFormSchema>>({
    resolver: zodResolver(customProductFormSchema),
    defaultValues: {},
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = customProductForm;

  // Update product to database
  const productEdit = async (data: z.infer<typeof customProductFormSchema>) => {
    try {
      const formData = new FormData();
      if (croppedImageUrl) {
        const response = await fetch(croppedImageUrl);
        const blob = await response.blob();
        const newfile = new File([blob], fileName, { type: blob.type });
        formData.append("file", newfile);
      } else {
        formData.append("title", data.title);
        formData.append("url", data.url);
        formData.append("price", data.price?.toString() ?? "");
      }
      const response = await updateProduct({
        id: shop_edit_id,
        data: formData,
      }).unwrap();
      if (response.message) {
        toast.success(response.message);
        setEditModalOpen(false);
      }
    } catch (error) {
      setEditModalOpen(false);
      handleApiError(error);
    }
  };

  // Find the product to be edited from store
  useEffect(() => {
    if (products.length > 0 && shop_edit_id !== "") {
      const productToEdit = products.find(
        (product) => product._id === shop_edit_id
      );
      if (productToEdit) {
        setProductToBeEdited(productToEdit);

        reset({
          title: productToEdit.name,
          price: productToEdit.price,
          url: productToEdit.url,
        });
      }
    }
  }, [products, shop_edit_id]);

  return (
    <>
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="w-full h-full flex flex-col gap-2">
            <div className="w-full h-40 flex items-center justify-center ">
              <div
                className="w-40 h-40 flex items-center justify-center rounded-xl hover:border-[3px] hover:border-gray-300 cursor-pointer"
                onClick={() => setImageModalOpen(true)}
              >
                <div className="w-28 h-28 flex items-center justify-center relative ">
                  {croppedImageUrl ? (
                    <>
                      <div
                        className={`w-full h-[full]  border-none rounded-b-none`}
                      >
                        <span
                          className={`flex shrink-0 overflow-hidden aspect-square size-32 w-full h-full cursor-pointer border-none`}
                        >
                          <img
                            src={croppedImageUrl}
                            className="h-full w-full object-cover"
                            alt=""
                          />
                        </span>
                      </div>
                      <div className="absolute w-10 h-10 rounded-full bg-[#0000004d] -right-4 -bottom-4 flex items-center justify-center">
                        <Pen className="text-white font-sm w-3-h-3" size={18} />
                      </div>
                    </>
                  ) : (
                    <>
                      {!productToBeEdited?.image ? (
                        <>
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
                            <Pen
                              className="text-white font-sm w-3-h-3"
                              size={18}
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            className={`w-full h-[full]  border-none rounded-b-none`}
                          >
                            <span
                              className={`flex shrink-0 overflow-hidden aspect-square size-32 w-full h-full cursor-pointer border-none`}
                            >
                              <img
                                src={productToBeEdited?.image}
                                className="h-full w-full object-cover"
                                alt=""
                              />
                            </span>
                          </div>
                          <div className="absolute w-10 h-10 rounded-full bg-[#0000004d] -right-4 -bottom-4 flex items-center justify-center">
                            <Pen
                              className="text-white font-sm w-3-h-3"
                              size={18}
                            />
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <form
              className="flex flex-col gap-3"
              onSubmit={handleSubmit(productEdit)}
            >
              {/* Url div */}
              <div className="w-full">
                <input
                  placeholder="Url"
                  type="text"
                  className="w-full bg-[#EFF0EB] text-gray-800 border-2 rounded-xl py-3.5 px-3 placeholder-gray-500 focus:outline-none"
                  {...register("url")}
                />
                {errors && errors?.url && <span>{errors?.url.message}</span>}
              </div>
              {/* Title */}
              <div className="w-full">
                <input
                  placeholder="Title"
                  type="text"
                  className="w-full bg-[#EFF0EB] text-gray-800 border-2 rounded-xl py-3.5 px-3 placeholder-gray-500 focus:outline-none"
                  {...register("title")}
                />
                <span className="text-right text-xs w-full  inline-block text-gray-500">
                  0/250
                </span>
                {errors && errors?.title && (
                  <span>{errors?.title.message}</span>
                )}
              </div>
              {/* Price and Currency */}
              <div className="w-full h-auto flex flex-row gap-4">
                {/* Price */}
                <div className="w-[50%]">
                  <input
                    placeholder="Price (Optional)"
                    type="number"
                    className="w-full bg-[#EFF0EB] text-gray-800 border-2 rounded-xl py-3.5 px-3 placeholder-gray-500 focus:outline-none"
                    {...register("price", {
                      setValueAs: (value) =>
                        value === "" ? undefined : parseInt(value),
                    })}
                  />
                  {errors && errors?.price && (
                    <span>{errors?.price?.message}</span>
                  )}
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
                    Update Product
                  </button>
                </div>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <ImageCropper1
        open={imageModalOpen}
        setOpen={setImageModalOpen}
        croppedImageUrl={croppedImageUrl}
        setCroppedImageUrl={setCroppedImageUrl}
        fileName={fileName}
        setFileName={setFileName}
      />
    </>
  );
};

export default EditProductModal;
