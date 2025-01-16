import { Product } from "@/types/Product";
import { Theme } from "@/types/Theme";
import Link from "next/link";
import React from "react";
import TextTruncate from "react-text-truncate";

type Props = {
  theme: Theme;
  product: Product;
};

const ProductCard = ({ theme, product }: Props) => {
  return (
    <Link href={"/"}>
      <div className="relative w-[calc(100%-15px)] h-96 mx-auto mb-3">
        <div className="w-full h-full absoulte z-20">
          <div
            className={`flex flex-col items-center  relative ${theme?.shopBox} mx-auto z-20 ${theme?.boxColor} mt-2 p-4 h-full ${theme.hover} transition-all duration-150`}
          >
            {/* Image */}
            <div
              className={`w-full h-[70%]  ${theme?.shopBox} border-none rounded-b-none`}
            >
              <span
                className={`flex shrink-0 overflow-hidden  size-32 w-full h-full cursor-pointer ${theme?.shopBox} border-none`}
              >
                <img
                  src={"/wallpaper.jpg"}
                  className="h-full w-full object-cover"
                  alt=""
                />
              </span>
            </div>
            {/* Other description */}
            <div
              className={`flex flex-col w-full h-[30%]  ${theme?.shopBox} border-none rounded-t-none`}
            >
              {/* Name */}
              <div className="w-full h-[60%] text-center  font-specialelite text-ellipsis overflow-hidden  mt-2 line-clamp-2 font-normal">
                <TextTruncate
                  line={2}
                  element="span"
                  truncateText="…"
                  text={product.name}
                />
              </div>
              {/* Price */}
              <div
                className={`w-full h-[40%]  ${theme?.shopBox} border-none rounded-t-none`}
              ></div>
            </div>
          </div>
        </div>
        {/* Embosed shadow */}
        {theme?.embosedBox && (
          <div
            className={`absolute top-[8px] left-1.5 z-10 w-full h-full ${theme?.shopBox} ${theme?.embosedBoxColor}`}
          ></div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
