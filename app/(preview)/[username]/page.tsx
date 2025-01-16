"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { restApi } from "@/api";
import { User } from "@/types/User";
import { Link as LinkType } from "@/types/Link";
import { Theme } from "@/types/Theme";

import ProductCard from "@/components/ProductCard";
import LinkCard from "@/components/LinkCard";

type Props = {};

const Page = (props: Props) => {
  const [user, setUser] = useState<User>();
  const [links, setLinks] = useState<LinkType[]>([]);
  const [theme, setTheme] = useState<Theme>();
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { username } = useParams();

  useEffect(() => {
    const fetchData = async (username: string) => {
      setLoading(true);
      await restApi
        .get(`/api/v1/profile/preview-detail/${username}`)
        .then((res) => {
          setUser(res.data.user);
          setLinks(res.data.links);
          setTheme(res.data.user.theme);
          console.log("products", res.data.user.theme);
          setProducts(res.data.userProducts);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };
    if (username) {
      fetchData(username as string);
    }
  }, [username]);
  return (
    <>
      {loading || !user || !links.length || !theme ? (
        <div className="flex justify-center items-center w-full h-screen">
          <div className="loader">Loading...</div>{" "}
          {/* You can replace this with a spinner */}
        </div>
      ) : (
        <>
          <div
            className={`w-full min-h-screen ${theme?.color}  bg-fixed font-poppins `}
          >
            <div className="w-full md:w-[80%] lg:w-[40%] min-h-screen  md:mx-auto flex flex-col pt-16 items-center pb-28">
              {/* Profile image */}
              <span className="relative flex shrink-0 overflow-hidden rounded-full size-24 lg:size-28 hover:size-32 transitionall duration-300 cursor-pointer mt-2  ">
                <img
                  src={user?.image}
                  className="h-full w-full object-cover"
                  alt=""
                />
              </span>
              {/* Username */}
              <div
                className="mx-3 flex max-w-full items-center mt-2"
                id="profile-title"
              >
                <h1
                  className={`text-ellipsis text-wrap text-center text-[20px] lg:text-[25px] font-bold tracking-wide leading-[1.5] break-words ${theme.text}`}
                  style={{ wordBreak: "break-word", letterSpacing: "-0.4px" }}
                >
                  @{user?.username}
                </h1>
              </div>
              {/* Bio */}
              <h2
                className={` px-12 lg:px-8 break-words leading-[1.2] tracking-wide text-[13px] lg:text-[17px] text-center mt-1 font-light font-poppins ${theme.text}`}
                style={{ wordBreak: "break-word" }}
              >
                Lorem ipsum dolor sit, amet consectetur Lorem ipsum dolor sit,
                amet
              </h2>
              {/* Tabs */}
              <div className="w-full flex items-center justify-center mt-6">
                <Tabs defaultValue="account" className="w-full">
                  <TabsList
                    className={`flex justify-center w-fit mx-auto  h-10 lg:h-16 bg-[#81b622] bg-opacity-70 rounded-full mb-4`}
                  >
                    <TabsTrigger
                      value="account"
                      className={cn(
                        "flex-1 px-3 lg:px-8  py-2 lg:py-[17px] text-center text-[17px] lg:text-[20px] font-[100] rounded-full transition-all duration-200",
                        "data-[state=active]:bg-[#8228D9] data-[state=active]:text-white ",
                        "data-[state=inactive]:text-white font-semibold "
                      )}
                    >
                      Links
                    </TabsTrigger>
                    <TabsTrigger
                      value="password"
                      className={cn(
                        "flex-1 px-3 lg:px-8 py-2 lg:py-[17px] text-center text-[17px] lg:text-[20px] font-[100] rounded-full transition-all duration-200",
                        "data-[state=active]:bg-[#8228D9] data-[state=active]:text-white",
                        "data-[state=inactive]:text-white font-semibold "
                      )}
                    >
                      Shop
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="account" className="mt-10 px-2">
                    {/* Links */}
                    <div className="w-full">
                      {links.map((link: LinkType, index) => (
                        <LinkCard key={index} theme={theme} index={index} />
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="password" className="mt-10">
                    <div className="w-full">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                        {products.map((product: any, index: number) => (
                          <ProductCard
                            key={index}
                            theme={theme}
                            product={product}
                          />
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Page;
