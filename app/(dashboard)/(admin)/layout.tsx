"use client";
import { useLazyGetAllLinksQuery } from "@/redux/link/linkApi";
import { useLazyGetProfileQuery } from "@/redux/profile/profileApi";
import { useLazyGetAllProductsQuery } from "@/redux/shop/shopApi";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const [getAllLinks, { data: allLinks, isSuccess: getAllLinkSuccess }] =
    useLazyGetAllLinksQuery();

  const [getProfile] = useLazyGetProfileQuery();

  const [getAllProducts] = useLazyGetAllProductsQuery();

  useEffect(() => {
    getProfile({});
  }, [getProfile]);

  useEffect(() => {
    getAllLinks({});
  }, [getAllLinks]);

  useEffect(() => {
    getAllProducts({});
  }, [getAllProducts]);

  return <div>{children}</div>;
};

export default Layout;
