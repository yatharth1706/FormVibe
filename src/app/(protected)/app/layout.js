"use client";
import NavigationBar from "@/src/components/NavigationBar";
import Sidebar from "@/src/components/Sidebar";
import { useFormVibeContext } from "@/src/contexts/FormVibeContextProvider";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AccountsLayout({ children }) {
  const pathname = usePathname();
  console.log(pathname);

  const { getLoggedInUser, isLoading } = useFormVibeContext();

  useEffect(() => {
    getLoggedInUser();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 h-screen w-full justify-center items-center">
        <img src="/assets/Icon.png" alt="Logo" className="animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <NavigationBar />
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-1 w-8/12">{children}</div>
      </div>
    </div>
  );
}
