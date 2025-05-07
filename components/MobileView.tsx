import { RootState } from "@/redux/store";
import { Link as LinkType } from "@/types/Link";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import LinkCard from "./LinkCard";
import ProductCard from "./ProductCard";
import { Product } from "@/types/Product";
import { SocialIcon } from "@/types/SocialIcon";
import GetSocialIcons from "./GetSocialIcons";

type Props = {};

const MobileView = (props: Props) => {
  const { links } = useSelector((state: RootState) => state.link);

  const [publishableProducts, setPublishableProducts] = useState<Product[]>([]);
  const { image, username, theme, profile_title, bio } = useSelector(
    (state: RootState) => state.profile
  );
  const { products } = useSelector((state: RootState) => state.shop);
  const { social_icon_position } = useSelector(
    (state: RootState) => state.setting
  );

  const { socialIcons } = useSelector((state: RootState) => state.socialIcon);

  useEffect(() => {
    if (products) {
      const publishableProducts = products.filter(
        (product) => product.publish === true
      );
      if (publishableProducts) {
        setPublishableProducts(publishableProducts);
      }
    }
  }, [products]);

  return (
    <>
      {/* flowbite mockup */}
      <div className="mt-10 relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
        <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
        <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
        <div
          className={`rounded-[2rem] overflow-hidden w-[272px] h-[572px] ${theme?.color} dark:bg-gray-800 relative`}
        >
          {/* Background Image */}
          {/* <img
            src="/background-mobile-hires.png"
            className="dark:hidden w-[272px] h-[572px] absolute z-0"
            alt=""
          /> */}

          {/* Content Container */}
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
            {social_icon_position === "Top" && (
              <div className="w-[80%] m-auto h-auto flex flex-row flex-wrap gap-0.5 items-center justify-center mt-1.5 ">
                {socialIcons &&
                  socialIcons
                    .filter(
                      (social_icon: SocialIcon) => social_icon.publish === true
                    ) // Filter for published social icons
                    .map((social_icon: SocialIcon, index: number) => (
                      <div key={index}>
                        <GetSocialIcons
                          name={social_icon.name}
                          fill={theme.fill}
                        />
                      </div>
                    ))}
              </div>
            )}

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
                        {publishableProducts.map(
                          (product: any, index: number) => (
                            <ProductCard
                              key={index}
                              theme={theme}
                              product={product}
                              mobileView={true}
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Social Icons */}
            {social_icon_position === "Bottom" && (
              <div className="w-[80%] m-auto h-auto flex flex-row flex-wrap gap-0.5 items-center justify-center mt-1.5 ">
                {socialIcons &&
                  socialIcons
                    .filter(
                      (social_icon: SocialIcon) => social_icon.publish === true
                    ) // Filter for published social icons
                    .map((social_icon: SocialIcon, index: number) => (
                      <div key={index}>
                        <GetSocialIcons
                          name={social_icon.name}
                          fill={theme.fill}
                        />
                      </div>
                    ))}
              </div>
            )}

            {/* Extra padding for spacing */}
            <div className="pb-12"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileView;
