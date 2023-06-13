"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import FormsAction from "./FormsAction";
import { useFormVibeContext } from "../contexts/FormVibeContextProvider";

function FormTable({ forms, fetchForms }) {
  const router = useRouter();

  const { deleteForm } = useFormVibeContext();

  const handleDeleteForm = async (id) => {
    await deleteForm(id);
    await fetchForms();
  };

  return (
    <div className="flex gap-4 flex-col">
      <div className="border border-zinc-300 rounded-lg p-[1px]">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 font-bold">
              <TableHead>Form Name</TableHead>
              <TableHead>Form Type</TableHead>
              <TableHead>Form Description</TableHead>
              <TableHead>Created On</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {forms.map((form) => (
              <TableRow key={form?.form_id}>
                <TableCell
                  className="cursor-pointer"
                  onClick={() => router.push("/forms/" + form?.form_id)}
                >
                  {form?.form_name ?? "-"}
                </TableCell>
                <TableCell>{form?.form_type ?? "-"}</TableCell>
                <TableCell>{form?.form_description ?? "-"}</TableCell>
                <TableCell>
                  {moment(form?.created_on).format("YYYY-MM-DD HH:mm")}
                </TableCell>
                <TableCell className="text-right">
                  <FormsAction
                    formSlug={form?.form_id}
                    handleDeleteForm={() => handleDeleteForm(form?.$id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default FormTable;
