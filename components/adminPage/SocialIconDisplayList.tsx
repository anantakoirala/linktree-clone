"use client";
import { RootState } from "@/redux/store";
import { SocialIcon } from "@/types/SocialIcon";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import GetSocialIcons from "../GetSocialIcons";

type Props = {};

const SocialIconDisplayList = (props: Props) => {
  const { socialIcons } = useSelector((state: RootState) => state.socialIcon);

  return (
    <div className="flex flex-row h-auto w-auto">
      {socialIcons.slice(0, 4).map((social_icon: SocialIcon, index) => (
        <div className="" key={index}>
          <GetSocialIcons name={social_icon.name} />
        </div>
      ))}
    </div>
  );
};

export default SocialIconDisplayList;
