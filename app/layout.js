import "./globals.css";
import { Manrope } from "next/font/google";
import FormVibeContextProvider from "@/contexts/FormVibeContextProvider";

const manrope = Manrope({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <FormVibeContextProvider>
        <body className={manrope.className + " text-gray-800"}>{children}</body>
      </FormVibeContextProvider>
    </html>
  );
}
