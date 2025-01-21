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
};

const GetSocialIcons = ({ name }: Props) => {
  if (name === "Instagram") {
    return <Instagram />;
  } else if (name === "TikTok") {
    return <TikTok />;
  } else if (name === "X") {
    return <X />;
  } else if (name === "YouTube") {
    return <YouTube />;
  } else if (name === "Facebook") {
    return <Facebook />;
  } else if (name === "Github") {
    return <Github />;
  } else if (name === "Linkedin") {
    return <LinkedIn />;
  } else if (name === "Threads") {
    return <Threads />;
  } else if (name === "Email") {
    return <Email />;
  } else if (name === "Phone") {
    return <Phone />;
  } else if (name === "Spotify") {
    return <Spotify />;
  } else if (name === "PersonalWebsite") {
    return <PersonalWebsite />;
  } else {
    return <div>notfound</div>;
  }
};

export default GetSocialIcons;
