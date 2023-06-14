"use client";
import React from "react";
import FormvibeContextProvider from "./FormVibeContextProvider";

function FormVibeContextHOCWrapper({ children }) {
  return <FormvibeContextProvider>{children}</FormvibeContextProvider>;
}

export default FormVibeContextHOCWrapper;
