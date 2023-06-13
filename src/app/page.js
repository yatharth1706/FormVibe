import Link from "next/link";
import Image from "next/image";
import { BookTemplate, Github, Grip, Linkedin, Twitter } from "lucide-react";
import { LayoutList } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between max-w-[100rem] mx-auto  md:gap-20">
      <div className="px-4 md:px-24 py-6 md:py-10 flex flex-col items-center justify-between w-full">
        <div className="flex justify-between items-center w-full border border-gray-200  rounded-full py-3 px-6 backdrop-filter backdrop-blur-lg bg-opacity-70 sticky top-4">
          <div>
            <img width={36} height={36} src="/assets/Icon.png" alt="App Logo" />
          </div>
          <Link href="/signup">
            <button className="shadow-xl w-36 flex p-3 justify-center rounded-full btn-primary text-white font-medium">
              Get Started
            </button>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row w-full h-auto md:pt-20 items-center ">
          <div className="text-left w-full flex flex-col items-center mt-24 md:mt-0 gap-6">
            <div className="font-extrabold text-5xl flex gap-2">
              <span className="bg-gradient-radial bg-gray-700  bg-clip-text text-transparent">
                Form{" "}
              </span>
              <img src="/assets/Vibe.png" alt="Vibe text" className="w-24" />
            </div>
            <p className="w-full md:max-w-lg text-base text-center -mt-2">
              Create Beautiful Forms with Ease
              <br /> Design and Deploy Custom Forms Effortlessly
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4  w-full">
              <Link href="/signup">
                <button className="shadow-xl w-64 sm:w-44 flex p-3 justify-center rounded-md btn-primary text-white font-medium ">
                  Get Started
                </button>
              </Link>
              <Link
                href="https://github.com/yatharth1706/FormVibe"
                target="_blank"
              >
                <button className="flex gap-1 items-center justify-center p-3 bg-white shadow-xl w-64 sm:w-44  rounded-md btn-secondary font-medium">
                  <Github className="w-6 h-4" />
                  <span>Star on github</span>
                </button>
              </Link>
            </div>
            <img
              className="w-11/12 object-cover rounded-md mt-10"
              src="/assets/HeroBanner.png"
              alt="Intro Pic"
            />
          </div>
        </div>
      </div>

      <div className="w-full h-auto flex flex-col items-center pt-20 gap-8 sm:gap-20">
        <div className="w-10/12 flex flex-col md:flex-row px-4 md:px-24 py-6 md:py-10 gap-8 md:gap-20">
          <div className="flex flex-col w-full md:w-4/12 p-6 justify-center gap-5">
            <div className="flex gap-4 items-center">
              <Grip />
              <h3 className="text-2xl font-bold">Drag and Drop</h3>
            </div>
            <p className="text-gray-800">
              Customized page for better responses collection in the interface.
              Share the responses or do data analysis on that with our beautiful
              data analyzer as well
            </p>
          </div>
          <div className="flex w-full md:w-8/12">
            <div className=" w-full mx-auto rounded-xl p-1">
              <div className="flex p-4 justify-center w-full rounded-xl -rotate-1 bg-gradient-to-r from-[#ceeaff] via-[#87c9f8] to-[#6776FF] h-auto">
                <img
                  src="/assets/DragAndDrop.png"
                  className="w-full md:w-11/12 mx-auto rounded-lg shadow-xl rotate-1"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-10/12 flex flex-col md:flex-row px-4 md:px-24 py-6 md:py-10 gap-8 md:gap-20">
          <div className="flex flex-col w-full md:w-8/12 gap-10 order-2 md:order-none">
            <div className=" w-full mx-auto rounded-xl p-1 gap-5">
              <div className="flex p-4 justify-center w-full rounded-xl rotate-1 bg-gradient-to-r from-[#6776FF] via-[#87c9f8] to-[#ceeaff] h-auto">
                <img
                  src="/assets/Airtable.png"
                  className="w-full md:w-full rounded-lg shadow-xl -rotate-1"
                />
              </div>
            </div>
            <div className=" w-full mx-auto rounded-xl p-1 gap-5">
              <div className="flex p-4 justify-center w-full rounded-xl -rotate-1 bg-gradient-to-r from-[#6776FF] via-[#87c9f8] to-[#ceeaff] h-auto">
                <img
                  src="/assets/Typeform.png"
                  className="w-full md:w-full rounded-lg shadow-xl rotate-1"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-4/12 justify-center gap-5 p-6 order-1 md:order-none">
            <div className="flex gap-4 items-center ">
              <LayoutList />
              <h3 className="text-2xl font-bold">Form Types</h3>
            </div>
            <p className="text-gray-800">
              Share form with users in different form types. Currently Airtable
              and Typeform is supported. Use any form type to share with users
              and get the responses
            </p>
          </div>
        </div>
        <div className="w-10/12 flex flex-col md:flex-row px-4 md:px-24 py-6 md:py-10 gap-8 md:gap-20">
          <div className="flex flex-col w-full md:w-4/12 p-6 justify-center gap-5">
            <div className="flex gap-4 items-center">
              <BookTemplate />
              <h3 className="text-2xl font-bold">Custom Pre-Built Templates</h3>
            </div>
            <p className="text-gray-800">
              Customized templates to create forms and share with users. No need
              to go to builder. User can directly choose pre built custom made
              templates and create form in seconds
            </p>
          </div>
          <div className="flex w-full md:w-8/12">
            <div className=" w-full mx-auto rounded-xl p-1">
              <div className="flex p-4 justify-center w-full rounded-xl -rotate-1 bg-gradient-to-r from-[#ceeaff] via-[#87c9f8] to-[#6776FF] h-auto">
                <img
                  src="/assets/Templates.png"
                  className="w-full md:w-11/12 mx-auto rounded-lg shadow-xl rotate-1"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-10/12 flex flex-col md:flex-row px-4 md:px-24 py-6 md:py-10 gap-8 md:gap-20">
          <div className="flex w-full md:w-8/12 order-2 md:order-none">
            <div className=" w-full mx-auto rounded-xl p-1">
              <div className="flex p-4 justify-center w-full rounded-xl -rotate-1 bg-gradient-to-r from-[#6776FF] via-[#87c9f8] to-[#ceeaff] h-auto">
                <img
                  src="/assets/Customize.png"
                  className="w-full md:w-11/12 mx-auto rounded-lg shadow-xl rotate-1"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-4/12 p-6 justify-center gap-5 order-1 md:order-none">
            <div className="flex gap-4 items-center">
              <BookTemplate />
              <h3 className="text-2xl font-bold">Custom Pre-Built Templates</h3>
            </div>
            <p className="text-gray-800">
              Customized templates to create forms and share with users. No need
              to go to builder. User can directly choose pre built custom made
              templates and create form in seconds
            </p>
          </div>
        </div>

        <div className="w-10/12 flex flex-col md:flex-row px-4 md:px-24 py-6 md:py-10 gap-8 md:gap-20">
          <div className="flex flex-col w-full md:w-4/12 p-6 justify-center gap-5">
            <div className="flex gap-4 items-center">
              <BookTemplate />
              <h3 className="text-2xl font-bold">Custom Pre-Built Templates</h3>
            </div>
            <p className="text-gray-800">
              Customized templates to create forms and share with users. No need
              to go to builder. User can directly choose pre built custom made
              templates and create form in seconds
            </p>
          </div>
          <div className="flex w-full md:w-8/12">
            <div className=" w-full mx-auto rounded-xl p-1">
              <div className="flex p-4 justify-center w-full rounded-xl -rotate-1 bg-gradient-to-r from-[#ceeaff] via-[#87c9f8] to-[#6776FF] h-auto">
                <img
                  src="/assets/Share.png"
                  className="w-full md:w-11/12 mx-auto rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-20 px-4 md:px-24 py-6 md:py-10">
        <div className="flex flex-col items-center w-full h-auto md:gap-28 gap-10">
          <h2 className="text-3xl font-semibold">Tech Stack Used</h2>
          <div className="flex flex-col md:flex-row gap-12 md:gap-24 w-full items-center md:justify-center h-auto flex-wrap">
            <img
              src="/assets/nextjsIcon.svg"
              className="w-44 h-44 rounded-lg"
            />
            <img
              src="/assets/appwriteIcon.svg"
              className="w-44 h-44 rounded-lg"
            />
            <img
              src="/assets/shadcnIcon.png"
              className="w-44 h-44 rounded-full object-cover"
            />
            <img
              src="/assets/Formik.png"
              className="w-44 h-44 rounded-full object-cover"
            />
            <img
              src="/assets/Tailwind.png"
              className="w-44 h-44 rounded-full object-cover"
            />
            <img
              src="/assets/Lucide.png"
              className="w-44 h-44 rounded-full object-cover"
            />
            <img
              src="/assets/DND.png"
              className="w-44 h-44 rounded-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="w-full mt-20 flex flex-col items-center gap-5 bg-slate-100 p-12">
        <div className="font-extrabold text-2xl flex items-center gap-1">
          <div>
            <img width={44} height={44} src="/assets/Icon.png" alt="App Logo" />
          </div>
          <span className="ml-2 bg-gradient-radial bg-gray-700  bg-clip-text text-transparent">
            Form{" "}
          </span>
          <img src="/assets/Vibe.png" alt="Vibe text" className="w-16" />
        </div>
        <p className="text-xs text-gray-600">
          Built with NextJS and Appwrite ❤️
        </p>
        <div className="flex flex-col sm:flex-row gap-8">
          <Link href="http://github.com/yatharth1706" target="_blank">
            <span className="flex gap-2 items-center cursor-pointer hover:scale-105">
              <Github className="w-5 h-5" /> My Github
            </span>
          </Link>
          <Link href="https://twitter.com/yatharth170699" target="_blank">
            {" "}
            <span className="flex gap-2 items-center cursor-pointer hover:scale-105">
              <Twitter className="w-5 h-5" /> My Twitter
            </span>
          </Link>
          <Link
            href="https://www.linkedin.com/in/yatharth-verma-938924169/"
            target="_blank"
          >
            <span className="flex gap-2 items-center cursor-pointer hover:scale-105">
              <Linkedin className="w-5 h-5" /> My Linkedin
            </span>
          </Link>
        </div>
        <div className="flex flex-col">
          <span>Author: Yatharth Verma</span>
        </div>
      </div>
    </main>
  );
}
