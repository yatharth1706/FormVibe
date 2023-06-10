"use client";
import FormBuilderSidebar from "@/src/components/FormBuilderSidebar";
import NavigationBar from "@/src/components/NavigationBar";
import { useFormVibeContext } from "@/src/contexts/FormVibeContextProvider";
import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function AccountsLayout({ children }) {
  const { getLoggedInUser, isLoading } = useFormVibeContext();

  return (
    <div className="flex flex-col w-full">
      <NavigationBar />
      <DndProvider backend={HTML5Backend}>
        <div className="flex w-full h-screen">
          <FormBuilderSidebar />
          <div className="w-full h-full">{children}</div>
        </div>
      </DndProvider>
    </div>
  );
}
