"use client";
import React, { useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type Props = {};

const SocialIconPosition = (props: Props) => {
  const { socialIconPosition } = useSelector(
    (state: RootState) => state.socialIcon
  );
  const changeSocialIconPosition = (position: "Top" | "Bottom") => {
    console.log("posiitn", position);
  };
  useEffect(() => {
    console.log("social icon position", socialIconPosition);
  }, [socialIconPosition]);
  return (
    <RadioGroup
      defaultValue={socialIconPosition}
      className="mt-5"
      onValueChange={(value) =>
        changeSocialIconPosition(value as "Top" | "Bottom")
      }
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value={socialIconPosition}
          id="r1"
          className="w-6 h-6"
        />
        <Label htmlFor="r1" className="text-md ">
          Top
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="bottom" id="r2" className="w-6 h-6" />
        <Label htmlFor="r2" className="text-md ">
          Bottom
        </Label>
      </div>
    </RadioGroup>
  );
};

export default SocialIconPosition;
