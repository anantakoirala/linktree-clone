import { themes } from "@/lib/themes";
import { useUpdateUserProfileMutation } from "@/redux/profile/profileApi";
import { RootState } from "@/redux/store";
import { Theme } from "@/types/Theme";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {};

const ThemeSection = (props: Props) => {
  const [selectedThemeId, setSelectedThemeId] = useState<number>();
  const [
    updateTheme,
    { isError: isUpdateThemeError, isLoading: isUpdateThemeLoading },
  ] = useUpdateUserProfileMutation();

  // Update theme in database
  const updateSelectedTheme = (id: number) => {
    const foundTheme = themes.find((theme) => theme.id === id);
    updateTheme({
      field: "theme",
      value: foundTheme,
    });
  };

  const { theme: stateTheme } = useSelector(
    (state: RootState) => state.profile
  );

  useEffect(() => {
    if (stateTheme) {
      setSelectedThemeId(stateTheme.id);
    }
  }, [stateTheme]);

  return (
    <>
      {themes.map((theme: Theme, index) => (
        <React.Fragment key={index}>
          <div onClick={() => updateSelectedTheme(theme.id)}>
            <div
              className={`border-2 border-gray-500 rounded-lg aspect-[2/3] border-dashed cursor-pointer transition-all duration-150 ease-in ${
                selectedThemeId === theme.id ? "p-2" : ""
              }`}
            >
              <div
                className={`w-full h-full  flex flex-col items-center gap-3 ${theme.color}`}
              >
                <div className="w-12 h-12 mt-3 bg-[#EFF0EA] bg-opacity-70 rounded-full"></div>
                <div className="relative w-[calc(100%-20px)] h-6">
                  <div
                    className={`w-full h-full ${theme.boxColor} absolute z-20 ${theme.linkStyle}`}
                  ></div>
                  {theme.embosedBox && (
                    <div
                      className={`w-full h-full ${theme.embosedBoxColor} absolute top-0.5 left-0.5 z-10 ${theme.linkStyle}`}
                    ></div>
                  )}
                </div>
                <div className="relative w-[calc(100%-20px)] h-6">
                  <div
                    className={`w-full h-full ${theme.boxColor} absolute z-20 ${theme.linkStyle}`}
                  ></div>
                  {theme.embosedBox && (
                    <div
                      className={`w-full h-full ${theme.embosedBoxColor} absolute top-0.5 left-0.5 z-10 ${theme.linkStyle}`}
                    ></div>
                  )}
                </div>
                <div className="relative w-[calc(100%-20px)] h-6">
                  <div
                    className={`w-full h-full ${theme.boxColor} absolute z-20 ${theme.linkStyle}`}
                  ></div>
                  {theme.embosedBox && (
                    <div
                      className={`w-full h-full ${theme.embosedBoxColor} absolute top-0.5 left-0.5 z-10 ${theme.linkStyle}`}
                    ></div>
                  )}
                </div>
              </div>
              {/* <div className="relative rounded-xl h-full mx-auto">
                            <div
                              className={`absolute left-0 top-0 h-full w-full z-0 ${color.color}`}
                            >
                              <div className="relative z-10 pt-9">
                                <div className="rounded-full mx-auto w-12 h-12 bg-[#EFF0EA] bg-opacity-70"></div>
                              </div>
                              <div
                                className={`w-[calc(100%-20px)] bg-[#EFF0EA] h-6 ${color.linkStyle} mx-auto mt-1`}
                              ></div>
                              <div
                                className={`w-[calc(100%-20px)] bg-[#EFF0EA] h-6 ${color.linkStyle} mx-auto mt-1`}
                              ></div>
                              <div
                                className={`w-[calc(100%-20px)] bg-[#EFF0EA] h-6 ${color.linkStyle} mx-auto mt-1`}
                              ></div>
                            </div>
                          </div> */}
            </div>
            <div className="text-center">{theme.name}</div>
          </div>
        </React.Fragment>
      ))}
    </>
  );
};

export default ThemeSection;
