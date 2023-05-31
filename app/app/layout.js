"use client";
import NavigationBar from "@/components/NavigationBar";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";

export default function AccountsLayout({ children }) {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="flex flex-col w-full">
      <NavigationBar />
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
