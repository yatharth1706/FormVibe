"use client";
import { PlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function UseAIPage() {
  const [openAIKey, setOpenAIKey] = useState();
  const handleSaveOpenAIKey = () => {
    window.localStorage.setItem("OpenAIKeyFormVibe", openAIKey);
    toast("Saved to local storage successfully", {
      position: "bottom-right",
      autoClose: 2000,
      theme: "light",
    });
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      let openaikey = window.localStorage.getItem("OpenAIKeyFormVibe");
      setOpenAIKey(openaikey ?? "");
    }
  }, []);

  return (
    <div className="flex flex-col p-6 md:px-12 md:py-8 gap-6 flex-grow">
      <div className="flex gap-5 justify-between w-full">
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-lg">Your AI Assitant</h4>
          <p className="text-gray-500">
            Use our AI to create forms for you. Provide the scenario for which
            you need form and our assistant will create forms for you
            automatically with required form elements
          </p>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-2">
          <label>
            Your open ai secret key{" "}
            <span className="text-sm text-gray-500">
              (Note we will store this in local storage only.)
            </span>
          </label>
          <div className="flex gap-4">
            <input
              placeholder="Your secret key"
              type="password"
              value={openAIKey}
              onChange={(e) => setOpenAIKey(e.target.value)}
              className="p-2 font-semibold outline-none border border-gray-300 rounded w-4/5"
            />
            <button
              className="btn-secondary flex items-center gap-2 w-44 justify-center flex-1 cursor-pointer"
              onClick={handleSaveOpenAIKey}
              disabled={openAIKey?.trim().length === 0}
            >
              Save in local storage
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label>Prompt</label>
        <textarea
          className="border border-zinc-200 rounded p-2 h-48 resize-none"
          placeholder="Enter prompt here to describe the scenario for which you need form"
        />
      </div>
      <span className="btn-primary flex items-center gap-2 w-44 justify-center">
        Create Form
      </span>
    </div>
  );
}

export default UseAIPage;
