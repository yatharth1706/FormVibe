"use client";

import { useFormVibeContext } from "@/contexts/FormVibeContextProvider";
import Link from "next/link";
import React from "react";

function NavigationBar() {
  const { logout } = useFormVibeContext();

  return (
    <div className="flex justify-between w-full h-16 px-8 py-4 border-b border-zinc-300">
      <Link href="/">
        <div className="flex gap-4 items-center cursor-pointer">
          <img src="/assets/Icon.png" width={32} alt="App Logo" />
          <span>FormVibe</span>
        </div>
      </Link>
      <div>
        <div
          onClick={logout}
          className="text-xs cursor-pointer flex justify-center items-center rounded-full p-2 border border-zinc-300 w-9 h-9"
        >
          YV
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
