import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between px-12 md:px-24 py-6 md:py-10 w-full">
      <div className="flex justify-start w-full">
        <img width={48} src="/assets/Icon.png" alt="App Logo" />
      </div>
      <div className="flex flex-col md:flex-row w-full py-16 h-screen items-center gap-8">
        <div className="text-left w-full md:max-w-2xl flex flex-col items-center md:items-start mt-32 md:mt-0">
          <div className="font-extrabold text-5xl flex gap-3 -mt-36">
            <span className="bg-gradient-radial from-blue-500 via-blue-600 to-indigo-500 bg-clip-text text-transparent">
              Form{" "}
            </span>
            <img src="/assets/Vibe.png" alt="Vibe text" className="w-28" />
          </div>
          <p className="w-full md:w-3/5 text-center md:text-left -mt-2">
            Unleash the Power of Interactive Forms. Collect, Connect, and
            Collaborate
          </p>
          <Link href="/login">
            <button className="mt-4 bg-white shadow-xl w-44 p-3 rounded-md bg-gradient-to-br from-[#0277FF] via-[#0077ffc6] to-[#0075FF] text-white font-medium">
              Get Started
            </button>
          </Link>
        </div>
        <img
          src="/assets/Circles.png"
          alt="Circle Members"
          className="hidden w-3/5 md:block absolute -z-10 -right-5 -top-2"
        />
        <img
          className="w-11/12 md:w-8/12 md:absolute md:top-40 md:-right-28 object-cover rounded-md border border-zinc-200 "
          src="/assets/HeroBanner.png"
          alt="Intro Pic"
        />
      </div>
    </main>
  );
}
