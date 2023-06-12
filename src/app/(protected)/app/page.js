"use client";
import CreateFormDialog from "@/src/components/CreateFormDialog";
import FormActionCard from "@/src/components/FormActionCard";
import FormTable from "@/src/components/FormTable";
import { useFormVibeContext } from "@/src/contexts/FormVibeContextProvider";
import { FormInput } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

function MyForms() {
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { retrieveForms } = useFormVibeContext();

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      setForms([]);
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

  return (
    <div className="flex flex-col p-6 md:px-12 md:py-8 gap-6 flex-grow">
      <div className="flex gap-5 justify-between w-full">
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-lg">Your Forms</h4>
          <p className="text-gray-500">View and manage your forms</p>
        </div>
        <CreateFormDialog />
      </div>

      {isLoading && <p>Loading...</p>}
      {!isLoading && forms?.length === 0 && (
        <div className="border border-zinc-100 mx-auto mt-12 w-[500px] h-64 bg-slate-100 rounded p-8 flex flex-col gap-5 justify-center items-center">
          <FormInput />
          <h2 className="text-gray-800 -mt-3">There are no forms yet</h2>
          <CreateFormDialog />
        </div>
      )}
      {forms?.length > 0 && (
        <div>
          <FormTable forms={forms} fetchForms={fetchForms} />
        </div>
      )}
    </div>
  );
}

export default MyForms;
