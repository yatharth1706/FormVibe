"use client";
import React from "react";
import { useDrag } from "react-dnd";

function FormElement({ fileName, elementName }) {
  const [{ isDragging }, drag] = useDrag({
    type: "FORM_ELEMENT",
    item: { type: "FORM_ELEMENT", name: elementName },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: "move" }}
      className="flex gap-4 items-center cursor-pointer"
    >
      <div className="w-6">
        <img src={"/assets/icons/" + fileName} />
      </div>
      <span className="font-light">{elementName}</span>
    </div>
  );
}

function FormElementsContainer() {
  return (
    <div className="w-full px-8 py-6 gap-5 flex flex-col">
      <h2 className="font-semibold">Form Elements</h2>
      <input
        type="search"
        className="border border-zinc-200 p-2 rounded outline-sky-400 outline-offset-0"
        placeholder="Search elements"
      />
      <div className="flex flex-col mt-2 gap-8">
        <FormElement elementName="Text Field" fileName="textIcon.svg" />
        <FormElement elementName="Phone Number" fileName="phoneIcon.svg" />
        <FormElement elementName="Text Area" fileName="textAreaIcon.svg" />
        <FormElement elementName="File Upload" fileName="fileUploadIcon.svg" />
        <FormElement elementName="Date" fileName="calenderIcon.svg" />
        <FormElement elementName="Radio Buttons" fileName="radioIcon.svg" />
        <FormElement elementName="Yes / No" fileName="decisionIcon.svg" />
        <FormElement elementName="Poll" fileName="pollIcon.svg" />
        <FormElement elementName="Opinion" fileName="opinionIcon.svg" />
      </div>
    </div>
  );
}

export default FormElementsContainer;
