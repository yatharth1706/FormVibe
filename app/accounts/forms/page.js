import FormActionCard from "@/components/FormActionCard";
import React from "react";

function MyForms() {
  return (
    <div className="flex flex-col px-12 py-8 gap-6">
      <p>No forms yet</p>
      <div className="flex gap-8">
        <FormActionCard
          title="Create from Scratch"
          description="Create form according to your choice by using our interactive drag and drop interface"
        />
        <FormActionCard
          title="Use Template"
          description="Choose from pre defined templates to use for your form"
        />
        <FormActionCard
          title="Use AI"
          description="Use our AI to tell your requirements and we will create form according to that"
        />
      </div>
    </div>
  );
}

export default MyForms;
