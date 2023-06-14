import "./globals.css";
import { Manrope } from "next/font/google";
import FormVibeContextProvider from "@/src/contexts/FormVibeContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const manrope = Manrope({ subsets: ["latin"] });

export const metadata = {
  title: "FormVibe",
  description:
    "FormVibe - Create Forms With Ease. Built in drag and drop functionality to create forms with ease and share with a unqiue sharable link",
  authors: [
    { name: "Yatharth" },
    { name: "Yatharth", url: "https://yatharthverma.dev" },
  ],
  keywords: ["FormVibe", "Create Forms", "Interactive forms", "formvibe"],
  creator: "Yatharth Verma",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
  openGraph: {
    title: "FormVibe",
    description:
      "FormVibe - Create Forms With Ease. Built in drag and drop functionality to create forms with ease and share with a unqiue sharable link",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "FormVibe",
    images: "assets/OgImage.png",
  },
  icons: {
    icon: "assets/Icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={manrope.className + " text-gray-800 text-sm bg-[#fdfdfd]"}
      >
        <FormVibeContextProvider>
          <main>{children}</main>
          <ToastContainer />
        </FormVibeContextProvider>
      </body>
    </html>
  );
}
