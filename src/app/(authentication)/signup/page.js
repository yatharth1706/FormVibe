"use client";

import React from "react";
import { Formik, useFormik } from "formik";
import Link from "next/link";
import { useFormVibeContext } from "@/src/contexts/FormVibeContextProvider";
import * as Yup from "yup";

function Signup() {
  const { signup } = useFormVibeContext();

  const formInitialValues = {
    name: "",
    email: "",
    password: "",
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(6, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  const formSubmit = (values) => {
    const { email, password, name } = values;
    signup(name, email, password);
  };

  return (
    <div className="w-[95%] md:max-w-xl mx-auto h-screen flex justify-center items-center">
      <Formik
        initialValues={formInitialValues}
        onSubmit={formSubmit}
        validationSchema={SignupSchema}
      >
        {(formik) => (
          <form
            className="text-sm bg-white shadow border border-zinc-200 rounded-lg flex flex-col gap-3 p-12 w-full"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex gap-3 items-center">
              <img className="w-8" src="/assets/Icon.png" alt="Icon" />
              <span className="text-lg font-medium">Create a new account</span>
            </div>
            <p className="font-light text-sm mb-4">
              Enter following details to create a new account in formvibe
            </p>
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="name"
              className="border-zinc-300 border px-4 py-2 outline-sky-300 rounded-md"
              {...formik.getFieldProps("name")}
            />
            {formik.errors.name && formik.touched.name ? (
              <div className="flex justify-end -mt-1 text-xs text-red-600">
                {formik.errors.name}
              </div>
            ) : null}
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              className="border-zinc-300 border px-4 py-2 outline-sky-300 rounded-md"
              {...formik.getFieldProps("email")}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="flex justify-end -mt-1 text-xs text-red-600">
                {formik.errors.email}
              </div>
            ) : null}
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="border-zinc-300 border px-4 py-2 outline-sky-300 rounded-md"
              {...formik.getFieldProps("password")}
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="flex justify-end -mt-1 text-xs text-red-600">
                {formik.errors.password}
              </div>
            ) : null}
            <button type="submit" className="btn-primary mt-4">
              Sign up
            </button>

            <p className="text-center font-light text-gray-700 mt-1">
              Already have an account?{" "}
              <Link href="/login">
                <span className="font-bold">Log in</span>
              </Link>{" "}
              here
            </p>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Signup;
