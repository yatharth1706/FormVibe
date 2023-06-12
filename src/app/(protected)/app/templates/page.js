import FormTemplates from "@/src/components/FormTemplates";
import React from "react";

function TemplatesPage() {
  return (
    <div className="flex flex-col p-6 md:p-12 gap-3 w-full">
      <h1 className="font-bold">All Templates</h1>
      <p className="text-xs">Choose any template to create form</p>

      <FormTemplates />
    </div>
  );
}

export default TemplatesPage;
