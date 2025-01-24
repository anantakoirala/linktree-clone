"use client";
import { useLazyGetAllLinksQuery } from "@/redux/link/linkApi";
import { useLazyGetProfileQuery } from "@/redux/profile/profileApi";
import { useLazyGetSettingQuery } from "@/redux/setting/settingApi";
import { useLazyGetAllProductsQuery } from "@/redux/shop/shopApi";
import { useLazyGetAllSocialIconsQuery } from "@/redux/socialIcon/socialIconApi";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const [getAllLinks, { data: allLinks, isSuccess: getAllLinkSuccess }] =
    useLazyGetAllLinksQuery();

  const [getProfile] = useLazyGetProfileQuery();

  const [getAllProducts] = useLazyGetAllProductsQuery();

  const [getSetting] = useLazyGetSettingQuery();

  const [
    getAllSocialIcons,
    {
      isError: isGetAllIconsError,
      isLoading: isGetAllIconsLoading,
      isSuccess: isGetAllIconsSuccess,
    },
  ] = useLazyGetAllSocialIconsQuery();

  useEffect(() => {
    getProfile({});
  }, [getProfile]);

  useEffect(() => {
    getAllLinks({});
  }, [getAllLinks]);

  useEffect(() => {
    getAllProducts({});
  }, [getAllProducts]);

  useEffect(() => {
    getAllSocialIcons({});
  }, [getAllSocialIcons]);

  useEffect(() => {
    getSetting({});
  }, [getSetting]);

  useEffect(() => {
    if (isGetAllIconsSuccess) {
      console.log("Fetched social icons successfully!");
      // Add your success handling logic here
    }

    if (isGetAllIconsError) {
      console.error("Failed to fetch social icons!");
      // Add your error handling logic here
    }
  }, [isGetAllIconsSuccess, isGetAllIconsError]);

  return <div>{children}</div>;
};

export default Layout;
