import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between px-24 py-10">
      <div className="flex justify-start w-full">
        <img width={48} src="/assets/Icon.png" alt="App Logo" />
      </div>
      <div className="flex w-full py-16 h-screen">
        <div className="text-left max-w-2xl flex flex-col  my-auto">
          <div className="font-extrabold text-5xl flex gap-3 -mt-20">
            <span className="bg-gradient-radial from-blue-500 via-blue-600 to-indigo-500 bg-clip-text text-transparent">
              Form{" "}
            </span>
            <img src="/assets/Vibe.png" alt="Vibe text" className="w-28" />
          </div>
          <p className="w-4/5 -mt-2">
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
          src="/assets/CircleMembers.png"
          alt="Circle Members"
          className="w-3/5 absolute -z-10 -right-5 -top-2"
        />
        <img
          className="w-8/12 absolute -right-28 object-cover rounded-md border shadow-gray-400 shadow-xl border-zinc-200 "
          src="/assets/Intro.png"
          alt="Intro Pic"
        />
      </div>
    </main>
  );
}
