"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Account, Client, ID } from "appwrite";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const FormVibeContext = createContext(null);

export default function FormvibeContextProvider({ children }) {
  const [appwriteClient, setAppwriteClient] = useState();
  const [appwriteAccount, setAppwriteAccount] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
      .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

    const account = new Account(client);

    setAppwriteClient(client);
    setAppwriteAccount(account);
  }, []);

  const login = async (email, password) => {
    try {
      if (appwriteAccount) {
        setIsLoading(true);

        const response = await appwriteAccount.createEmailSession(
          email,
          password
        );

        toast("Logged in successfully", {
          position: "top-right",
          autoClose: 4000,
          theme: "light",
        });

        router.push("/accounts/forms");
      }
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
      if (appwriteAccount) {
        const response = await appwriteAccount.createOAuth2Session(
          "google",
          "http://localhost:3000/accounts/forms",
          "http://localhost:3000/login"
        );
      }
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
      if (appwriteAccount) {
        const response = await appwriteAccount.deleteSession("current");
        toast("Logged out successfully", {
          position: "top-right",
          autoClose: 4000,
          theme: "light",
        });
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
      if (appwriteAccount) {
        setIsLoading(true);
        const result = await appwriteAccount.create(
          ID.unique(),
          email,
          password,
          name
        );

        toast("User account created successfully", {
          position: "top-right",
          autoClose: 4000,
          theme: "light",
        });
        router.push("/login");
      }
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

  const exposedValues = {
    login,
    loginWithGithub,
    logout,
    signup,
    isLoading,
  };

  return (
    <FormVibeContext.Provider value={{ ...exposedValues }}>
      {children}
    </FormVibeContext.Provider>
  );
}

export const useFormVibeContext = () => useContext(FormVibeContext);
