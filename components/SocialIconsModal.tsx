"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ChevronLeft,
  ChevronRight,
  ChevronRightCircle,
  Plus,
  X,
} from "lucide-react";
import { socialIcons } from "@/lib/socialIcons";
import { SocialIcon } from "@/types/SocialIcon";
import GetSocialIcons from "./GetSocialIcons";
import SocialIconForm from "./SocialIconForm";

type Props = {
  socialIconsModalOpen: boolean;
  setSocialIconsModalOpen: React.SetStateAction<any>;
};

const SocialIconsModal = ({
  socialIconsModalOpen,
  setSocialIconsModalOpen,
}: Props) => {
  const [clickedAddIconButton, setClickedAddIconButton] =
    useState<boolean>(false);

  const [clickedSocialMediaId, setClickedSocialMediaId] = useState<number>(0);
  const [iconsSlectionViewOnDisplay, setIconsSelectionViewOnDisplay] =
    useState<boolean>(false);

  const closeModal = () => {
    setSocialIconsModalOpen(false);
    setClickedSocialMediaId(0);
    setClickedAddIconButton(false);
  };

  const backButton = () => {
    if (clickedSocialMediaId !== 0) {
      setClickedAddIconButton(false);
      setClickedSocialMediaId(0);
    } else {
      setClickedAddIconButton(false);
      setClickedSocialMediaId(0);
    }
  };

  const addButtonClicked = () => {
    setClickedAddIconButton(true);
    setIconsSelectionViewOnDisplay(true);
  };

  useEffect(() => {
    console.log("clickedAddIconButton", clickedAddIconButton);
    console.log("clickedSocialMediaId", clickedSocialMediaId);
  }, [clickedAddIconButton, clickedSocialMediaId]);
  return (
    <Dialog open={socialIconsModalOpen} onOpenChange={setSocialIconsModalOpen}>
      <DialogContent
        className="[&>button]:hidden"
        onEscapeKeyDown={(event) => event.preventDefault()}
        onPointerDownOutside={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <div className="flex  items-center w-full justify-between">
            {/* Back button */}
            {(clickedSocialMediaId > 0 || clickedAddIconButton) && (
              <button
                onClick={backButton} // Set to 0 or null to go back
                className=""
              >
                <ChevronLeft />
              </button>
            )}
            <DialogTitle className="">Social Icons</DialogTitle>
            <X onClick={() => closeModal()} />
          </div>
          <DialogDescription
            className={`flex flex-col ${clickedAddIconButton ? "hidden" : ""}`}
          >
            <span className="font-bold text-black text-[18px]">
              Show visitors where to find you
            </span>
            <span>
              Add your social profiles, email and more as linked icons on your
              Linktree.
            </span>
          </DialogDescription>
        </DialogHeader>
        {clickedSocialMediaId > 0 ? (
          <>
            <SocialIconForm id={clickedSocialMediaId} />
          </>
        ) : (
          <>
            {iconsSlectionViewOnDisplay ? (
              <>
                <div className="w-full h-auto">
                  <div className="w-full max-h-96 overflow-y-auto ">
                    {socialIcons.map(
                      (social_icon: SocialIcon, index: number) => (
                        <div
                          className="w-full h-16 cursor-pointer  flex flex-row items-center justify-between px-2 hover:bg-gray-100 rounded-sm"
                          key={index}
                          onClick={() =>
                            setClickedSocialMediaId(social_icon.id)
                          }
                        >
                          <div className="w-[60%] h-full  flex items-center">
                            <span className="inline-flex items-center gap-5">
                              <GetSocialIcons name={social_icon.name} />
                              <span className="text-lg font-semibold">
                                {social_icon.displayName}
                              </span>
                            </span>
                          </div>
                          <div className="w-[40%] h-full   flex items-center justify-end">
                            <ChevronRight />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-full h-auto ">
                  {/* scrollable container */}
                  <div className="w-full max-h-96 overflow-y-auto bg-orange-800">
                    <div className="w-full h-16 bg-red-100"></div>
                    <div className="w-full h-16 bg-green-200"></div>
                    <div className="w-full h-16 bg-blue-200"></div>
                    {/* Add more content here to make it scrollable */}
                  </div>
                  <div className="w-full h-auto flex flex-col mt-5">
                    <div className="flex flex-col items-start">
                      <span className="font-bold text-black text-[18px]">
                        Show visitors where to find you
                      </span>
                      <span className="text-sm leading-[1.25rem] text-muted-foreground">
                        Display icons at the top or bottom of your profile
                      </span>
                      {/* Radio */}
                      <RadioGroup defaultValue="top" className="mt-5">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="top"
                            id="r1"
                            className="w-6 h-6"
                          />
                          <Label htmlFor="r1" className="text-md ">
                            Top
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="bottom"
                            id="r2"
                            className="w-6 h-6"
                          />
                          <Label htmlFor="r2" className="text-md ">
                            Bottom
                          </Label>
                        </div>
                      </RadioGroup>

                      <button
                        className="w-full mt-5 rounded-full h-12 bg-[#8228D9] hover:bg-[#6c21b3] text-white flex text-[17px] font-semibold items-center justify-center flex-row"
                        onClick={addButtonClicked}
                      >
                        <Plus size={25} className="mr-0.5 font-thin" />
                        <span> Add social icon</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SocialIconsModal;
