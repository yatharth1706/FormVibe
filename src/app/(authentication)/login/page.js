"use client";

import React, { useEffect } from "react";
import { Formik, useFormik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { useFormVibeContext } from "@/src/contexts/FormVibeContextProvider";
import { usePathname, useRouter } from "next/navigation";

function Login() {
  const { loginWithGoogle, login } = useFormVibeContext();
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
    email: "",
    password: "",
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(6, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  const formSubmit = async (values) => {
    await login(values.email, values.password);
  };

  return (
    <div className="w-[95%] md:max-w-xl mx-auto h-screen flex justify-center items-center">
      <Formik
        initialValues={formInitialValues}
        onSubmit={formSubmit}
        validationSchema={LoginSchema}
      >
        {(formik) => (
          <form
            className="text-sm bg-white shadow border border-zinc-200 rounded-lg flex flex-col gap-3 p-12 w-full"
            onSubmit={formik.handleSubmit}
          >
            <Link href="/">
              <div className="flex gap-3 items-center cursor-pointer">
                <img className="w-12" src="/assets/Icon.png" alt="Icon" />
                <div className="flex flex-col pt-3">
                  <span className="text-lg font-medium">Log in</span>
                  <p className="font-normal text-gray-600 text-xs mb-4">
                    Enter following details to login
                  </p>
                </div>
              </div>
            </Link>

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
              Login
            </button>

            <p className="text-center font-light text-gray-700 mt-1">
              Don&apos;t have an account.{" "}
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
