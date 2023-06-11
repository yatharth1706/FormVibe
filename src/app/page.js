import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between  w-full gap-80 md:gap-20">
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
          <div className="text-left w-full flex flex-col items-center mt-24 md:mt-0 ">
            <div className="font-extrabold text-5xl flex gap-2">
              <span className="bg-gradient-radial from-blue-500 via-blue-600 to-indigo-500 bg-clip-text text-transparent">
                Form{" "}
              </span>
              <img src="/assets/Vibe.png" alt="Vibe text" className="w-28" />
            </div>
            <p className="w-full md:w-3/5 text-center -mt-2">
              Unleash the Power of Interactive Forms. Collect, Connect, and
              Collaborate
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4 w-full">
              <Link href="/signup">
                <button className="shadow-xl w-64 sm:w-44 flex p-3 justify-center rounded-md btn-primary text-white font-medium ">
                  Get Started
                </button>
              </Link>
              <Link href="https://github.com/yatharth1706/FormVibe">
                <button className="flex gap-1 items-center justify-center p-3 bg-white shadow-xl w-64 sm:w-44  rounded-md btn-secondary font-medium">
                  <Github className="w-6 h-4" />
                  <span>Star on github</span>
                </button>
              </Link>
            </div>
            <img
              className="w-11/12 object-cover rounded-md border border-zinc-200 shadow mt-12"
              src="/assets/HeroBanner.png"
              alt="Intro Pic"
            />
          </div>
          {/* <img
            src="/assets/Circles.png"
            alt="Circle Members"
            className="hidden w-3/5 md:block absolute -z-10 -right-24 top-32"
          /> */}
        </div>
      </div>
      <div className="w-full ">
        <div className="flex flex-col items-center justify-center w-full h-44 px-12 py-6 md:p-24 gap-8">
          <h2 className="font-medium text-lg">Tech Stack Used</h2>
          <div className="flex flex-col md:flex-row gap-12">
            <img src="/assets/nextjsIcon.svg" className="w-44 h-44" />
            <img src="/assets/appwriteIcon.svg" className="w-44 h-44" />
            <img src="/assets/shadcnIcon.png" className="w-44 h-44" />
          </div>
        </div>
      </div>
    </main>
  );
}
