"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

function NavLink({ iconImg, linkName, classDesc, isActive }) {
  return (
    <div
      className={
        "p-[10px] flex gap-3 items-center hover:shadow-xl cursor-pointer hover:bg-white hover:border hover:border-zinc-200 rounded " +
        (isActive ? "border border-zinc-200 font-semibold bg-white" : "")
      }
    >
      <div className="w-8">
        <img
          src={"/assets/icons/" + iconImg}
          className={classDesc}
          alt="Form Icon"
        />
      </div>
      {linkName}
    </div>
  );
}

function Sidebar() {
  const path = usePathname();
  console.log(path);
  return (
    <div className="py-8 px-8 w-2/12 border-r border-zinc-300 flex flex-col gap-5 h-screen">
      <NavLink
        iconImg="formIcon.svg"
        linkName="My Forms"
        isActive={path.includes("/accounts/forms")}
      />
      <NavLink
        iconImg="templatesIcon.svg"
        linkName="Templates"
        isActive={path.includes("/accounts/templates")}
      />
      <NavLink
        iconImg="membersIcon.svg"
        linkName="Members"
        isActive={path.includes("/accounts/members")}
      />
      <NavLink
        iconImg="integrationIcon.svg"
        linkName="Integrations"
        classDesc="w-7"
        isActive={path.includes("/accounts/integrations")}
      />
      <NavLink
        iconImg="accountsIcon.svg"
        linkName="Account"
        classDesc="w-6"
        isActive={path.includes("/accounts/myaccount")}
      />
      <NavLink
        iconImg="helpIcon.svg"
        linkName="Help"
        isActive={path.includes("/accounts/help")}
      />
    </div>
  );
}

export default Sidebar;
