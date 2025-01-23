import React, { Dispatch, SetStateAction, useState } from "react";
import GetSocialIcons from "../GetSocialIcons";
import { ListedSocialIcons } from "@/lib/socialIcons";
import { SocialIcon } from "@/types/SocialIcon";
import { GoPencil } from "react-icons/go";
import { Switch } from "../ui/switch";
import { handleApiError } from "@/lib/handleApiError";
import { useChangeSocialIconStatusMutation } from "@/redux/socialIcon/socialIconApi";
import toast from "react-hot-toast";
import EditSocialIconModal from "./EditSocialIconModal";
import { useDispatch } from "react-redux";
import { setEditSocialIconId } from "@/redux/socialIcon/socialIconSlice";

type Props = {
  social_icon: {
    _id: string;
    name: string;

    publish: boolean;
  };
  editModalOpen: boolean;
  setEditModalOpen: Dispatch<SetStateAction<boolean>>;
  setSocialIconsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const SocialIconEditDisplayList = ({
  social_icon,
  setEditModalOpen,
  editModalOpen,
  setSocialIconsModalOpen,
}: Props) => {
  const dispatch = useDispatch();
  const [isPublished, setIsPublished] = useState(social_icon.publish);

  const [changeStatus] = useChangeSocialIconStatusMutation();

  //   Get display name
  const getDisplayName = (name: string) => {
    const displayName = ListedSocialIcons.find((icon) => icon.name === name);
    return displayName
      ? displayName.displayName || displayName.name
      : "Unknown";
  };

  const handlePublishToggle = async (id: string) => {
    try {
      const newPublishState = !isPublished;
      setIsPublished(newPublishState);
      const response = await changeStatus({
        id: id,
        publish: newPublishState,
      }).unwrap();
      toast.success(response.message);
    } catch (error) {
      handleApiError(error);
    }
  };

  const opendEditModal = (id: string) => {
    dispatch(setEditSocialIconId(id));
    setSocialIconsModalOpen(false);
    setEditModalOpen(true);
  };

  return (
    <>
      <div
        className="w-full h-16 bg-white flex flex-row p-2 cursor-pointer hover:bg-gray-100 transition-all duration-75"
        onClick={() => opendEditModal(social_icon._id)}
      >
        {/* Icon and name */}
        <div className="w-[50%] h-full  flex flex-row items-center gap-6">
          <div className="">
            <GetSocialIcons name={social_icon.name} />
          </div>
          <div className="">{getDisplayName(social_icon.name)}</div>
        </div>
        {/* Edit and switch button */}
        <div className="w-[50%] h-full  flex flex-row items-center justify-end gap-4">
          <div className="">
            <GoPencil />
          </div>
          <div className="">
            <div className="flex items-center space-x-2">
              <Switch
                id="airplane-mode"
                onClick={(e) => e.stopPropagation()}
                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                checked={isPublished} // Controlled state
                onCheckedChange={(e) => {
                  handlePublishToggle(social_icon._id);
                }} // Handle toggle
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialIconEditDisplayList;
