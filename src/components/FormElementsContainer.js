"use client";
import React, { useState } from "react";
import { useDrag } from "react-dnd";

function FormElement({ fileName, elementName, key }) {
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
      key={key}
    >
      <div className="w-6">
        <img src={"/assets/icons/" + fileName} />
      </div>
      <span className="font-light">{elementName}</span>
    </div>
  );
}

function FormElementsContainer() {
  const [formElementsCollection, setFormElementsCollection] = useState([
    { elementName: "Text Field", icon: "textIcon.svg" },
    { elementName: "Phone Number", icon: "phoneIcon.svg" },
    { elementName: "Text Area", icon: "textAreaIcon.svg" },
    { elementName: "File Upload", icon: "fileUploadIcon.svg" },
    { elementName: "Date", icon: "calenderIcon.svg" },
    { elementName: "Radio Buttons", icon: "radioIcon.svg" },
    { elementName: "Yes / No", icon: "decisionIcon.svg" },
  ]);

  const [filteredEl, setFilteredEl] = useState([
    { elementName: "Text Field", icon: "textIcon.svg" },
    { elementName: "Phone Number", icon: "phoneIcon.svg" },
    { elementName: "Text Area", icon: "textAreaIcon.svg" },
    { elementName: "File Upload", icon: "fileUploadIcon.svg" },
    { elementName: "Date", icon: "calenderIcon.svg" },
    { elementName: "Radio Buttons", icon: "radioIcon.svg" },
    { elementName: "Yes / No", icon: "decisionIcon.svg" },
  ]);

  const handleSearch = (val) => {
    if (val) {
      let filteredCol = formElementsCollection.filter((item) =>
        item.elementName.toLocaleLowerCase().includes(val.toLocaleLowerCase())
      );
      setFilteredEl(filteredCol);
    } else {
      setFilteredEl([...formElementsCollection]);
    }
  };

  return (
    <div className="w-full px-8 py-6 gap-5 flex flex-col">
      <h2 className="font-semibold">Form Elements</h2>
      <input
        type="search"
        className="border border-zinc-200 p-2 rounded outline-sky-400 outline-offset-0"
        placeholder="Search elements"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div className="flex flex-col mt-2 gap-8">
        {filteredEl.map((item, index) => (
          <FormElement
            elementName={item["elementName"]}
            fileName={item["icon"]}
            key={index.toString() + item["elementName"] + index.toString()}
          />
        ))}
      </div>
    </div>
  );
}

export default FormElementsContainer;
