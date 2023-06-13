"use client";

import React, { useEffect, useState } from "react";
import { Formik, useFormik } from "formik";
import Link from "next/link";
import { useFormVibeContext } from "@/src/contexts/FormVibeContextProvider";
import * as Yup from "yup";
import { usePathname, useRouter } from "next/navigation";
import Loading from "@/src/components/Loading";

function Signup() {
  const [isSigning, setIsSigning] = useState(false);
  const { signup } = useFormVibeContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (
      typeof window !== undefined &&
      (pathname === "/login" || pathname === "/signup")
    ) {
      const user = window.localStorage.getItem("FormVibeUser");
      if (user) {
        router.push("/app");
      }
    }
  }, []);

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

  const formSubmit = async (values) => {
    try {
      setIsSigning(true);
      const { email, password, name } = values;
      await signup(name, email, password);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSigning(false);
    }
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
            className="text-sm bg-white shadow border border-zinc-200 rounded-lg flex flex-col gap-3 p-4 md:p-12 w-full"
            onSubmit={formik.handleSubmit}
          >
            <Link href="/">
              <div className="flex gap-3 items-center cursor-pointer">
                <img className="w-12" src="/assets/Icon.png" alt="Icon" />
                <div className="flex flex-col pt-3">
                  <span className="text-lg font-medium">
                    Create a new account
                  </span>
                  <p className="font-normal text-xs mb-4 text-gray-600">
                    Enter following details to create your account in formvibe
                  </p>
                </div>
              </div>
            </Link>
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
            <button
              type="submit"
              className="btn-primary mt-4 flex justify-center items-center"
              disabled={isSigning}
            >
              {isSigning && <Loading extraClasses="w-4 h-4" />}
              {isSigning ? "Signing up" : "Sign up"}
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
