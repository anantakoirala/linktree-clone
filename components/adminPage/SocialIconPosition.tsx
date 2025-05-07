"use client";
import React, { useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useUpdateSettingMutation } from "@/redux/setting/settingApi";
import { handleApiError } from "@/lib/handleApiError";
import { setIconPosition } from "@/redux/setting/settingSlice";

type Props = {};

const SocialIconPosition = (props: Props) => {
  const dispatch = useDispatch();
  const { social_icon_position } = useSelector(
    (state: RootState) => state.setting
  );
  const [updateSetting, { isError, isLoading, isSuccess }] =
    useUpdateSettingMutation();

  const changeSocialIconPosition = async (position: "Top" | "Bottom") => {
    try {
      updateSetting({
        social_icon_position: position,
      })
        .then((res) => {
          console.log("res", res);
          dispatch(setIconPosition(position));
        })
        .catch((err) => console.log(err));
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <RadioGroup
      defaultValue={social_icon_position}
      className="mt-5"
      onValueChange={(value) =>
        changeSocialIconPosition(value as "Top" | "Bottom")
      }
      disabled={isLoading}
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="Top" id="r1" className="w-5 h-5" />
        <Label htmlFor="r1" className="text-md ">
          Top
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="Bottom" id="r2" className="w-5 h-5" />
        <Label htmlFor="r2" className="text-md ">
          Bottom
        </Label>
      </div>
    </RadioGroup>
  );
};

export default SocialIconPosition;
