"use client";
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useFormVibeContext } from "@/src/contexts/FormVibeContextProvider";

function UseAIPage() {
  const [openAIKey, setOpenAIKey] = useState();
  const [prompt, setPrompt] = useState("");
  const [isGeneratingForm, setIsGeneratingForm] = useState(false);
  const { createForm } = useFormVibeContext();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== undefined) {
      let openaikey = window.localStorage.getItem("OpenAIKeyFormVibe");
      setOpenAIKey(openaikey ?? "");
    }
  }, []);

  const handleSaveOpenAIKey = () => {
    window.localStorage.setItem("OpenAIKeyFormVibe", openAIKey);
    toast("Saved to local storage successfully", {
      position: "bottom-right",
      autoClose: 2000,
      theme: "light",
    });
  };

  const handlePrompts = async () => {
    try {
      setIsGeneratingForm(true);
      const configuration = new Configuration({
        apiKey: openAIKey,
      });

      const openai = new OpenAIApi(configuration);

      const chat_completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content:
              `i have this array with various form elements and thier label names and other properties of element. const jobAppFormEls = [
          {
            id: 1686060127832,
            name: "Text Field",
            label: "Full Name",
            value: "",
            isRequired: true,
          },
          {
            id: 1686060132118,
            name: "Phone Number",
            label: "Phone no",
            value: "",
            isRequired: true,
          },
          {
            id: 1686060136527,
            name: "Text Area",
            label: "Address",
            value: "",
            isRequired: true,
          },
          {
            id: 1686060146790,
            name: "Radio Buttons",
            label: "Education",
            value: "",
            optionsList: ["Btech", "MBA", "BBA", "MCA"],
            isRequired: true,
          },
          {
            id: 1686060152189,
            name: "Text Area",
            label: "Why are you a good fit for the role ?",
            value: "",
            isRequired: true,
          },
          {
            id: 1686060162294,
            name: "Yes / No",
            label: "Do you have 2+ years of experience ?",
            value: "",
            isRequired: true,
          },
          {
            id: 1686060172470,
            name: "Yes / No",
            label: "Do you have experience with Svelte ?",
            value: "",
            isRequired: true,
          },
          {
            id: 1686060180662,
            name: "File Upload",
            label: "Resume",
            value: "",
            isRequired: true,
          },
        ]; Create form for following scenario and provide me only array in json stringify format without variable. Scenario: ` +
              " " +
              prompt,
          },
        ],
      });

      console.log(
        chat_completion.json().then(async (m) => {
          if (m?.error) {
            console.log(m?.error?.message);
            toast(m?.error?.message, {
              position: "bottom-right",
              autoClose: 2000,
              theme: "light",
            });
          } else {
            let formEls = JSON.parse(m);
            await createFormFromTemplate(formEls);
            toast("Created form successfully using provided prompt", {
              position: "bottom-right",
              autoClose: 2000,
              theme: "light",
            });
          }
        })
      );
    } catch (err) {
      toast(err, {
        position: "bottom-right",
        autoClose: 2000,
        theme: "light",
      });
    } finally {
      setIsGeneratingForm(true);
    }
  };

  const createFormFromTemplate = async (els) => {
    try {
      let user =
        (typeof window !== undefined &&
          window.localStorage.getItem("FormVibeUser")) ??
        "{}";
      let userInfo = JSON.parse(user);
      let userId = userInfo?.$id;

      const res = await createForm(userId, "AI Form", els);
      console.log(res);
      router.push("/forms/" + res?.form_id);
    } catch (err) {
      toast(err);
    } finally {
      setIsGeneratingForm(false);
    }
  };

  function extractConsultationFormArray(responseContent) {
    console.log(responseContent);
    // Find the starting index of the array by locating the first occurrence of '[\n'
    const startIndex = responseContent.indexOf("[\n");
    console.log(startIndex);

    // Find the ending index of the array by locating the last occurrence of '\n];'
    const endIndex = responseContent.lastIndexOf("\n];") + 3;
    console.log(endIndex);

    // Extract the array portion from the response content
    const arrayString = responseContent.slice(startIndex, endIndex);

    console.log(arrayString);
    // Parse the array string into an actual JavaScript array
    const consultationFormEls = JSON.parse(arrayString);

    return consultationFormEls;
  }

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
          className="border border-zinc-200 rounded p-2 h-48 resize-none focus:outline-none"
          placeholder="Enter prompt here to describe the scenario for which you need form"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
      <button
        onClick={handlePrompts}
        className="btn-primary flex items-center gap-2 w-44 justify-center"
        disabled={prompt?.trim().length === 0 || isGeneratingForm}
      >
        {isGeneratingForm ? "Creating..." : "Create Form"}
      </button>
    </div>
  );
}

export default UseAIPage;
