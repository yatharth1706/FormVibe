import { Check, Trash2, Trash2Icon, UploadIcon, X } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import the default CSS styles

export function renderFinalFormElements(
  name,
  label,
  value,
  handleValueChange,
  optionsList,
  isItYes,
  handleYesNo
) {
  switch (name) {
    case "Text Field":
      return (
        <div
          className="flex flex-col gap-2 w-full "
          style={{
            position: "relative",
          }}
        >
          <label className="text-gray-700 text-lg font-semibold outline-none">
            {label}
          </label>
          <input
            type="text"
            className="border-b border-zinc-200 py-4 outline-none bg-white "
            placeholder="Enter answer here "
            value={value}
            onChange={handleValueChange}
          />
        </div>
      );
    case "File Upload":
      return (
        <div
          className="flex flex-col gap-2 w-full  "
          style={{
            position: "relative",
          }}
        >
          <label className="text-gray-700 text-lg font-semibold outline-none">
            {label}
          </label>
          <div className="h-44 w-full border border-zinc-200 rounded p-8 flex flex-col gap-3 justify-center items-center bg-sky-50">
            <UploadIcon />
            <p>Select file to upload</p>
          </div>
        </div>
      );
    case "Date":
      return (
        <div
          className="flex flex-col gap-2 w-full "
          style={{
            position: "relative",
          }}
        >
          <label className="text-gray-700 text-lg font-semibold outline-none">
            {label}
          </label>
          <input
            type="date"
            className="border-b border-zinc-200 bg-white  py-4 outline-none"
            placeholder="Enter answer here "
            value={value}
            onChange={handleValueChange}
          />
        </div>
      );
    case "Phone Number":
      return (
        <div
          className="flex flex-col gap-6 w-full"
          style={{
            position: "relative",
          }}
        >
          <label className="text-gray-700 text-lg font-semibold outline-none">
            {label}
          </label>
          <PhoneInput
            country={"in"} // Set the default country
            inputStyle={{
              width: "100%",
            }}
            value={value}
            onChange={(value) => handleValueChange({}, value)}
          />
        </div>
      );
    case "Text Area":
      return (
        <div
          className="flex flex-col gap-6 w-full"
          style={{
            position: "relative",
          }}
        >
          <label className="text-gray-700 text-lg font-semibold outline-none">
            {label}
          </label>
          <textarea
            className="border border-zinc-200 rounded p-2 h-32 resize-none"
            value={value}
            onChange={handleValueChange}
          />
        </div>
      );

    case "Radio Buttons":
      return (
        <div
          className="flex flex-col gap-6 w-full"
          style={{
            position: "relative",
          }}
        >
          <label
            className="text-gray-700 text-lg font-semibold outline-none"
            for={label}
          >
            {label}
          </label>
          {(optionsList ?? []).map((opt, index) => (
            <div className="flex gap-3 items-center">
              <input
                id={`${label}-${index}`}
                name={label}
                type="radio"
                value={opt}
                onChange={handleValueChange}
              />
              <label className="text-gray-700 text-lg font-semibold outline-none">
                {opt}
              </label>
            </div>
          ))}
        </div>
      );

    case "Yes / No":
      return (
        <div
          className="flex flex-col gap-6 w-full"
          style={{
            position: "relative",
          }}
        >
          <label className="text-gray-700 text-lg font-semibold outline-none">
            {label}
          </label>
          <div
            className={
              "flex gap-3 items-center border border-zinc-200 rounded p-3 hover:bg-slate-200 " +
              (isItYes === true ? "bg-slate-200" : "")
            }
            onClick={() => {
              handleYesNo("Yes");
              handleValueChange({}, "Yes");
            }}
          >
            <Check />
            Yes
          </div>
          <div
            className={
              "flex gap-3 items-center border border-zinc-200 rounded p-3 hover:bg-slate-200 " +
              (isItYes === false ? "bg-slate-200" : "")
            }
            onClick={() => {
              handleYesNo("No");
              handleValueChange({}, "Yes");
            }}
          >
            <X />
            No
          </div>
        </div>
      );
    default:
      return <div className="flex flex-col gap-3">Work in progress</div>;
  }
}
