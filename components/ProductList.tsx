import { Product } from "@/types/Product";

import { IoCloseOutline } from "react-icons/io5";
import { IoShareOutline } from "react-icons/io5";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import { useChangeProductStatusMutation } from "@/redux/shop/shopApi";
import { handleApiError } from "@/lib/handleApiError";
import toast from "react-hot-toast";

type Props = {
  product: Product;
};

const ProductList = ({ product }: Props) => {
  const [isPublished, setIsPublished] = useState(product.publish);
  const [changeProductStatus] = useChangeProductStatusMutation();

  const handlePublishToggle = (id: string) => {
    try {
      const newPublishState = !isPublished;
      setIsPublished(newPublishState);
      console.log("newPublishState", newPublishState);
      changeProductStatus({ id: id, status: newPublishState })
        .then((res) => {
          console.log("response", res.data);
          toast.success(res.data.message);
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      handleApiError(error);
    }
  };
  return (
    <div className="w-full h-40 flex flex-row rounded-md bg-white shadow-md p-2">
      <div className="w-[20%] h-full rounded-md  overflow-hidden">
        <img src={product.image} className="w-full h-full object-cover" />
      </div>
      <div className="w-[80%] h-full flex flex-row rounded-r-md p-2 items-center">
        <div className="w-[80%] h-full px-5 flex flex-col gap-2">
          <span className="pb-[2px] text-md font-semibold leading-[1.35] line-clamp-2 text-black">
            {product.name}
          </span>
          <div className="w-full h-10 flex flex-row items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <IoCloseOutline size={25} className="text-gray-600" />
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Remove from shop</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger>
                  <IoShareOutline size={25} className="text-gray-600" />
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Share</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="w-[20%] h-full flex items-center justify-center ">
          <div className="flex items-center space-x-2">
            <Switch
              id="airplane-mode"
              className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
              checked={isPublished} // Controlled state
              onCheckedChange={() => handlePublishToggle(product._id)} // Handle toggle
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
