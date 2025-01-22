import React, { useState } from "react";
import GetSocialIcons from "../GetSocialIcons";
import { socialIcons } from "@/lib/socialIcons";
import { SocialIcon } from "@/types/SocialIcon";
import { GoPencil } from "react-icons/go";
import { Switch } from "../ui/switch";
import { handleApiError } from "@/lib/handleApiError";
import { useChangeSocialIconStatusMutation } from "@/redux/socialIcon/socialIconApi";
import toast from "react-hot-toast";

type Props = {
  social_icon: {
    _id: string;
    name: string;

    publish: boolean;
  };
};

const SocialIconEditDisplayList = ({ social_icon }: Props) => {
  const [isPublished, setIsPublished] = useState(social_icon.publish);

  const [changeStatus] = useChangeSocialIconStatusMutation();

  //   Get display name
  const getDisplayName = (name: string) => {
    const displayName = socialIcons.find((icon) => icon.name === name);
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
  return (
    <div className="w-full h-16 bg-white flex flex-row p-2">
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
  );
};

export default SocialIconEditDisplayList;
