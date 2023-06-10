"use client";
import NavigationBar from "@/src/components/NavigationBar";
import { useFormVibeContext } from "@/src/contexts/FormVibeContextProvider";
import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function AccountsLayout({ children }) {
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
      <DndProvider backend={HTML5Backend}>
        <div className="flex w-full h-screen">
          <div className="w-full h-full">{children}</div>
        </div>
      </DndProvider>
    </div>
  );
}
