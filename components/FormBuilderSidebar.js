import React from "react";
import FormElementsContainer from "./FormElementsContainer";

function FormBuilderSidebar() {
  return (
    <div className="w-2/12 border-r border-zinc-300 flex flex-col gap-5 h-screen">
      <div className="flex items-center px-9 py-7 h-8 w-full border-b border-zinc-300">
        <h1 className="font-medium">Form Elements</h1>
      </div>
      <FormElementsContainer />
    </div>
  );
}

export default FormBuilderSidebar;
