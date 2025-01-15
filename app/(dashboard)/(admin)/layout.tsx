"use client";
import { useLazyGetAllLinksQuery } from "@/redux/link/linkApi";
import { useLazyGetProfileQuery } from "@/redux/profile/profileApi";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const [getAllLinks, { data: allLinks, isSuccess: getAllLinkSuccess }] =
    useLazyGetAllLinksQuery();

  const [getProfile] = useLazyGetProfileQuery(); // Renaming to avoid naming conflict

  useEffect(() => {
    getProfile({}); // Call the appropriate trigger here (you can pass the necessary params)
  }, [getProfile]); // Add getProfile to the dependency array

  useEffect(() => {
    getAllLinks({}); // Trigger all links on mount or as needed
  }, [getAllLinks]); // Add getAllLinks to the dependency array

  return <div>{children}</div>;
};

export default Layout;
