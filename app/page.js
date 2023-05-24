import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <div className="flex w-full py-20 h-screen">
        <div className="text-left max-w-2xl flex flex-col gap-8 px-20 my-auto">
          <div className="font-bold text-5xl ">
            <span className="bg-gradient-radial from-blue-500 via-blue-600 to-indigo-500 bg-clip-text text-transparent">
              Form{" "}
            </span>
            <span className="bg-[#20a2ffa8] p-2 text-4xl transition-transform rotate-12 rounded">
              Vibe
            </span>
          </div>
          <p>
            Unleash the Power of Interactive Forms. Collect, Connect, and
            Collaborate
          </p>
          <Link href="/login">
            <button className="bg-white shadow-xl w-44 p-3 rounded-md bg-gradient-to-br from-[#0277FF] via-[#0077ffc6] to-[#0075FF] text-white">
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
          className="w-2/3 absolute -right-28 object-cover rounded-md border border-zinc-200 "
          src="/assets/Intro.png"
          alt="Intro Pic"
        />
      </div>
    </main>
  );
}
