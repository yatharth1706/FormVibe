"use client";

import { Switch } from "@/src/components/ui/switch";
import { useFormVibeContext } from "@/src/contexts/FormVibeContextProvider";
import { renderFormElement } from "@/src/lib/helpers";
import {
  Copy,
  Facebook,
  Linkedin,
  PencilIcon,
  Share,
  Share2,
  Twitter,
} from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { toast } from "react-toastify";

function BuilderPage({ params }) {
  const formLinkRef = useRef(null);
  const [formBanner, setFormBanner] = useState("");
  const [formIcon, setFormIcon] = useState("");
  const [formBannerPreview, setFormBannerPreview] = useState("");
  const [formIconPreview, setFormIconPreview] = useState("");
  const [formElements, setFormElements] = useState([]);
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formId, setFormId] = useState();
  const [formSlug, setFormSlug] = useState();
  const router = useRouter();
  const [timer, setTimer] = useState();
  const [initialRender, setInitialRender] = useState(true);
  const { retrieveFormBySlug, updateForm, storeFile, getFilePreview } =
    useFormVibeContext();
  const [currActiveFormElement, setCurrActiveFormElement] = useState(-1);
  const [tab, setTab] = useState("Form");
  const [formType, setFormType] = useState("");

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
  }, [
    formName,
    formDescription,
    formElements,
    formId,
    initialRender,
    formBanner,
    formIcon,
    formType,
  ]);

  const updateFormMetaData = async (btnType = "") => {
    const payload = {
      form_name: formName,
      form_description: formDescription,
      form_columns: JSON.stringify(formElements),
      form_type: formType,
      form_banner: formBanner ?? "",
      form_icon: formIcon ?? "",
    };
    await updateForm(payload, formId);
    if (btnType === "save") {
      toast("Form updated successfully.");
    }
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
    setFormSlug(doc?.form_id);
    setFormType(doc?.form_type);
    if (doc?.form_banner) {
      const bannerPreview = await getFilePreview(doc?.form_banner);
      setFormBannerPreview(bannerPreview);
    }

    if (doc?.form_icon) {
      const iconPreview = await getFilePreview(doc?.form_icon);
      setFormIconPreview(iconPreview);
    }
  };

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "FORM_ELEMENT",
    drop: (item) => {
      // Handle the dropped form element here
      let newFormElement = {
        id: Date.now(),
        name: item.name,
        label: "Label",
        value: "",
        isRequired: true,
      };

      if (item?.name === "Radio Buttons") {
        newFormElement["optionsList"] = ["Option 1", "Option 2"];
      }

      setFormElements([...formElements, { ...newFormElement }]);
      setInitialRender(false);
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
  });

  const isActive = canDrop && isOver;

  const handleDeleteFormElement = (index) => {
    let existingFormEls = [...formElements];
    console.log(existingFormEls, index);
    existingFormEls.splice(index, 1);

    setFormElements([...existingFormEls]);
    setInitialRender(false);
  };

  const handleAddOptions = (index) => {
    setFormElements((prevFormElements) => {
      const updatedFormElements = [...prevFormElements];
      updatedFormElements?.[index]?.["optionsList"].push("Option");
      return updatedFormElements;
    });
    setInitialRender(false);
  };

  const handleIsRequiredChange = (currActiveFormElement, val) => {
    setFormElements((prevFormElements) => {
      const updatedFormElements = [...prevFormElements];
      updatedFormElements[currActiveFormElement]["isRequired"] = val;
      return updatedFormElements;
    });
    setInitialRender(false);
  };

  useEffect(() => {
    console.log(currActiveFormElement);
  }, [currActiveFormElement]);

  const handleActiveFormElement = (index) => {
    setCurrActiveFormElement(index);
  };

  const handleOptionChange = (optIndex, value, index) => {
    setFormElements((prevFormElements) => {
      const updatedFormElements = [...prevFormElements];
      updatedFormElements[index]["optionsList"][optIndex] = value;
      return updatedFormElements;
    });
    setInitialRender(false);
  };

  const handleDeleteOptions = (optIndex, elIndex) => {
    setFormElements((prevFormElements) => {
      const updatedFormElements = [...prevFormElements];
      updatedFormElements?.[elIndex]?.["optionsList"]?.splice(optIndex, 1);
      return updatedFormElements;
    });
    setInitialRender(false);
  };

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

  const handleFormIconChange = async (e) => {
    const file = e.target.files?.[0];
    console.log(file);
    setInitialRender(false);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormIconPreview(reader.result);
      };
      reader.readAsDataURL(file);
      const id = await storeFile(file);

      setFormIcon(id);
    } else {
      setFormIconPreview("");
      setFormIcon("");
    }
  };

  const handleFormBannerChange = async (e) => {
    const file = e.target.files?.[0];
    setInitialRender(false);
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormBannerPreview(reader.result);
      };
      reader.readAsDataURL(file);
      const id = await storeFile(file);

      setFormBanner(id);
    } else {
      setFormBannerPreview("");
      setFormBanner("");
    }
  };

  const handleTwitterShare = () => {
    const tweetText = encodeURIComponent(
      "Created form using FormVibe. \n\nHere&apos;s the link. Do checkout and fill the form.\n\n" +
        process.env.NEXT_PUBLIC_APP_URL +
        "" +
        params?.id
    );
    const url = `https://twitter.com/intent/tweet?text=${tweetText}`;
    if (typeof window !== undefined) {
      window.open(url, "_blank");
    }
  };

  const handleFacebookShare = () => {
    const postText = encodeURIComponent(
      "Created form using FormVibe. \n\nHere&apos;s the link. Do checkout and fill the form.\n\n" +
        process.env.NEXT_PUBLIC_APP_URL +
        "" +
        params?.id
    );
    if (typeof window !== undefined) {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=${postText}`;
      window.open(url, "_blank");
    }
  };

  const handleLinkedInShare = () => {
    const postText = encodeURIComponent(
      "Created form using FormVibe. \n\nHere&apos;s the link. Do checkout and fill the form.\n\n" +
        process.env.NEXT_PUBLIC_APP_URL +
        "" +
        params?.id
    );
    if (typeof window !== undefined) {
      const url = `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}&summary=${postText}`;
      window.open(url, "_blank");
    }
  };

  const copyFormLink = async () => {
    if (typeof window !== undefined) {
      await window.navigator.clipboard.writeText(formLinkRef.current.value);
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex gap-5 items-center px-9 py-7 h-8 w-full border-b border-zinc-300">
        <img
          src="/assets/icons/backIcon.svg"
          alt="Back Icon"
          onClick={() => router.back()}
          className="cursor-pointer"
        />

        <div className="flex gap-8 ml-4">
          <div
            className="cursor-pointer relative flex flex-col gap-2 justify-center items-center"
            onClick={() => setTab("Form")}
          >
            <span className={tab === "Form" ? "font-bold" : ""}>Form</span>
            {tab === "Form" && (
              <img
                src="/assets/UnderLine.png"
                className="w-16 h-[2px] absolute -bottom-2"
              />
            )}
          </div>
          <div
            className="cursor-pointer relative flex flex-col gap-2 justify-center items-center"
            onClick={() => setTab("Share")}
          >
            <span className={tab === "Share" ? "font-bold" : ""}>Share</span>
            {tab === "Share" && (
              <img
                src="/assets/UnderLine.png"
                className="w-16 h-[2px] absolute -bottom-2"
              />
            )}
          </div>
          <div
            className="cursor-pointer relative flex flex-col gap-2 justify-center items-center"
            onClick={() => setTab("Settings")}
          >
            <span className={tab === "Settings" ? "font-bold" : ""}>
              Settings
            </span>
            {tab === "Settings" && (
              <img
                src="/assets/UnderLine.png"
                className="w-16 h-[2px] absolute -bottom-2"
              />
            )}
          </div>
        </div>
        <div className="flex ml-auto gap-4 items-center">
          <span>Auto saved</span>
          <Link href={"/" + formSlug} target="_blank">
            <button className="btn-secondary">Preview</button>
          </Link>
          <button
            className="btn-primary"
            onClick={() => updateFormMetaData("save")}
          >
            Save
          </button>
        </div>
      </div>
      <div className="flex w-full h-full">
        <div className="w-9/12 border-r border-zinc-300 px-8 py-6 flex flex-col gap-4 bg-white overflow-y-auto ">
          {tab === "Form" && (
            <div
              className={
                "flex flex-col gap-8 p-8  items-center w-full rounded border bg-white h-[640px] overflow-auto" +
                (isActive ? " border border-blue-400 " : " ") +
                (formElements?.length > 0
                  ? " justify-start"
                  : " justify-center")
              }
              ref={drop}
            >
              {formElements.map((el, index) =>
                renderFormElement(
                  index,
                  el.name,
                  el.label,
                  (event) => handleFormElementLabelChange(index, event),
                  true,
                  () => handleDeleteFormElement(index),
                  el?.optionsList ?? [],
                  (optIndex) => handleDeleteOptions(optIndex, index),
                  () => handleAddOptions(index),
                  (optIndex, value) =>
                    handleOptionChange(optIndex, value, index),
                  () => handleActiveFormElement(index),
                  currActiveFormElement
                )
              )}
              {!formElements.length > 0 && (
                <div className="rounded p-8 h-96 flex gap-3 justify-center items-center bg-white  w-full">
                  <img
                    src="/assets/icons/dragDropIcon.svg"
                    alt="Drag and Drop Icon"
                    className="w-8"
                  />
                  <span className="text-gray-500">
                    Drag elements from left sidebar
                  </span>
                </div>
              )}
            </div>
          )}

          {tab === "Share" && (
            <div className="flex flex-col gap-8">
              {/* <div className="flex gap-4 items-center">
                <Share2 className="w-5 text-gray-700" />
                <h2 className="font-bold">Share Form</h2>
              </div> */}
              <div className="flex flex-col gap-3">
                {" "}
                <h2 className="font-semibold">Link</h2>
                <div className="p-3 flex items-center bg-gray-100">
                  <input
                    type="text"
                    value={process.env.NEXT_PUBLIC_APP_URL + "" + params?.id}
                    className="w-full rounded outline-none"
                    disabled
                    ref={formLinkRef}
                  />
                  <Copy
                    onClick={copyFormLink}
                    className="cursor-pointer hover:scale-95"
                  />
                </div>
                <div className="flex gap-4">
                  <button className="btn-primary" onClick={copyFormLink}>
                    Copy link
                  </button>
                  <Link
                    href={process.env.NEXT_PUBLIC_APP_URL + "" + params?.id}
                    target="_blank"
                  >
                    <button className="btn-secondary">
                      Open form in new tab
                    </button>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h2 className="font-semibold">Share on your social platform</h2>
                <div className="flex gap-5">
                  <Twitter
                    className="text-gray-600 cursor-pointer"
                    onClick={handleTwitterShare}
                  />
                  <Linkedin
                    className="text-gray-600 cursor-pointer"
                    onClick={handleLinkedInShare}
                  />
                  <Facebook
                    className="text-gray-600 cursor-pointer"
                    onClick={handleFacebookShare}
                  />
                </div>
              </div>
            </div>
          )}
          {tab === "Settings" && (
            <div className="flex flex-col gap-4">
              <h2 className="font-semibold">Form Appearance</h2>
              <div
                className="flex flex-col gap-8 items-center w-full border border-zinc-200 rounded bg-white pb-10"
                style={{
                  boxShadow: "2px 2px 15px rgba(32, 161, 255, 0.20)",
                }}
              >
                <div className="flex text-gray-600 gap-2 justify-center items-center h-44 w-full bg-slate-200 hover:bg-slate-300 cursor-pointer border border-zinc-200 border-dashed relative">
                  {formBannerPreview && (
                    <img
                      src={formBannerPreview}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {!formBannerPreview && (
                    <>
                      <PencilIcon className="w-5 h-5" />
                    </>
                  )}
                  <input
                    type="file"
                    id="formBanner"
                    className="w-full h-full absolute inset-0 opacity-0"
                    onChange={handleFormBannerChange}
                  />
                </div>
                <div className="bg-white border border-[#efefef] rounded flex -mt-16 z-20 gap-4 flex-grow px-16 py-8 w-8/12">
                  <div className="border border-dashed boder flex justify-center items-center w-28 h-20 rounded hover:bg-slate-100 cursor-pointer border-zinc-300 relative">
                    {formIconPreview && (
                      <img
                        src={formIconPreview}
                        className="w-full h-full object-contain"
                      />
                    )}
                    {!formIconPreview && (
                      <img
                        src="/assets/icons/ImageUpload.svg"
                        alt="Upload Banner Image"
                      />
                    )}
                    <input
                      type="file"
                      id="formIcon"
                      className="absolute w-full h-full inset-0 opacity-0"
                      onChange={handleFormIconChange}
                    />
                  </div>
                  <div className="flex flex-col flex-grow w-full gap-1 ">
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
              </div>
              <h2 className="fon">Render form as </h2>
              <select
                className="p-3 rounded bg-white border border-gray-200 outline-sky-400"
                value={formType}
                onChange={(e) => setFormType(e.target.value)}
              >
                <option>Airtable</option>
                <option>Typeform</option>
              </select>
            </div>
          )}
        </div>
        <div className="w-3/12 p-8 flex flex-col gap-2">
          <div className="flex flex-col gap-3">
            <h1 className="font-medium">Settings</h1>
            <img src="/assets/UnderLine.png" className="w-28" />
          </div>

          <div>
            {currActiveFormElement === -1 && (
              <div className="flex flex-col mt-3 text-zinc-600">
                Select form element from the left to see its settings
              </div>
            )}

            {currActiveFormElement >= 0 && (
              <div className="flex items-center gap-4">
                <span>Is Required</span>

                <Switch
                  checked={formElements[currActiveFormElement]["isRequired"]}
                  onCheckedChange={(val) =>
                    handleIsRequiredChange(currActiveFormElement, val)
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuilderPage;
