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
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { SocialIcon } from "@/types/SocialIcon";
import GetSocialIcons from "./GetSocialIcons";
import SocialIconForm from "./SocialIconForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SocialIconEditDisplayList from "./adminPage/SocialIconEditDisplayList";
import { ListedSocialIcons } from "@/lib/socialIcons";
import {
  setClickedAddIconButton,
  setClickedSocialMediaId,
  setIconsSelectionViewOnDisplay,
} from "@/redux/socialIcon/socialIconSlice";
import EditSocialIconModal from "./adminPage/EditSocialIconModal";
import SocialIconPosition from "./adminPage/SocialIconPosition";
import { closeSocialIconsModal } from "@/redux/link/linkSlice";

type Props = {
  setSocialIconsModalOpen: React.SetStateAction<any>;
};

const SocialIconsModal = ({ setSocialIconsModalOpen }: Props) => {
  const dispatch = useDispatch();
  const [remainingIcons, setRemainingIcons] = useState<SocialIcon[]>([]);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const { socialIconsModalOpen } = useSelector(
    (state: RootState) => state.link
  );
  const {
    socialIcons,
    clickedAddIconButton,
    clickedSocialMediaId,
    iconsSlectionViewOnDisplay,
  } = useSelector((state: RootState) => state.socialIcon);

  const closeModal = () => {
    dispatch(closeSocialIconsModal());
    dispatch(setClickedSocialMediaId(0));
    dispatch(setClickedAddIconButton(false));
    dispatch(setIconsSelectionViewOnDisplay(false));
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
    dispatch(setClickedAddIconButton(true));
    dispatch(setIconsSelectionViewOnDisplay(true));
  };

  useEffect(() => {
    const remainingIcons = ListedSocialIcons.filter(
      (icon) => !socialIcons.some((social) => social.name === icon.name)
    );

    setRemainingIcons(remainingIcons);
  }, [socialIcons, ListedSocialIcons]);

  return (
    <>
      <Dialog open={socialIconsModalOpen}>
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
              className={`flex flex-col ${
                clickedAddIconButton ? "hidden" : ""
              }`}
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
              <SocialIconForm
                id={clickedSocialMediaId}
                socialIconsModalOpen={socialIconsModalOpen}
                setSocialIconsModalOpen={setSocialIconsModalOpen}
              />
            </>
          ) : (
            <>
              {iconsSlectionViewOnDisplay ? (
                <>
                  <div className="w-full h-auto">
                    <div className="w-full max-h-96 overflow-y-auto ">
                      {remainingIcons.map(
                        (social_icon: SocialIcon, index: number) => (
                          <div
                            className="w-full h-16 cursor-pointer  flex flex-row items-center justify-between px-2 hover:bg-gray-100 rounded-sm"
                            key={index}
                            onClick={() =>
                              dispatch(setClickedSocialMediaId(social_icon._id))
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
                    <div className="w-full max-h-96 md:max-h-72 overflow-y-auto ">
                      {socialIcons.map((social_icon: any, index: number) => (
                        <React.Fragment key={index}>
                          <SocialIconEditDisplayList
                            social_icon={social_icon}
                            editModalOpen={editModalOpen}
                            setEditModalOpen={setEditModalOpen}
                            setSocialIconsModalOpen={setSocialIconsModalOpen}
                          />
                        </React.Fragment>
                      ))}
                    </div>
                    <div className="w-full h-auto flex flex-col mt-5">
                      <div className="flex flex-col items-start">
                        <span className="font-bold text-black text-[18px]">
                          Social icon position
                        </span>
                        <span className="text-sm leading-[1.25rem] text-muted-foreground">
                          Display icons at the top or bottom of your profile
                        </span>
                        {/* Radio */}
                        <div className="mt-4">
                          <SocialIconPosition />
                        </div>

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
      <EditSocialIconModal
        editModalOpen={editModalOpen}
        setEditModalOpen={setEditModalOpen}
      />
    </>
  );
};

export default SocialIconsModal;
