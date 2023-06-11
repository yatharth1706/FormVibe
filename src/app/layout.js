"use client";

import "./globals.css";
import { Manrope } from "next/font/google";
import FormVibeContextProvider from "@/src/contexts/FormVibeContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const manrope = Manrope({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={manrope.className + " text-gray-800 text-sm bg-[#fdfdfd]"}
      >
        <FormVibeContextProvider>
          <main className="">{children}</main>
          <ToastContainer />
        </FormVibeContextProvider>
      </body>
    </html>
  );
}
