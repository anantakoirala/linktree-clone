"use client";
import { RootState } from "@/redux/store";
import { X } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link as LinkType } from "@/types/Link";
import LinkCard from "./LinkCard";
import ProductCard from "./ProductCard";

type Props = {};

const PreviewSection = (props: Props) => {
  const { links } = useSelector((state: RootState) => state.link);
  const { image, username, theme, profile_title, bio } = useSelector(
    (state: RootState) => state.profile
  );
  const { products } = useSelector((state: RootState) => state.shop);
  return (
    <div
      className={`md:hidden fixed ${theme?.color} z-30 top-0 h-full w-full overflow-auto`}
    >
      <div className="h-full mx-auto w-full overflow-auto z-10 relative">
        {/* Profile Image */}
        <div className="flex items-center justify-center mt-10">
          <span className="relative flex shrink-0 overflow-hidden rounded-full size-20 cursor-pointer ">
            <img
              src={image ? image : "/unnamed.png"}
              className="h-full w-full object-cover"
              alt=""
            />
          </span>
        </div>
        {/* Username */}
        <div
          className={`text-center text-sm font-semibold mt-2 break-words ${theme?.text}`}
        >
          @{profile_title}
        </div>
        {/* Bio */}
        <div
          className={`text-center text-[8px] font-semibold mt-1 ${theme?.text}`}
        >
          <div className="px-8 break-words">{bio}</div>
        </div>

        {/* Tabs */}
        <div className="w-full flex items-center justify-center mt-2">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="flex justify-center w-fit mx-auto rounded-full mb-4">
              <TabsTrigger
                value="account"
                className={`
                      flex-1 px-4 py-2 text-center text-sm font-medium rounded-full transition-all duration-200 data-[state=active]:bg-[#8228D9] data-[state=active]:text-white data-[state=inactive]:text-gray-700`}
              >
                Links
              </TabsTrigger>
              <TabsTrigger
                value="password"
                className={
                  "flex-1 px-4 py-2 text-center text-sm font-medium rounded-full transition-all duration-200 data-[state=active]:bg-[#8228D9] data-[state=active]:text-white data-[state=inactive]:text-gray-700"
                }
              >
                Shop
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="">
              {/* Links */}
              <div className="w-full">
                {links.map((link: LinkType, index) => (
                  <React.Fragment key={index}>
                    <LinkCard
                      theme={theme}
                      index={index}
                      mobileView={true}
                      link={link}
                    />
                  </React.Fragment>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="password">
              <div className="w-full p-2">
                <div className="w-full">
                  <div className="grid grid-cols-2 gap-x-0.5">
                    {products.map((product: any, index: number) => (
                      <ProductCard
                        key={index}
                        theme={theme}
                        product={product}
                        mobileView={false}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Links */}

        {/* Extra padding for spacing */}
        <div className="pb-12"></div>
      </div>
      <div className="fixed bottom-16 w-full flex items-center justify-center z-50">
        <button className="md:hidden flex items-center text-[17px] rounded-full font-semibold px-2 py-2 bg-gray-400 gap-2">
          <X />
        </button>
      </div>
    </div>
  );
};

export default PreviewSection;
