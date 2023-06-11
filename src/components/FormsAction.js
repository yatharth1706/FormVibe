"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

function FormsAction({ formSlug }) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal className="cursor-pointer inline-block" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={1} className="bg-white">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator className="border border-zinc-100" />
        <DropdownMenuItem
          onClick={() => router.push("/forms/" + formSlug)}
          className="cursor-pointer"
        >
          Edit Form
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push("app/responses/" + formSlug)}
        >
          View Responses
        </DropdownMenuItem>
        {/* <DropdownMenuItem className="cursor-pointer">
          Delete Form
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default FormsAction;
