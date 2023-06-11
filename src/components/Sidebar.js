"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

function NavLink({ iconImg, linkName, classDesc, isActive, link }) {
  return (
    <Link href={link}>
      <div
        className={
          "p-[8px] md:p-[12px] flex gap-3 items-center hover:shadow-xl cursor-pointer hover:bg-white hover:border hover:border-zinc-200 rounded " +
          (isActive
            ? "bg-slate-200 border border-zinc-100 font-semibold text-gray-600"
            : "")
        }
        title={linkName}
      >
        <div className="w-8">
          <img
            src={"/assets/icons/" + iconImg}
            className={classDesc}
            alt="Form Icon"
          />
        </div>
        <span className="hidden md:block">{linkName}</span>
      </div>
    </Link>
  );
}

function Sidebar() {
  const path = usePathname();
  console.log(path);
  return (
    <div className="md:py-8 md:px-8 md:w-2/12 border-r border-zinc-300 flex flex-col gap-5 h-screen">
      <NavLink
        iconImg="formIcon.svg"
        linkName="My Forms"
        isActive={path === "/app"}
        link="/app"
      />
      <NavLink
        iconImg="templatesIcon.svg"
        linkName="Templates"
        isActive={path === "/app/templates"}
        link="/app/templates"
      />
      {/* <NavLink
        iconImg="membersIcon.svg"
        linkName="Members"
        isActive={path === "/app/members"}
        link="/app/members"
      />
      <NavLink
        iconImg="integrationIcon.svg"
        linkName="Integrations"
        classDesc="w-7"
        isActive={path === "/app/integrations"}
        link="/app/integrations"
      /> */}
      <NavLink
        iconImg="accountsIcon.svg"
        linkName="Account"
        classDesc="w-6"
        isActive={path === "/app/account"}
        link="/app/account"
      />
      <NavLink
        iconImg="helpIcon.svg"
        linkName="Help"
        isActive={path === "/app/help"}
        link="/app/help"
      />
    </div>
  );
}

export default Sidebar;
