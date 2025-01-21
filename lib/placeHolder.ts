import { SocialMediaName } from "@/schema";

export type SocialIconPlaceHolders = {
  [key in SocialMediaName]: {
    placeholder: string;
    description: string;
  };
};
export const socialIconPlaceHolders: SocialIconPlaceHolders = {
  Facebook: {
    placeholder: "Enter Facebook Url*",
    description: "Example: https://facebook.com/facebookpageurl",
  },
  X: {
    placeholder: "Enter X(formerly twitter) handler",
    description: "Example: @yourxhandle",
  },
  Instagram: {
    placeholder: "Enter instagram username",
    description: "Example: @username",
  },
  YouTube: {
    placeholder: "Enter youtube url",
    description: "Example: https://youtube.com/channel/youtubechannelurl",
  },
  TikTok: {
    placeholder: "Enter tiktok username",
    description: "Example: @tiktokusername",
  },
  Github: {
    placeholder: "Enter github url",
    description: "Example: https://www.github.com/username",
  },
  Phone: {
    placeholder: "Enter phone number",
    description: "Example: +1234567890",
  },
  Threads: {
    placeholder: "Enter threads username",
    description: "Example: @threadsusername",
  },
  Email: {
    placeholder: "Enter email address",
    description: "Example: your@emailaddress.com",
  },
  Linkedin: {
    placeholder: "Enter linkedin url",
    description: "Example: https://linkedin.com/in/username",
  },
  Spotify: {
    placeholder: "Enter spotify url",
    description: "Example: https://open.spotify.com/artist/artistname",
  },
  PersonalWebsite: {
    placeholder: "Enter personal website url",
    description: "Example: https://www.yourwebsite.com",
  },
};
