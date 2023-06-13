import Link from "next/link";
import Image from "next/image";
import { BookTemplate, Github, Grip } from "lucide-react";
import { LayoutList } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between max-w-max mx-auto  md:gap-20">
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
              Unleash the Power of Interactive Forms. Collect, Connect, and
              Collaborate
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

      <div className="w-full h-auto flex flex-col items-center">
        <div className="w-10/12 flex flex-col md:flex-row px-4 md:px-24 py-6 md:py-10">
          <div className="flex flex-col w-full md:w-4/12 p-6 justify-center gap-5">
            <div className="flex gap-4 items-center">
              <Grip />
              <h3 className="text-lg font-bold">Drag and Drop</h3>
            </div>
            <p className="text-gray-800">
              Customized page for better responses collection in the interface.
              Share the responses or do data analysis on that with our beautiful
              data analyzer as well
            </p>
          </div>
          <div className="flex w-full md:w-8/12">
            <div className=" w-full mx-auto rounded-xl p-1">
              <img
                src="/assets/DragAndDrop.png"
                className="w-full md:w-11/12 rounded-lg shadow-xl ml-auto"
              />
            </div>
          </div>
        </div>
        <div className="w-10/12 flex flex-col md:flex-row px-4 md:px-24 py-6 md:py-10">
          <div className="flex flex-col w-full md:w-8/12 gap-10">
            <div className=" w-full mx-auto rounded-xl p-1 gap-5">
              <img
                src="/assets/Airtable.png"
                className="w-full md:w-11/12 rounded-lg shadow-xl"
              />
            </div>
            <div className=" w-full mx-auto rounded-xl p-1 gap-5">
              <img
                src="/assets/Typeform.png"
                className="w-full md:w-11/12 rounded-lg shadow-xl"
              />
            </div>
          </div>
          <div className="flex flex-col w-full md:w-4/12 justify-center gap-5 p-6">
            <div className="flex gap-4 items-center">
              <LayoutList />
              <h3 className="text-lg font-bold">Form Types</h3>
            </div>
            <p className="text-gray-800">
              Share form with users in different form types. Currently Airtable
              and Typeform is supported. Use any form type to share with users
              and get the responses
            </p>
          </div>
        </div>
        <div className="w-10/12 flex flex-col md:flex-row px-4 md:px-24 py-6 md:py-10">
          <div className="flex flex-col w-full md:w-4/12 p-6 justify-center gap-5">
            <div className="flex gap-4 items-center">
              <BookTemplate />
              <h3 className="text-lg font-bold">Custom Pre-Built Templates</h3>
            </div>
            <p className="text-gray-800">
              Customized templates to create forms and share with users. No need
              to go to builder. User can directly choose pre built custom made
              templates and create form in seconds
            </p>
          </div>
          <div className="flex w-full md:w-8/12">
            <div className=" w-full mx-auto rounded-xl p-1">
              <img
                src="/assets/DragAndDrop.png"
                className="w-full md:w-11/12 ml-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-20">
        <div className="flex flex-col items-center w-full h-44 gap-8">
          <h2 className="text-xl font-semibold">Tech Stack Used</h2>
          <div className="flex flex-col md:flex-row gap-8">
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
              className="w-44 h-44 rounded-full"
            />
          </div>
        </div>
      </div>

      <div className="w-full mt-20 flex flex-col items-center gap-5 bg-slate-100 p-12">
        <div className="font-extrabold text-2xl flex items-center gap-2">
          <div>
            <img width={44} height={44} src="/assets/Icon.png" alt="App Logo" />
          </div>
          <span className="bg-gradient-radial bg-gray-700  bg-clip-text text-transparent">
            Form{" "}
          </span>
          <img src="/assets/Vibe.png" alt="Vibe text" className="w-16" />
        </div>
        <p className="text-xs text-gray-600">
          Built with NextJS and Appwrite ❤️
        </p>
      </div>
    </main>
  );
}
