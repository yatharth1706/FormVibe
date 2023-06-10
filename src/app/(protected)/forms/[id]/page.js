"use client";

import MainFormBuilder from "@/src/components/MainFormBuilder";
import BuilderFormNav from "@/src/components/MainFormBuilderNav";
import SettingsPage from "@/src/components/SettingsPage";
import SharePage from "@/src/components/SharePage";
import { useFormVibeContext } from "@/src/contexts/FormVibeContextProvider";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function BuilderPage({ params }) {
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

  return (
    <div className="flex flex-col h-full w-full">
      <BuilderFormNav
        formSlug={formSlug}
        tab={tab}
        setTab={setTab}
        updateFormMetaData={updateFormMetaData}
      />
      {tab === "Form" && (
        <MainFormBuilder
          formElements={formElements}
          setFormElements={setFormElements}
          setInitialRender={setInitialRender}
        />
      )}

      {tab === "Share" && <SharePage params={params} />}
      {tab === "Settings" && (
        <SettingsPage
          formBannerPreview={formBannerPreview}
          formDescription={formDescription}
          formIconPreview={formIconPreview}
          formName={formName}
          formType={formType}
          handleFormBannerChange={handleFormBannerChange}
          handleFormIconChange={handleFormIconChange}
          setFormDescription={setFormDescription}
          setFormName={setFormName}
          setFormType={setFormType}
          setInitialRender={setInitialRender}
        />
      )}
    </div>
  );
}

export default BuilderPage;
