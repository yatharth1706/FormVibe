"use client";
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useFormVibeContext } from "@/src/contexts/FormVibeContextProvider";
import { Progress } from "@/src/components/ui/Progress";

let customPrompt = `Use below array containing set of form elements. Understand it and give me another array similar to this but with different form elements according to the scenario I want.
[
  {
    "id": 1,
    "name": "Text Field",
    "label": "Full Name",
    "value": "",
    "isRequired": true
  },
  {
    "id": 2,
    "name": "Email",
    "label": "Email Address",
    "value": "",
    "isRequired": true
  },
  {
    "id": 3,
    "name": "Phone Number",
    "label": "Phone Number",
    "value": "",
    "isRequired": true
  },
  {
    "id": 4,
    "name": "Text Area",
    "label": "Address",
    "value": "",
    "isRequired": true
  },
  {
    "id": 5,
    "name": "Radio Buttons",
    "label": "Education",
    "value": "",
    "optionsList": ["High School", "Bachelor's Degree", "Master's Degree", "PhD"],
    "isRequired": true
  },
  {
    "id": 6,
    "name": "Text Area",
    "label": "Work Experience",
    "value": "",
    "isRequired": true
  },
  {
    "id": 7,
    "name": "Yes / No",
    "label": "Are you willing to relocate?",
    "value": "",
    "isRequired": true
  },
  {
    "id": 8,
    "name": "File Upload",
    "label": "Resume",
    "value": "",
    "isRequired": true
  }
] I want to create form for <PROMPT>. Provide me array between delimeters $ArrayBegin$ and $ArrayEnd$
`;

function UseAIPage() {
  const [openAIKey, setOpenAIKey] = useState();
  const [prompt, setPrompt] = useState("");
  const [isGeneratingForm, setIsGeneratingForm] = useState(false);
  const { createForm } = useFormVibeContext();
  const [progressMessage, setProgressMessage] = useState("");
  const [progPercent, setProgPercent] = useState(20);
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
      if (!window.localStorage.getItem("OpenAIKeyFormVibe")) {
        toast("Add open ai key first", {
          position: "bottom-right",
          autoClose: 2000,
          theme: "light",
        });
        return;
      }
      const configuration = new Configuration({
        apiKey: openAIKey,
      });

      setProgressMessage(30);
      setProgressMessage("Asking openAI");

      const openai = new OpenAIApi(configuration);

      const chat_completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: customPrompt.replace("<PROMPT>", prompt),
          },
        ],
      });

      chat_completion.json().then(async (m) => {
        if (m?.error) {
          console.log(m?.error?.message);
          toast(m?.error?.message, {
            position: "bottom-right",
            autoClose: 2000,
            theme: "light",
          });
        } else {
          try {
            let extractedArr = extractArrayFromResponse(m);
            let formEls = extractedArr;
            console.log(formEls);
            setProgressMessage("Creating form");
            await createFormFromTemplate(formEls);
            toast("Created form successfully using provided prompt", {
              position: "bottom-right",
              autoClose: 2000,
              theme: "light",
            });
          } catch (err) {
            toast(err, {
              position: "bottom-right",
              autoClose: 2000,
              theme: "light",
            });
          } finally {
            setProgressMessage("");
            setIsGeneratingForm(true);
          }
        }
      });
    } catch (err) {
      toast(err, {
        position: "bottom-right",
        autoClose: 2000,
        theme: "light",
      });
    } finally {
      setProgressMessage("");
      setIsGeneratingForm(false);
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

  function extractArrayFromResponse(response) {
    let finaloutput = response?.choices[0]["message"]["content"];
    response = finaloutput;
    console.log(response);
    const beginDelimiter = "$ArrayBegin$";
    const endDelimiter = "$ArrayEnd$";
    const beginIndex = response.indexOf(beginDelimiter) + beginDelimiter.length;
    const endIndex = response.indexOf(endDelimiter);

    if (beginIndex < 0 || endIndex < 0 || endIndex <= beginIndex) {
      throw new Error("Invalid response format: Array delimiters not found.");
    }

    const arrayString = response.substring(beginIndex, endIndex).trim();
    try {
      return JSON.parse(arrayString);
    } catch (error) {
      throw new Error("Failed to parse the array in the response.");
    }
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
      {isGeneratingForm && (
        <div>
          <Progress value={progPercent} className=" h-1" />
          <small className="flex mt-1">{progressMessage}...</small>
        </div>
      )}
    </div>
  );
}

export default UseAIPage;
