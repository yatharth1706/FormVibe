"use client";
import { useFormVibeContext } from "@/src/contexts/FormVibeContextProvider";
import { AppWindow, Book } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import Loading from "./Loading";

function FormTemplates() {
  const { createForm, isLoading } = useFormVibeContext();
  const router = useRouter();

  const jobAppFormEls = [
    { id: 1686060127832, name: "Text Field", label: "Full Name", value: "" },
    { id: 1686060132118, name: "Phone Number", label: "Phone no", value: "" },
    { id: 1686060136527, name: "Text Area", label: "Address", value: "" },
    {
      id: 1686060146790,
      name: "Radio Buttons",
      label: "Education",
      value: "",
      optionsList: ["Btech", "MBA", "BBA", "MCA"],
    },
    {
      id: 1686060152189,
      name: "Text Area",
      label: "Why are you a good fit for the role ?",
      value: "",
    },
    {
      id: 1686060162294,
      name: "Yes / No",
      label: "Do you have 2+ years of experience ?",
      value: "",
    },
    {
      id: 1686060172470,
      name: "Yes / No",
      label: "Do you have experience with Svelte ?",
      value: "",
    },
    { id: 1686060180662, name: "File Upload", label: "Resume", value: "" },
  ];

  const surveyFormEls = [
    {
      id: 1686060460680,
      label: "How old are you ?",
      name: "Radio Buttons",
      optionsList: ["10-18", "19-25", "26-45", "46+"],
      value: "",
    },
    {
      id: 1686060497726,
      label: "Have you ever bought vegetables from online marketplace ?",
      name: "Yes / No",
      value: "",
    },
    {
      id: 1686060529855,
      label: "What do you prefer most out of following ?",
      name: "Radio Buttons",
      optionsList: ["Gaming", "Music", "Reading", "Nothing"],
      value: "",
    },
  ];

  const createFormFromTemplate = async (templateType) => {
    let user =
      (typeof window !== undefined &&
        window.localStorage.getItem("FormVibeUser")) ??
      "{}";
    let userInfo = JSON.parse(user);
    let userId = userInfo?.$id;

    if (templateType === "job") {
      const res = await createForm(
        userId,
        "Job Application Form",
        jobAppFormEls
      );
      console.log(res);
      router.push("/forms/" + res?.form_id);
    } else {
      const res = await createForm(userId, "Survey Form", surveyFormEls);
      console.log(res);
      router.push("/forms/" + res?.form_id);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-12">
      <div
        className="relative w-full h-72 border border-zinc-200 rounded p-12 flex flex-col gap-3 justify-center items-center cursor-pointer bg-slate-100 hover:bg-slate-200"
        onClick={() => createFormFromTemplate("job")}
      >
        <AppWindow />
        <span>Job Application Form</span>
      </div>
      <div
        className="relative w-full h-72 border border-zinc-200 rounded p-12 flex flex-col gap-3 justify-center items-center cursor-pointer bg-slate-100 hover:bg-slate-200"
        onClick={() => createFormFromTemplate("survey")}
      >
        <Book />
        <span>Survey Form</span>
      </div>
      <span className="text-xs text-zinc-500">
        More templates to arrive soon
      </span>
    </div>
  );
}

export default FormTemplates;
