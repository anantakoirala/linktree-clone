import { IconType } from "react-icons";
export type SocialIcon = {
  _id: number;
  name: string;
  displayName: string;
  icon?: IconType;
  value?: string;
  publish?: boolean;
};
