import { Product } from "@/types/Product";
import React from "react";

type Props = {
  product: Product;
};

const ProductList = ({ product }: Props) => {
  return (
    <div className="w-full h-40 flex flex-row rounded-md bg-white shadow-md p-2">
      <div className="w-[20%] h-full rounded-l-md  overflow-hidden">
        <img src={product.image} className="w-full h-full object-cover" />
      </div>
      <div className="w-[70%] h-full  rounded-r-md flex p-8 items-center">
        <span className="pb-[2px] text-md font-semibold leading-[1.35] line-clamp-2">
          {product.name}
        </span>
      </div>
    </div>
  );
};

export default ProductList;
