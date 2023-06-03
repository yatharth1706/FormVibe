"use client";
import NavigationBar from "@/components/NavigationBar";
import Sidebar from "@/components/Sidebar";
import { useFormVibeContext } from "@/contexts/FormVibeContextProvider";
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
    return <div>Loading...</div>;
  }

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
