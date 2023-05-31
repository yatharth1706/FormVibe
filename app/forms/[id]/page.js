"use client";

import { useFormVibeContext } from "@/contexts/FormVibeContextProvider";
import { renderFormElement } from "@/lib/helpers";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { toast } from "react-toastify";

function BuilderPage({ params }) {
  const [formElements, setFormElements] = useState([]);
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formId, setFormId] = useState();
  const router = useRouter();
  const [timer, setTimer] = useState();
  const [initialRender, setInitialRender] = useState(true);
  const { retrieveFormBySlug, updateForm } = useFormVibeContext();
  console.log(params);

  useEffect(() => {
    fetchForm();
  }, []);

  useEffect(() => {
    console.log(formElements);
    if (formId && !initialRender) {
      if (timer) {
        clearTimeout(timer);
      }
      let tim = setTimeout(() => updateFormMetaData(), 2000);
      setTimer(tim);
      return () => {
        clearTimeout(timer);
        setTimer();
      };
    }
  }, [formName, formDescription, formElements, formId, initialRender]);

  const updateFormMetaData = async () => {
    const payload = {
      form_name: formName,
      form_description: formDescription,
      form_columns: JSON.stringify(formElements),
      form_type: "Airtable",
    };
    await updateForm(payload, formId);
  };

  const fetchForm = async () => {
    const result = await retrieveFormBySlug(params?.id);
    console.log(result?.documents);

    if (result?.documents.length === 0) {
      toast("No form slug found");
      router.push("/app");
    }

    const doc = result?.documents?.[0];
    setFormName(doc?.form_name ?? "");
    setFormDescription(doc?.form_description ?? "");
    let cols = JSON.parse(doc?.form_columns);
    setFormElements(cols);
    setFormId(doc?.$id);
  };

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "FORM_ELEMENT",
    drop: (item) => {
      // Handle the dropped form element here
      let newFormElement = {
        label: "Label",
        name: item.name,
        id: Date.now(),
      };

      setFormElements([...formElements, { ...newFormElement }]);
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
  });

  const isActive = canDrop && isOver;

  const handleFormElementLabelChange = (index, event) => {
    const { value } = event.target;
    setFormElements((prevFormElements) => {
      const updatedFormElements = [...prevFormElements];
      updatedFormElements[index] = {
        ...updatedFormElements[index],
        label: value,
      };
      return updatedFormElements;
    });
    setInitialRender(false);
  };

  const handlePublish = () => {
    console.log({
      formId: generateRandomFormId(),
      formName: formName,
      formDescription: formDescription,
      formBanner: "",
      formIcon: "",
      formElements: [...formElements],
      formType: "Airtable",
      createdBy: "Yash",
      createdOn: moment().format("YYYY-MM-DD HH:mm:ss"),
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-2 items-center px-9 py-7 h-8 w-full border-b border-zinc-300">
        <img
          src="/assets/icons/backIcon.svg"
          alt="Back Icon"
          onClick={() => router.back()}
          className="cursor-pointer"
        />

        <div className="flex gap-4 ml-4">
          <span>Form</span>
          <span>Share</span>
          <span>Integrations</span>
        </div>
        <div className="flex ml-auto gap-4 items-center">
          <span>Auto saved</span>
          <button className="btn-secondary">Preview</button>
          <button className="btn-primary">Save</button>
        </div>
      </div>
      <div className="flex w-full h-screen">
        <div className="w-9/12 border-r border-zinc-300 px-16 py-6 flex flex-col gap-4">
          <div
            className="flex justify-between w-full border border-zinc-200 rounded p-8 bg-white"
            style={{
              boxShadow: "2px 2px 15px rgba(32, 161, 255, 0.28)",
            }}
          >
            <div className="flex flex-col w-full gap-1 ">
              <input
                type="text"
                value={formName}
                placeholder="Enter form name here"
                onChange={(e) => {
                  setFormName(e.target.value);
                  setInitialRender(false);
                }}
                className="outline-none py-2 font-semibold text-gray-600 text-lg"
              />

              <input
                type="text"
                value={formDescription}
                placeholder="Enter some description for the form (optional)"
                onChange={(e) => {
                  setFormDescription(e.target.value);
                  setInitialRender(false);
                }}
                className="text-gray-500 w-full outline-none py-2"
              />
            </div>
            <div>
              <img
                src="/assets/icons/imageUploadIcon.svg"
                alt="Upload Banner Image"
              />
              <input type="file" id="formIcon" className="hidden" />
            </div>
          </div>
          <div
            className={
              "flex flex-col gap-8  items-center p-8 w-full rounded border border-[#E5E5E5] bg-white min-h-[500px] max-h-[600px] " +
              (formElements?.length > 0 ? "justify-start" : "justify-center") +
              (isActive
                ? "border border-blue-400 shadow-xl shadow-blue-300"
                : "")
            }
            style={{
              boxShadow: "2px 2px 15px rgba(32, 161, 255, 0.28)",
            }}
            ref={drop}
          >
            {formElements.map((el, index) =>
              renderFormElement(
                el.name,
                el.label,
                (event) => handleFormElementLabelChange(index, event),
                true
              )
            )}
            {!formElements.length > 0 && (
              <>
                <img
                  src="/assets/icons/dragDropIcon.svg"
                  alt="Drag and Drop Icon"
                />
                <span className="text-gray-600">
                  Drag elements from left sidebar
                </span>
              </>
            )}
          </div>
        </div>
        <div className="w-3/12 p-8 flex flex-col gap-2">
          <h1 className="font-medium">Customization</h1>
          <img src="/assets/UnderLine.png" className="w-28" />

          <div className="flex flex-col mt-3">Coming Soon ...</div>
        </div>
      </div>
    </div>
  );
}

export default BuilderPage;
