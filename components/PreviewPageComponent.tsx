"use client";
import { User } from "@/types/User";
import React, { useEffect, useState } from "react";
import { Link as LinkType } from "@/types/Link";
import { Theme } from "@/types/Theme";
import { notFound, useParams } from "next/navigation";
import { restApi } from "@/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
} from "next-share";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import LinkCard from "./LinkCard";
import ProductCard from "./ProductCard";
import { Ellipsis } from "lucide-react";

type Props = {};

const PreviewPageComponent = (props: Props) => {
  const [fullUrl, setFullUrl] = useState<string>(
    "http://127.0.0.1:4040/ananta_koirala"
  );
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(true);
  const [shareImage, setShareImage] = useState<string>("");
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
          console.log("success", res.data.success);
          if (!res.data.success) {
            console.log("hello");
          }
          setUser(res.data.user);
          setLinks(res.data.links);
          setTheme(res.data.user.theme);

          setProducts(res.data.userProducts);
          setShareImage(res.data.shareImage);
          console.log("products", res.data.shareImage);
          setLoading(false);
        })
        .catch((error) => {
          console.log("error", error);
          notFound();
          setLoading(false);
        });
    };
    if (username) {
      fetchData(username as string);
    }
  }, [username]);

  useEffect(() => {
    const handleScroll = () => {
      // Set a threshold for when the icon should appear/disappear
      if (window.scrollY > 210) {
        // Change 100 to your preferred scroll value
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {loading || !user || !links.length || !theme ? (
        <div className="flex justify-center items-center w-full h-screen">
          <div className="loader">Loading Ananta...</div>{" "}
          {/* You can replace this with a spinner */}
        </div>
      ) : (
        <>
          <meta property="og:title" content={`@${user?.username} - Profile`} />
          <meta
            property="og:description"
            content="Check out this profile page where you can explore links, shop products, and more!"
          />
          <meta
            property="og:image"
            content={shareImage || "/default-image.png"} // Use a default image or one from your state
          />
          <meta property="og:url" content={window.location.href} />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="MyApp" />
          <div
            className={`w-full min-h-screen ${theme?.color}  bg-fixed font-poppins `}
          >
            <div className="relative w-full md:w-[80%] lg:w-[40%]  min-h-screen  md:mx-auto flex flex-col pt-16 items-center pb-28">
              {/* Profile image */}
              <span className="relative flex shrink-0 overflow-hidden rounded-full size-24 lg:size-28 hover:size-32 transitionall duration-300 cursor-pointer mt-2  ">
                <img
                  src={user?.image ? user?.image : "/unnamed.png"}
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
                        <LinkCard
                          key={index}
                          theme={theme}
                          index={index}
                          link={link}
                        />
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

              {/* Share icon */}

              <div
                className={`w-full md:w-[80%] lg:w-[40%] h-12 top-6 fixed flex items-center justify-end px-2 z-50 ${
                  isVisible ? "opacity-100" : "opacity-0"
                } transition-opacity duration-300`}
                onClick={() => setDialogOpen((prev) => !prev)}
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black bg-opacity-15">
                  <Ellipsis />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Share dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="w-full h-auto flex flex-col gap-2">
            <img src={shareImage} alt="" />
            <div className="w-full h-24 bg-gray-200 flex flex-row gap-2 items-center justify-between">
              <div className="w-20 h-20  rounded-full flex items-center justify-center">
                <FacebookShareButton
                  url={fullUrl} // Replace with the appropriate URL for sharing
                  hashtag="#myapp" // Optional hashtag to add
                >
                  <FacebookIcon size={64} round />{" "}
                  {/* Adjust the size to fit better */}
                </FacebookShareButton>
              </div>
              <div className="w-20 h-20  rounded-full flex items-center justify-center">
                <TwitterShareButton
                  url={fullUrl} // Replace with the appropriate URL for sharing
                >
                  <TwitterIcon size={64} round />{" "}
                  {/* Adjust the size to fit better */}
                </TwitterShareButton>
              </div>
              <div className="w-20 h-20  rounded-full flex items-center justify-center">
                <WhatsappShareButton
                  url={fullUrl} // Replace with the appropriate URL for sharing
                  title={user?.profile_title}
                  separator=":: "
                >
                  <WhatsappIcon size={64} round />{" "}
                  {/* Adjust the size to fit better */}
                </WhatsappShareButton>
              </div>
              <div className="w-20 h-20  rounded-full flex items-center justify-center">
                <LinkedinShareButton
                  url={fullUrl} // Replace with the appropriate URL for sharing
                  title={user?.profile_title}
                >
                  <LinkedinIcon size={64} round />{" "}
                  {/* Adjust the size to fit better */}
                </LinkedinShareButton>
              </div>
              <div className="w-20 h-20  rounded-full flex items-center justify-center">
                <FacebookMessengerShareButton
                  url={fullUrl} // Replace with the appropriate URL for sharing
                  title={user?.profile_title}
                  appId={""}
                >
                  <FacebookMessengerIcon size={64} round />{" "}
                  {/* Adjust the size to fit better */}
                </FacebookMessengerShareButton>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PreviewPageComponent;
