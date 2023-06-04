"use client";
import React, { useEffect, useState } from "react";
import { useFormVibeContext } from "@/contexts/FormVibeContextProvider";
import { renderFinalFormElements } from "@/lib/renderHelpers";
import { toast } from "react-toastify";

function FormPage({ params }) {
  const [formElements, setFormElements] = useState([]);
  const [formBannerPreview, setFormBannerPreview] = useState("");
  const [formIconPreview, setFormIconPreview] = useState("");
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formId, setFormId] = useState();

  const { retrieveFormBySlug, submitResponse, getFilePreview } =
    useFormVibeContext();

  useEffect(() => {
    fetchForm();
  }, []);

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
    console.log(cols);
    setFormElements(cols);
    setFormId(doc?.$id);

    const bannerPreview = await getFilePreview(doc?.form_banner);
    const iconPreview = await getFilePreview(doc?.form_icon);
    if (doc?.form_banner) {
      const bannerPreview = await getFilePreview(doc?.form_banner);
      setFormBannerPreview(bannerPreview);
    }

    if (doc?.form_icon) {
      const iconPreview = await getFilePreview(doc?.form_icon);
      setFormIconPreview(iconPreview);
    }
  };

  const handleYesNo = (index, val) => {
    setFormElements((prevFormElements) => {
      const updatedFormElements = [...prevFormElements];
      updatedFormElements[index]["isItYes"] = val === "Yes" ? true : false;
      return updatedFormElements;
    });
  };

  const handleFormElementValueChange = (index, event, val) => {
    let finalValue = "";
    if (val) {
      finalValue = val;
    } else {
      let { value } = event?.target;
      finalValue = value;
    }
    setFormElements((prevFormElements) => {
      const updatedFormElements = [...prevFormElements];
      updatedFormElements[index] = {
        ...updatedFormElements[index],
        value: finalValue,
      };
      return updatedFormElements;
    });
  };

  const handleSubmit = async () => {
    const res = await submitResponse(params?.id, formElements);
    toast("Response submitted successfully");
  };

  return (
    <div className="w-full mx-auto  flex flex-col gap-20">
      <div className="flex h-64 flex-col gap-2 justify-center items-center w-full bg-sky-100 hover:bg-sky-200 cursor-pointer border border-zinc-200 border-dashed relative">
        {formBannerPreview && (
          <img src={formBannerPreview} className="w-full h-full object-cover" />
        )}
      </div>
      <div className="bg-white border border-zinc-200 z-20 -mt-40 flex flex-col gap-20 w-8/12 p-20 rounded mx-auto">
        <div className="flex w-full gap-6">
          {formIconPreview && (
            <div className="flex justify-center items-center w-28 h-20 rounded hover:bg-slate-100 cursor-pointer border-zinc-300 relative">
              <img src={formIconPreview} alt="Form Icon Image" />
            </div>
          )}
          <div className="flex flex-col flex-grow">
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
        </div>
        {formElements.map((el, index) =>
          renderFinalFormElements(
            el?.name,
            el?.label,
            el?.value,
            (event = {}, val = "") =>
              handleFormElementValueChange(index, event, val),
            el?.optionsList ?? [],
            el?.isItYes ?? "",
            (val) => handleYesNo(index, val)
          )
        )}
        <div className="flex justify-center">
          <button className="btn-primary w-full p-3" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>

      <div className="z-50 text-xs bg-sky-200 fixed bottom-8 right-8 p-3 w-44 flex justify-center rounded-3xl">
        <span>Powered by FormVibe</span>
      </div>
    </div>
  );
}

export default FormPage;
