"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Account, Client, Databases, ID, Query } from "appwrite";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import moment from "moment";

const FormVibeContext = createContext(null);

export default function FormvibeContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

  const account = new Account(client);
  const databases = new Databases(client);

  const login = async (email, password) => {
    try {
      setIsLoading(true);

      const response = await account.createEmailSession(email, password);

      toast("Logged in successfully", {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
      });

      router.push("/app");
    } catch (err) {
      toast(err?.message, {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGithub = async () => {
    try {
      const response = await account.createOAuth2Session(
        "google",
        "http://localhost:3000/app",
        "http://localhost:3000/login"
      );
    } catch (err) {
      toast(err?.message ?? "Network Error", {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
      });
    }
  };

  const logout = async () => {
    try {
      const response = await account.deleteSession("current");
      toast("Logged out successfully", {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
      });
      router.push("/login");
    } catch (err) {
      toast(err?.message ?? "Network Error", {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
      });
    }
  };

  const signup = async (name, email, password) => {
    try {
      setIsLoading(true);
      const result = await account.create(ID.unique(), email, password, name);

      toast("User account created successfully", {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
      });
      router.push("/login");
    } catch (err) {
      toast(err?.message ?? "Network Error", {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
      });
    } finally {
      setIsLoading(false);
    }
  };

  function generateRandomFormId() {
    var chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var length = 10;
    var formId = "";

    for (var i = 0; i < length; i++) {
      var randomIndex = Math.floor(Math.random() * chars.length);
      formId += chars.charAt(randomIndex);
    }

    return formId;
  }

  const createForm = async (createdBy) => {
    try {
      const recordId = ID.unique();
      const res = await databases.createDocument(
        process.env.DATABASE_ID,
        process.env.FORM_COLLECTION_ID,
        recordId,
        {
          form_id: generateRandomFormId(),
          form_name: "My Form",
          form_columns: JSON.stringify([]),
          form_type: "Airtable",
          created_by: createdBy,
          created_on: moment().format("YYYY-MM-DD HH:mm:ss"),
        }
      );

      return res;
    } catch (err) {
      toast(err?.message ?? "Network error", {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
      });
    }
  };

  const updateForm = async (formPayload, docId) => {
    try {
      const res = await databases.updateDocument(
        process.env.DATABASE_ID,
        process.env.FORM_COLLECTION_ID,
        docId,
        formPayload
      );
    } catch (err) {
      toast(err?.message ?? "Network error", {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
      });
    }
  };

  const retrieveForms = async (createdBy) => {
    try {
      const res = await databases.listDocuments(
        process.env.DATABASE_ID,
        process.env.FORM_COLLECTION_ID,
        [Query.equal("created_by", createdBy)]
      );

      return res;
    } catch (err) {
      toast(err?.message ?? "Network error", {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
      });
    }
  };

  const retrieveFormBySlug = async (slug) => {
    try {
      const res = await databases.listDocuments(
        process.env.DATABASE_ID,
        process.env.FORM_COLLECTION_ID,
        [Query.equal("form_id", slug)]
      );

      return res;
    } catch (err) {
      toast(err?.message ?? "Network error", {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
      });
    }
  };

  const retrieveResponses = async (slug) => {
    try {
      const res = await databases.listDocuments(
        process.env.DATABASE_ID,
        process.env.RESPONSE_COLLECTION_ID,
        [Query.equal("form_slug", slug)]
      );

      return res;
    } catch (err) {
      toast(err?.message ?? "Network error", {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
      });
    }
  };

  const submitResponse = async (formSlug, formElements) => {
    try {
      const res = await databases.createDocument(
        process.env.DATABASE_ID,
        process.env.RESPONSE_COLLECTION_ID,
        ID.unique(),
        {
          form_slug: formSlug,
          form_elements: JSON.stringify(formElements),
        }
      );
    } catch (err) {
      toast(err?.message ?? "Network error", {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
      });
    }
  };

  const exposedValues = {
    login,
    loginWithGithub,
    logout,
    signup,
    isLoading,
    createForm,
    updateForm,
    retrieveForms,
    retrieveFormBySlug,
    retrieveResponses,
    submitResponse,
  };

  return (
    <FormVibeContext.Provider value={{ ...exposedValues }}>
      {children}
    </FormVibeContext.Provider>
  );
}

export const useFormVibeContext = () => useContext(FormVibeContext);
