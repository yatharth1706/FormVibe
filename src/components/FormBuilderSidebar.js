import React from "react";
import FormElementsContainer from "./FormElementsContainer";

function FormBuilderSidebar() {
  return (
    <div className="w-2/12 border-r border-zinc-300 flex flex-col gap-2 h-full">
      <FormElementsContainer />
    </div>
  );
}

export default FormBuilderSidebar;
