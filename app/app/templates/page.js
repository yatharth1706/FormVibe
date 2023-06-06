import FormTemplates from "@/components/FormTemplates";
import React from "react";

function TemplatesPage() {
  return (
    <div className="flex flex-col px-12 py-12 gap-6 w-full">
      <h1 className="font-bold">All Templates</h1>
      <p className="text-xs">Choose any template to create form</p>

      <FormTemplates />
    </div>
  );
}

export default TemplatesPage;
