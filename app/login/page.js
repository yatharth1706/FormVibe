"use client";

import React, { useEffect } from "react";
import { Formik, useFormik } from "formik";
import Link from "next/link";
import { useFormVibeContext } from "@/contexts/FormVibeContextProvider";

function Login() {
  const { loginWithGithub, login, isLoading } = useFormVibeContext();

  const formInitialValues = {
    email: "",
    password: "",
  };

  const formSubmit = async (values) => {
    await login(values.email, values.password);
  };

  return (
    <div className="max-w-xl mx-auto h-screen flex justify-center items-center">
      <Formik initialValues={formInitialValues} onSubmit={formSubmit}>
        {(formik) => (
          <form
            className="text-sm bg-white shadow border border-zinc-200 rounded-lg flex flex-col gap-3 p-12 w-full"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex gap-3 items-center">
              <img className="w-8" src="/assets/Icon.png" alt="Icon" />
              <span className="text-lg font-medium">Log in</span>
            </div>
            <p className="font-light text-sm mb-4">
              Enter following details to login to formvibe
            </p>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              className="border-zinc-300 border px-4 py-2 outline-sky-300 rounded-md"
              {...formik.getFieldProps("email")}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="border-zinc-300 border px-4 py-2 outline-sky-300 rounded-md"
              {...formik.getFieldProps("password")}
            />
            <button
              type="submit"
              className="btn-primary mt-4"
              disabled={isLoading}
            >
              {isLoading ? "Logging in" : "Login"}
            </button>
            <p className="font-light text-center">Or</p>
            <button
              type="button"
              className="flex items-center gap-2 justify-center btn-secondary"
              onClick={loginWithGithub}
            >
              <img
                className="w-4"
                src="/assets/GoogleLogo.png"
                alt="google logo"
              />{" "}
              Log in with Google
            </button>
            <p className="text-center font-light text-gray-700 mt-1">
              Don't have an account.{" "}
              <Link href="/signup">
                <span className="font-bold">Sign up</span>
              </Link>{" "}
              here
            </p>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
