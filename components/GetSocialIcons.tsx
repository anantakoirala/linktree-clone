import React from "react";
import Instagram from "./svgIcons/Instagram";
import TikTok from "./svgIcons/TikTok";
import X from "./svgIcons/X";
import YouTube from "./svgIcons/YouTube";
import Facebook from "./svgIcons/Facebook";
import Github from "./svgIcons/Github";
import LinkedIn from "./svgIcons/LinkedIn";
import Threads from "./svgIcons/Threads";
import Email from "./svgIcons/Email";
import Phone from "./svgIcons/Phone";
import Spotify from "./svgIcons/Spotify";
import PersonalWebsite from "./svgIcons/PersonalWebsite";

type Props = {
  name: string;
  fill?: string;
};

const GetSocialIcons = ({ name, fill }: Props) => {
  if (name === "Instagram") {
    return <Instagram fill={fill} />;
  } else if (name === "TikTok") {
    return <TikTok fill={fill} />;
  } else if (name === "X") {
    return <X fill={fill} />;
  } else if (name === "YouTube") {
    return <YouTube fill={fill} />;
  } else if (name === "Facebook") {
    return <Facebook fill={fill} />;
  } else if (name === "Github") {
    return <Github fill={fill} />;
  } else if (name === "Linkedin") {
    return <LinkedIn fill={fill} />;
  } else if (name === "Threads") {
    return <Threads fill={fill} />;
  } else if (name === "Email") {
    return <Email fill={fill} />;
  } else if (name === "Phone") {
    return <Phone fill={fill} />;
  } else if (name === "Spotify") {
    return <Spotify fill={fill} />;
  } else if (name === "PersonalWebsite") {
    return <PersonalWebsite fill={fill} />;
  } else {
    return <div>notfound</div>;
  }
};

export default GetSocialIcons;
