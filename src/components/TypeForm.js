"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { renderFinalFormElements } from "../lib/renderHelpers";

function TypeForm({
  formBannerPreview,
  formIconPreview,
  formName,
  formDescription,
  formElements,
  handleFormElementValueChange,
  handleYesNo,
  handleFileChange,
  handleSubmit,
}) {
  const [index, setIndex] = useState(0);
  const handleNext = () => {
    setIndex((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setIndex((prev) => prev - 1);
  };

  return (
    <div className="h-screen w-full">
      {index === 0 && (
        <>
          <div className="flex h-56 flex-col gap-2 justify-center items-center w-full bg-sky-200 border border-zinc-200 border-dashed relative">
            {formBannerPreview && (
              <img
                src={formBannerPreview}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex w-[95%] md:w-10/12 mx-auto gap-6 mt-10 p-8 items-center">
            {formIconPreview && (
              <div className="flex justify-center items-center w-16 h-16 rounded hover:bg-slate-100 cursor-pointer border-zinc-300 relative">
                <img
                  className="w-full h-full object-contain"
                  src={formIconPreview}
                  alt="Form Icon Image"
                />
              </div>
            )}
            <div className="flex flex-col flex-grow">
              <h2 className="outline-none py-2 font-semibold text-gray-600 text-3xl">
                {formName}
              </h2>

              {formDescription && (
                <p className="text-gray-500 w-full outline-none py-2">
                  {formDescription}
                </p>
              )}
            </div>
          </div>
        </>
      )}
      <div
        className={
          "w-[95%] md:w-10/12 mx-auto p-8 flex flex-col gap-3 items-center justify-center " +
          (index > 0 ? "h-full" : "")
        }
      >
        {renderFinalFormElements(
          index,
          formElements[index]?.name,
          formElements[index]?.label,
          formElements[index]?.value,
          (event = {}, val = "") =>
            handleFormElementValueChange(index, event, val),
          formElements[index]?.optionsList ?? [],
          formElements[index]?.isItYes ?? "",
          (val) => handleYesNo(index, val),
          (e) => handleFileChange(e, index),
          formElements[index]?.fileName ?? "",
          formElements[index]?.errorMessage ?? ""
        )}
        <div className="w-full relative pb-24">
          <div className="flex gap-4 rounded absolute left-0 top-3">
            {index > 0 && (
              <div
                className="bg-sky-500 text-white w-8 h-8 p-2 rounded cursor-pointer"
                onClick={handlePrevious}
              >
                <ArrowLeft className="w-full h-full" />
              </div>
            )}
            {index < formElements.length - 1 && (
              <div
                className="bg-sky-500 text-white w-8 h-8 p-2 rounded cursor-pointer"
                onClick={handleNext}
              >
                <ArrowRight className="w-full h-full" />
              </div>
            )}
          </div>
          {index === formElements.length - 1 && (
            <div className="absolute right-0">
              <div className="flex justify-center w-32">
                <button
                  className="btn-primary w-full p-3"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TypeForm;
