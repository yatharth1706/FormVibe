"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import moment from "moment";

function ResponsesTable({ formResponses }) {
  const single_response = JSON.parse(
    formResponses?.[0]?.["form_elements"] ?? "[]"
  );
  const labels = single_response?.map((item) => item?.label) ?? [];

  return formResponses.length > 0 ? (
    <div className="flex gap-4 flex-col border border-zinc-300 rounded-lg p-[1px]">
      <div className={"border rounded" + formResponses.length > 0 ? " " : ""}>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 font-bold">
              {labels?.map((label, index) => (
                <TableHead key={label + String(index)}>{label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {formResponses?.map((form) => (
              <TableRow key={form?.$id}>
                {JSON.parse(form?.form_elements).map((el) => (
                  <TableCell key={el?.id}>
                    {el?.value ? el?.value : el?.fileName ? el?.fileName : ""}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default ResponsesTable;
