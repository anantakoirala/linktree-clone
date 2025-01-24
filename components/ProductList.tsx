import { Product } from "@/types/Product";

import { IoCloseOutline } from "react-icons/io5";
import { IoShareOutline } from "react-icons/io5";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RiPencilLine } from "react-icons/ri";

import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import {
  useChangeProductStatusMutation,
  useDeleteProductMutation,
} from "@/redux/shop/shopApi";
import { handleApiError } from "@/lib/handleApiError";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setShopEditId } from "@/redux/shop/shopSlice";
import EditProductModal from "./EditProductModal";

type Props = {
  product: Product;
};

const ProductList = ({ product }: Props) => {
  const dispatch = useDispatch();
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [isPublished, setIsPublished] = useState(product.publish);
  const [changeProductStatus] = useChangeProductStatusMutation();
  const [deleteProductMutation] = useDeleteProductMutation();

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

  const deleteProduct = async (product_id: string) => {
    console.log("produt_id", product_id);
    try {
      const response = await deleteProductMutation(product_id).unwrap();
      toast.success(response.message);
    } catch (error) {
      handleApiError(error);
    }
  };

  const editShop = (id: string) => {
    dispatch(setShopEditId(id));
    setEditModalOpen(true);
  };
  return (
    <>
      <div className="w-full h-28 lg:h-40 flex flex-row rounded-md bg-white shadow-md p-2 cursor-pointer">
        <div className="w-[30%] lg:w-[20%] rounded-md overflow-hidden relative group ">
          <span className="flex shrink-0 overflow-hidden  size-24 lg:size-36 cursor-pointer ">
            <img
              src={product.image}
              className="h-full w-full object-cover rounded-md"
              alt=""
            />
          </span>
          {/* <div className="w-full h-full absolute bg-slate-500 top-0 opacity-0 group-hover:opacity-100 bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-300">
            <div className="w-20 h-12 bg-black bg-opacity-45 rounded-full flex flex-row items-center justify-center gap-1 cursor-pointer">
              <RiPencilLine className="text-white font-bold" size={16} />
              <span className="font-bold text-white">Edit</span>
            </div>
          </div> */}
        </div>

        <div className="w-[70%] lg:w-[80%] h-full flex flex-row rounded-r-md px-2 items-center ">
          <div
            className="w-[80%] h-full px-1 lg:px-5 py-1 lg:py-2 flex flex-col  gap-3 lg:gap-2 justify-between"
            onClick={() => editShop(product._id)}
          >
            <div className="pb-[2px] line-clamp-2 text-[10px] lg:text-lg h-auto lg:leading-5 text-ellipsis ">
              {product.name}
            </div>

            <div className="w-full h-10 flex flex-row items-center gap-1">
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger>
                    <IoCloseOutline
                      size={25}
                      className="text-gray-600"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        deleteProduct(product._id);
                      }}
                    />
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
                onCheckedChange={(e) => {
                  handlePublishToggle(product._id);
                }} // Handle toggle
              />
            </div>
          </div>
        </div>
      </div>
      {editModalOpen && (
        <EditProductModal
          editModalOpen={editModalOpen}
          setEditModalOpen={setEditModalOpen}
        />
      )}
    </>
  );
};

export default ProductList;
