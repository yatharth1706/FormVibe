import React from "react";
import FormTemplates from "./FormTemplates";
import { Dialog, DialogContent } from "@/components/ui/dialog";

function TemplatesModal({ isTemplatesModalOpen, setIsTemplatesModalOpen }) {
  return (
    <Dialog open={isTemplatesModalOpen} onOpenChange={setIsTemplatesModalOpen}>
      <DialogContent
        className="bg-white"
        style={{ maxWidth: "1000px", padding: "80px" }}
      >
        <FormTemplates />
      </DialogContent>
    </Dialog>
  );
}

export default TemplatesModal;
