"use client";
import FormActionCard from "@/components/FormActionCard";
import FormTable from "@/components/FormTable";
import { useFormVibeContext } from "@/contexts/FormVibeContextProvider";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { useEffect, useState } from "react";

function MyForms() {
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { retrieveForms, createForm } = useFormVibeContext();

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      let user =
        (typeof window !== undefined &&
          window.localStorage.getItem("FormVibeUser")) ??
        "{}";
      let userInfo = JSON.parse(user);

      setIsLoading(true);
      const result = await retrieveForms(userInfo?.$id);
      console.log(result);
      setForms(result?.documents);
    } catch (err) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

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
    <div className="flex flex-col px-12 py-8 gap-6 w-full">
      <div className="flex gap-5 justify-between w-full">
        <h4 className="font-bold">All Forms</h4>
        <Dialog>
          <DialogTrigger>
            <span className="btn-primary">Create Form</span>
          </DialogTrigger>
          <DialogContent
            className="bg-white"
            style={{ maxWidth: "fit-content" }}
          >
            <div className="flex gap-8 w-full p-6">
              <FormActionCard
                title="Create from Scratch"
                description="Create form according to your choice by using our interactive drag and drop interface"
                onClick={handleCreateForm}
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
          </DialogContent>
        </Dialog>
      </div>

      {isLoading && <p>Loading...</p>}
      {!isLoading && forms?.length === 0 && <p>No forms yet</p>}
      {forms?.length > 0 && (
        <div>
          <FormTable forms={forms} />
        </div>
      )}
    </div>
  );
}

export default MyForms;
