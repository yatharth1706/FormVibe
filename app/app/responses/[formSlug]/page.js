"use client";
import ResponsesTable from "@/components/ResponsesTable";
import { useFormVibeContext } from "@/contexts/FormVibeContextProvider";
import React, { useEffect, useState } from "react";

function Responses({ params }) {
  const formSlug = params.formSlug;
  const [response, setResponses] = useState([]);
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
    <div className="flex flex-col px-12 py-8 gap-6 w-full">
      <div className="flex flex-col gap-5 justify-between w-full">
        <h4 className="font-bold">All Responses</h4>
        <ResponsesTable formResponses={response} />
      </div>
    </div>
  );
}

export default Responses;
