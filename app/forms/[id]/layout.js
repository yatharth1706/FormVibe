"use client";
import FormBuilderSidebar from "@/components/FormBuilderSidebar";
import NavigationBar from "@/components/NavigationBar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function AccountsLayout({ children }) {
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
