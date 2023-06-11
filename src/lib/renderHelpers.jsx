import { Check, Trash2, Trash2Icon, UploadIcon, X } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import the default CSS styles

export function renderFinalFormElements(
  index,
  name,
  label,
  value,
  handleValueChange,
  optionsList,
  isItYes,
  handleYesNo,
  handleFileChange,
  fileName,
  errorMessage
) {
  switch (name) {
    case "Text Field":
      return (
        <div
          key={index.toString() + name}
          className="flex flex-col gap-2 w-full "
          style={{
            position: "relative",
          }}
        >
          <label className="text-gray-700 text-lg font-semibold outline-none">
            {(index + 1).toString() + ". " + label}
          </label>
          <input
            type="text"
            className="border-b border-zinc-200 py-4 outline-none bg-white "
            placeholder="Enter answer here "
            value={value}
            onChange={handleValueChange}
          />
          {errorMessage && (
            <span className="text-red-500 text-xs">{errorMessage}</span>
          )}
        </div>
      );
    case "File Upload":
      return (
        <div
          key={index.toString() + name}
          className="flex flex-col gap-2 w-full  "
          style={{
            position: "relative",
          }}
        >
          <label className="text-gray-700 text-lg font-semibold outline-none">
            {(index + 1).toString() + ". " + label}
          </label>
          <div className="relative h-44 w-full border border-zinc-200 rounded p-8 flex flex-col gap-3 justify-center items-center bg-slate-100 hover:bg-slate-200">
            {fileName ? (
              <span>{fileName}</span>
            ) : (
              <>
                <UploadIcon />
                <p>Select file to upload</p>
              </>
            )}
            <input
              type="file"
              className="absolute w-full h-full opacity-0"
              onChange={handleFileChange}
            />
          </div>
          {errorMessage && (
            <span className="text-red-500 text-xs">{errorMessage}</span>
          )}
        </div>
      );
    case "Date":
      return (
        <div
          key={index.toString() + name}
          className="flex flex-col gap-2 w-full "
          style={{
            position: "relative",
          }}
        >
          <label className="text-gray-700 text-lg font-semibold outline-none">
            {(index + 1).toString() + ". " + label}
          </label>
          <input
            type="date"
            className="border-b border-zinc-200 bg-white  py-4 outline-none"
            placeholder="Enter answer here "
            value={value}
            onChange={handleValueChange}
          />
          {errorMessage && (
            <span className="text-red-500 text-xs">{errorMessage}</span>
          )}
        </div>
      );
    case "Phone Number":
      return (
        <div
          key={index.toString() + name}
          className="flex flex-col gap-6 w-full"
          style={{
            position: "relative",
          }}
        >
          <label className="text-gray-700 text-lg font-semibold outline-none">
            {(index + 1).toString() + ". " + label}
          </label>
          <PhoneInput
            country={"in"} // Set the default country
            inputStyle={{
              width: "100%",
            }}
            value={value}
            onChange={(value) => handleValueChange({}, value)}
          />
          {errorMessage && (
            <span className="text-red-500 text-xs">{errorMessage}</span>
          )}
        </div>
      );
    case "Text Area":
      return (
        <div
          key={index.toString() + name}
          className="flex flex-col gap-6 w-full"
          style={{
            position: "relative",
          }}
        >
          <label className="text-gray-700 text-lg font-semibold outline-none">
            {(index + 1).toString() + ". " + label}
          </label>
          <textarea
            className="border border-zinc-200 rounded p-2 h-32 resize-none"
            value={value}
            onChange={handleValueChange}
          />
          {errorMessage && (
            <span className="text-red-500 text-xs">{errorMessage}</span>
          )}
        </div>
      );

    case "Radio Buttons":
      return (
        <div
          key={index.toString() + name}
          className="flex flex-col gap-6 w-full"
          style={{
            position: "relative",
          }}
        >
          <label
            className="text-gray-700 text-lg font-semibold outline-none"
            for={label}
          >
            {(index + 1).toString() + ". " + label}
          </label>
          {(optionsList ?? []).map((opt, index) => (
            <div
              className="flex gap-3 items-center"
              key={(opt ?? "") + index.toString()}
            >
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
          {errorMessage && (
            <span className="text-red-500 text-xs">{errorMessage}</span>
          )}
        </div>
      );

    case "Yes / No":
      return (
        <div
          key={index.toString() + name}
          className="flex flex-col gap-6 w-full"
          style={{
            position: "relative",
          }}
        >
          <label className="text-gray-700 text-lg font-semibold outline-none">
            {(index + 1).toString() + ". " + label}
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
          {errorMessage && (
            <span className="text-red-500 text-xs">{errorMessage}</span>
          )}
        </div>
      );
    default:
      return <div className="flex flex-col gap-3">Work in progress</div>;
  }
}
