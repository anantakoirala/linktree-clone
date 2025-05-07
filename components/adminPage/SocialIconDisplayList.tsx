"use client";
import { RootState } from "@/redux/store";
import { SocialIcon } from "@/types/SocialIcon";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GetSocialIcons from "../GetSocialIcons";
import { useMediaQuery } from "@/app/hooks/user-media-query";
import { openSocialIconsModal } from "@/redux/link/linkSlice";

type Props = {};

const SocialIconDisplayList = (props: Props) => {
  const dispatch = useDispatch();
  const isLargeScreen = useMediaQuery("(min-width:640px)");
  const { socialIcons } = useSelector((state: RootState) => state.socialIcon);

  return (
    <div className="flex flex-row h-auto w-auto gap-0.5 lg:gap-1">
      {socialIcons.slice(0, 4).map((social_icon: SocialIcon, index) => (
        <div className="" key={index}>
          <GetSocialIcons
            name={social_icon.name}
            fill={social_icon.publish ? undefined : "#9ca3af"}
          />
        </div>
      ))}
      {socialIcons.length > 4 && (
        <div
          className="w-14 h-6  flex items-center cursor-pointer justify-center rounded-full border border-gray-300 text-xs "
          onClick={() => {
            dispatch(openSocialIconsModal());
          }}
        >
          {socialIcons.length - 4} more
        </div>
      )}
    </div>
  );
};

export default SocialIconDisplayList;
