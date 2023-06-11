"use client";
import ResponsesTable from "@/src/components/ResponsesTable";
import { useFormVibeContext } from "@/src/contexts/FormVibeContextProvider";
import React, { useEffect, useState } from "react";

function Responses({ params }) {
  const formSlug = params.formSlug;
  const [responses, setResponses] = useState([]);
  const { retrieveResponses } = useFormVibeContext();

  useEffect(() => {
    fetchAllResponses();
  }, []);

  const fetchAllResponses = async () => {
    const response = await retrieveResponses(formSlug);

    console.log(response);
    setResponses(response?.documents ?? []);
  };

  return (
    <div className="flex flex-col p-6 md:px-12 md:py-12 gap-6 w-full">
      <div className="flex flex-col gap-5 justify-between w-full">
        <h4 className="font-bold">All Responses</h4>
        {responses?.length === 0 && <span>No responses yet</span>}
        <ResponsesTable formResponses={responses} />
      </div>
    </div>
  );
}

export default Responses;
