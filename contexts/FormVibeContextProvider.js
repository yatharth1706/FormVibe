"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Account, Client, Databases, ID, Query, Storage } from "appwrite";
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
  const storage = new Storage(client);

  useEffect(() => {
    getLoggedInUser();
  }, []);

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
      if (typeof window !== undefined) {
        window.localStorage.clear();
      }
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

  const getLoggedInUser = async () => {
    try {
      setIsLoading(true);
      const result = await account.get();
      console.log(result);
      setIsLoading(false);
      if (typeof window !== undefined) {
        window.localStorage.setItem("FormVibeUser", JSON.stringify(result));
      }
    } catch (err) {
      if (typeof window !== undefined) {
        window.localStorage.setItem("FormVibeUser", "");
      }
      router.push("/login");
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

  const createForm = async (
    createdBy,
    formName = undefined,
    formColumns = undefined
  ) => {
    try {
      const recordId = ID.unique();
      const res = await databases.createDocument(
        process.env.DATABASE_ID,
        process.env.FORM_COLLECTION_ID,
        recordId,
        {
          form_id: generateRandomFormId(),
          form_name: formName === undefined ? "My Form" : formName,
          form_columns:
            formColumns === undefined
              ? JSON.stringify([])
              : JSON.stringify(formColumns),
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

  const storeFile = async (file) => {
    try {
      const res = await storage.createFile(
        process.env.BUCKET_ID,
        ID.unique(),
        file
      );

      return res?.$id;
    } catch (err) {
      toast(err?.message ?? "Network error", {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
      });
    }
  };

  const getFilePreview = async (fileId) => {
    try {
      const res = await storage.getFilePreview(process.env.BUCKET_ID, fileId);
      return res?.href;
    } catch (err) {
      toast(err?.message ?? "Network error", {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
      });
    }
  };

  const getFileDownload = async () => {
    try {
      const res = await storage.getFileDownload(process.env.BUCKET_ID, fileId);
      return res?.href;
    } catch (err) {
      toast(err?.message ?? "Network error", {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
      });
    }
  };

  const retrieveUser = async (userId) => {
    try {
      const res = await databases.listDocuments(
        process.env.DATABASE_ID,
        process.env.USER_COLLECTION_ID,
        [Query.equal("id", userId)]
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

  const updateUser = async (id, payload) => {
    try {
      setIsLoading(true);
      const res = await databases.updateDocument(
        process.env.DATABASE_ID,
        process.env.USER_COLLECTION_ID,
        id,
        payload
      );
      toast("User account updated successfully", {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
      });
    } catch (err) {
      toast(err?.message ?? "Network error", {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
      });
    } finally {
      setIsLoading(false);
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
    getLoggedInUser,
    storeFile,
    getFilePreview,
    getFileDownload,
    retrieveUser,
    updateUser,
  };

  return (
    <FormVibeContext.Provider value={{ ...exposedValues }}>
      {children}
    </FormVibeContext.Provider>
  );
}

export const useFormVibeContext = () => useContext(FormVibeContext);
