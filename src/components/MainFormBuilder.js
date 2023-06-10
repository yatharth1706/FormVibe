import { useState } from "react";
import { renderFormElement } from "../lib/helpers";
import FormBuilderSidebar from "./FormBuilderSidebar";
import { Switch } from "./ui/switch";
import { useDrop } from "react-dnd";

export default function MainFormBuilder({
  formElements,
  setFormElements,
  setInitialRender,
}) {
  const [currActiveFormElement, setCurrActiveFormElement] = useState(-1);
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "FORM_ELEMENT",
    drop: (item) => {
      // Handle the dropped form element here
      let newFormElement = {
        id: Date.now(),
        name: item.name,
        label: "Label",
        value: "",
        isRequired: true,
      };

      if (item?.name === "Radio Buttons") {
        newFormElement["optionsList"] = ["Option 1", "Option 2"];
      }

      setFormElements([...formElements, { ...newFormElement }]);
      setInitialRender(false);
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
  });

  const isActive = canDrop && isOver;

  const handleActiveFormElement = (index) => {
    setCurrActiveFormElement(index);
  };

  const handleOptionChange = (optIndex, value, index) => {
    setFormElements((prevFormElements) => {
      const updatedFormElements = [...prevFormElements];
      updatedFormElements[index]["optionsList"][optIndex] = value;
      return updatedFormElements;
    });
    setInitialRender(false);
  };

  const handleFormElementLabelChange = (index, event) => {
    const { value } = event.target;
    setFormElements((prevFormElements) => {
      const updatedFormElements = [...prevFormElements];
      updatedFormElements[index] = {
        ...updatedFormElements[index],
        label: value,
      };
      return updatedFormElements;
    });
    setInitialRender(false);
  };

  const handleDeleteOptions = (optIndex, elIndex) => {
    setFormElements((prevFormElements) => {
      const updatedFormElements = [...prevFormElements];
      updatedFormElements?.[elIndex]?.["optionsList"]?.splice(optIndex, 1);
      return updatedFormElements;
    });
    setInitialRender(false);
  };

  const handleDeleteFormElement = (e, index) => {
    e.stopPropagation(); // Stop event propagation

    setCurrActiveFormElement(-1);
    let existingFormEls = [...formElements];
    console.log(existingFormEls, index);
    existingFormEls.splice(index, 1);

    setFormElements([...existingFormEls]);
    setInitialRender(false);
  };

  const handleAddOptions = (index) => {
    setFormElements((prevFormElements) => {
      const updatedFormElements = [...prevFormElements];
      updatedFormElements?.[index]?.["optionsList"].push("Option");
      return updatedFormElements;
    });
    setInitialRender(false);
  };

  const handleIsRequiredChange = (currActiveFormElement, val) => {
    setFormElements((prevFormElements) => {
      const updatedFormElements = [...prevFormElements];
      updatedFormElements[currActiveFormElement]["isRequired"] = val;
      return updatedFormElements;
    });
    setInitialRender(false);
  };
  return (
    <div className="flex w-full h-full">
      <FormBuilderSidebar />
      <div className="w-9/12 border-r border-zinc-300 px-8 py-6 flex flex-col gap-4 bg-white overflow-y-auto ">
        <div
          className={
            "flex flex-col gap-8 p-8  items-center w-full rounded border bg-white h-[640px] overflow-auto" +
            (isActive ? " border border-blue-400 " : " ") +
            (formElements?.length > 0 ? " justify-start" : " justify-center")
          }
          ref={drop}
        >
          {formElements.map((el, index) =>
            renderFormElement(
              index,
              el.name,
              el.label,
              (event) => handleFormElementLabelChange(index, event),
              true,
              (e) => handleDeleteFormElement(e, index),
              el?.optionsList ?? [],
              (optIndex) => handleDeleteOptions(optIndex, index),
              () => handleAddOptions(index),
              (optIndex, value) => handleOptionChange(optIndex, value, index),
              () => handleActiveFormElement(index),
              currActiveFormElement
            )
          )}
          {!formElements.length > 0 && (
            <div className="rounded p-8 h-96 flex gap-3 justify-center items-center bg-white  w-full">
              <img
                src="/assets/icons/dragDropIcon.svg"
                alt="Drag and Drop Icon"
                className="w-8"
              />
              <span className="text-gray-500">
                Drag elements from left sidebar
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="w-3/12 p-8 flex flex-col gap-2">
        <div className="flex flex-col gap-3">
          <h1 className="font-medium">Settings</h1>
          <img src="/assets/UnderLine.png" className="w-28" />
        </div>

        <div>
          {currActiveFormElement === -1 && (
            <div className="flex flex-col mt-3 text-zinc-600">
              Select form element from the left to see its settings
            </div>
          )}
          {currActiveFormElement >= 0 && (
            <div className="flex items-center gap-4">
              <span>Is Required</span>

              <Switch
                checked={formElements?.[currActiveFormElement]?.["isRequired"]}
                onCheckedChange={(val) =>
                  handleIsRequiredChange(currActiveFormElement, val)
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
