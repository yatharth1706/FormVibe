import "./globals.css";
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata = {
  title: "FormVibe",
  description: "Interactive Form Creation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={manrope.className + " text-gray-800"}>{children}</body>
    </html>
  );
}
