"use client";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import TemplatesModal from "./TemplatesModal";
import FormActionCard from "./FormActionCard";
import { useState } from "react";
import { useFormVibeContext } from "../contexts/FormVibeContextProvider";

export default function CreateFormDialog() {
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const { createForm } = useFormVibeContext();

  const handleCreateForm = async () => {
    let user =
      (typeof window !== undefined &&
        window.localStorage.getItem("FormVibeUser")) ??
      "{}";
    let userInfo = JSON.parse(user);

    const res = await createForm(userInfo?.$id);
    console.log(res);
    router.push("/forms/" + res?.form_id);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <span className="btn-primary">Create Form</span>
      </DialogTrigger>
      <DialogContent
        className="bg-white overflow-y-auto"
        style={{ maxWidth: "fit-content", overflow: "auto" }}
      >
        <div className="flex flex-col md:flex-row gap-8 w-full p-6 overflow-auto h-auto">
          <FormActionCard
            title="Create from Scratch"
            description="Create form according to your choice by using our interactive drag and drop interface"
            onClick={handleCreateForm}
          />
          <FormActionCard
            title="Use Template"
            description="Choose from pre defined templates to use for your form"
            onClick={() => setIsTemplatesModalOpen(true)}
          />
          <TemplatesModal
            isTemplatesModalOpen={isTemplatesModalOpen}
            setIsTemplatesModalOpen={setIsTemplatesModalOpen}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
