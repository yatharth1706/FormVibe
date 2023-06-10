"use client";
import React, { useEffect, useState } from "react";
import { useFormVibeContext } from "@/src/contexts/FormVibeContextProvider";
import { renderFinalFormElements } from "@/src/lib/renderHelpers";
import { toast } from "react-toastify";
import Loading from "@/src/components/Loading";
import Link from "next/link";

function FormPage({ params }) {
  const [isFetchingForm, setIsFetchingForm] = useState(true);
  const [formElements, setFormElements] = useState([]);
  const [formBannerPreview, setFormBannerPreview] = useState("");
  const [formIconPreview, setFormIconPreview] = useState("");
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formId, setFormId] = useState();
  const [formSubmittedSuccessfully, setFormSubmittedSuccessfully] =
    useState(false);

  const { retrieveFormBySlug, submitResponse, getFilePreview, storeFile } =
    useFormVibeContext();

  useEffect(() => {
    fetchForm();
  }, []);

  useEffect(() => {
    console.log(formElements);
  }, [formElements]);

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

    if (doc?.form_banner) {
      const bannerPreview = await getFilePreview(doc?.form_banner);
      setFormBannerPreview(bannerPreview);
    }

    if (doc?.form_icon) {
      const iconPreview = await getFilePreview(doc?.form_icon);
      setFormIconPreview(iconPreview);
    }
    setIsFetchingForm(false);
  };

  const handleYesNo = (index, val) => {
    setFormElements((prevFormElements) => {
      const updatedFormElements = [...prevFormElements];
      updatedFormElements[index]["isItYes"] = val === "Yes" ? true : false;
      return updatedFormElements;
    });
  };

  const handleFileChange = async (e, index) => {
    const file = e?.target?.files?.[0] ?? undefined;
    console.log(file?.name ?? "");

    if (file) {
      const id = await storeFile(file);
      setFormElements((prevFormElements) => {
        const updatedFormElements = [...prevFormElements];
        updatedFormElements[index]["file"] = id;
        updatedFormElements[index]["fileName"] = file?.name;
        updatedFormElements[index]["value"] = file?.name;
        return updatedFormElements;
      });
    } else {
      setFormElements((prevFormElements) => {
        const updatedFormElements = [...prevFormElements];
        updatedFormElements[index]["file"] = "";
        updatedFormElements[index]["fileName"] = "";
        updatedFormElements[index]["value"] = "";
        return updatedFormElements;
      });
    }
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
    const isValid = validateBeforeSubmit();
    if (isValid) {
      const res = await submitResponse(params?.id, formElements);
      toast("Response submitted successfully");
      setFormSubmittedSuccessfully(true);
    } else {
      toast(
        "Some values have been left empty. Please find errors attached with input"
      );
    }
  };

  const validateBeforeSubmit = () => {
    console.log(formElements);
    let tempFormEl = [...formElements];
    let isValid = true;
    for (let i = 0; i < tempFormEl.length; i++) {
      if (tempFormEl[i]?.value?.trim() === "") {
        isValid = false;
        tempFormEl[i]["errorMessage"] = "Required";
      } else {
        tempFormEl[i]["errorMessage"] = "";
      }
    }

    setFormElements([...tempFormEl]);

    return isValid;
  };

  return isFetchingForm ? (
    <Loading />
  ) : (
    <div className="w-full mx-auto  flex flex-col gap-14">
      {formSubmittedSuccessfully ? (
        <div className="text-lg w-full h-screen flex flex-col gap-4 justify-center items-center">
          <span>🎉 Yay! Form Submitted Successfully</span>
          <Link href="/">
            <button className="btn-primary text-md ">
              Create your own FormVibe
            </button>
          </Link>
        </div>
      ) : (
        <>
          <div className="flex h-64 flex-col gap-2 justify-center items-center w-full bg-sky-200 border border-zinc-200 border-dashed relative">
            {formBannerPreview && (
              <img
                src={formBannerPreview}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="bg-white border border-zinc-200 z-20 -mt-40 flex flex-col gap-14 w-8/12 p-20 rounded mx-auto">
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
                  placeholder=""
                  onChange={(e) => {
                    setFormName(e.target.value);
                    setInitialRender(false);
                  }}
                  className="outline-none py-2 font-semibold text-gray-600 text-3xl"
                />

                {formDescription && (
                  <input
                    type="text"
                    value={formDescription}
                    placeholder=""
                    onChange={(e) => {
                      setFormDescription(e.target.value);
                      setInitialRender(false);
                    }}
                    className="text-gray-500 w-full outline-none py-2"
                  />
                )}
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
                (val) => handleYesNo(index, val),
                (e) => handleFileChange(e, index),
                el?.fileName ?? "",
                el?.errorMessage ?? ""
              )
            )}
            <div className="flex justify-center">
              <button className="btn-primary w-full p-3" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </>
      )}

      <div className="z-50 text-xs bg-sky-200 fixed bottom-8 right-8 p-3 w-44 flex justify-center rounded-3xl">
        <span>Powered by FormVibe</span>
      </div>
    </div>
  );
}

export default FormPage;
