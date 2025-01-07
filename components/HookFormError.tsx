import React from "react";
import { FieldError, FieldErrors } from "react-hook-form";

type Props = {
  message?: string;
};

const HookFormError = ({ message }: Props) => {
  if (!message) return null;
  return <span className="text-red-500 text-xs">{message}</span>;
};

export default HookFormError;
