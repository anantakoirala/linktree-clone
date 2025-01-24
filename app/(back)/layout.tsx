"use client";
import AuthProvider from "@/contextprovider/AuthProvider";
import { store } from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default layout;
