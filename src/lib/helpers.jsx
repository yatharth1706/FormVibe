import { Trash2Icon, UploadIcon, Check, X } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import the default CSS styles

export function renderFormElement(
  index,
  name,
  label,
  onLabelChange,
  disabled,
  handleDelete,
  optionsList,
  handleDeleteRadioOption,
  handleRadioOptions,
  handleOptionChange,
  handleActiveFormElement,
  currActiveFormEl
) {
  const isActive = index === currActiveFormEl;
  console.log(isActive, name);
  switch (name) {
    case "Text Field":
      return (
        <div
          key={index.toString() + name}
          className={
            "flex flex-col gap-6 w-full rounded p-8  hover:shadow border border-zinc-200 cursor-pointer hover:border-green-400 " +
            (isActive ? " border-sky-400" : "")
          }
          style={{
            position: "relative",
            boxShadow: "2px 2px 15px rgba(32, 161, 255, 0.20)",
          }}
          onClick={handleActiveFormElement}
        >
          <input
            type="text"
            value={label}
            onChange={onLabelChange}
            placeholder="Enter label name here"
            className="text-gray-700 text-lg font-semibold outline-none"
          />
          <input
            type="text"
            className="border-b border-gray-200 py-4 outline-none bg-white cursor-pointer"
            placeholder="Enter answer here "
            disabled={disabled}
          />
          <Trash2Icon
            className="w-4 absolute cursor-pointer right-4 top-4"
            onClick={handleDelete}
          />
        </div>
      );
    case "File Upload":
      return (
        <div
          key={index.toString() + name}
          className={
            "flex flex-col gap-6 w-full p-8 border border-zinc-200 hover:border-green-400 " +
            (isActive === true ? "border border-sky-400 " : "")
          }
          style={{
            position: "relative",
            boxShadow: "2px 2px 15px rgba(32, 161, 255, 0.20)",
          }}
          onClick={handleActiveFormElement}
        >
          <input
            type="text"
            value={label}
            onChange={onLabelChange}
            placeholder="Enter label name here"
            className="text-gray-700 text-lg font-semibold outline-none"
          />
          <div className="h-44 w-full border border-zinc-200 rounded p-8 flex flex-col gap-3 justify-center items-center bg-sky-50">
            <UploadIcon />
            <p>Select file to upload</p>
          </div>

          <Trash2Icon
            className="w-4 absolute cursor-pointer right-4 top-4"
            onClick={handleDelete}
          />
        </div>
      );
    case "Date":
      return (
        <div
          key={index.toString() + name}
          className={
            "flex flex-col gap-6 w-full p-8 border border-zinc-200 hover:border-green-400 " +
            (isActive ? "border-sky-400" : "")
          }
          style={{
            position: "relative",
            boxShadow: "2px 2px 15px rgba(32, 161, 255, 0.20)",
          }}
          onClick={handleActiveFormElement}
        >
          <input
            placeholder="Enter label name here"
            type="text"
            value={label}
            onChange={onLabelChange}
            className="text-gray-700 text-lg  font-semibold outline-none"
          />
          <input
            type="date"
            className="border-b border-gray-200 bg-white cursor-pointer py-4 outline-none"
            placeholder="Enter answer here "
            disabled={disabled}
          />
          <Trash2Icon
            className="w-4 absolute cursor-pointer right-4 top-4"
            onClick={handleDelete}
          />
        </div>
      );
    case "Phone Number":
      return (
        <div
          key={index.toString() + name}
          className={
            "flex flex-col gap-6 w-full p-8 border border-zinc-200 hover:border-green-400 " +
            (isActive ? "border-sky-400" : "")
          }
          style={{
            position: "relative",
            boxShadow: "2px 2px 15px rgba(32, 161, 255, 0.20)",
          }}
          onClick={handleActiveFormElement}
        >
          <input
            placeholder="Enter label name here"
            type="text"
            value={label}
            onChange={onLabelChange}
            className="text-gray-700 text-lg  font-semibold outline-none"
          />
          <PhoneInput
            country={"in"} // Set the default country
            inputStyle={{
              width: "100%",
            }}
            disabled
          />
          <Trash2Icon
            className="w-4 absolute cursor-pointer right-4 top-4"
            onClick={handleDelete}
          />
        </div>
      );
    case "Text Area":
      return (
        <div
          key={index.toString() + name}
          className={
            "flex flex-col gap-6 w-full p-8 border border-zinc-200 hover:border-green-400 " +
            (isActive ? "border-sky-400" : "")
          }
          style={{
            position: "relative",
            boxShadow: "2px 2px 15px rgba(32, 161, 255, 0.20)",
          }}
          onClick={handleActiveFormElement}
        >
          <input
            placeholder="Enter label name here"
            type="text"
            value={label}
            onChange={onLabelChange}
            className="text-gray-700 text-lg  font-semibold outline-none"
          />
          <textarea
            className="border border-zinc-200 rounded p-2 h-32 resize-none"
            disabled
          />
          <Trash2Icon
            className="w-4 absolute cursor-pointer right-4 top-4"
            onClick={handleDelete}
          />
        </div>
      );

    case "Radio Buttons":
      return (
        <div
          key={index.toString() + name}
          className={
            "flex flex-col gap-6 w-full p-8 border border-zinc-200 hover:border-green-400 " +
            (isActive ? "border-sky-400" : "")
          }
          style={{
            position: "relative",
            boxShadow: "2px 2px 15px rgba(32, 161, 255, 0.20)",
          }}
          onClick={handleActiveFormElement}
        >
          <input
            placeholder="Enter label name here"
            type="text"
            value={label}
            onChange={onLabelChange}
            className="text-gray-700 text-lg  font-semibold outline-none"
          />
          {(optionsList ?? []).map((opt, index) => (
            <div
              className="flex gap-3 items-center"
              key={(opt ?? "") + index.toString()}
            >
              <input type="radio" />
              <input
                placeholder="Enter label name here"
                type="text"
                value={opt}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="text-gray-700  font-semibold outline-none"
              />
              <Trash2Icon
                className="w-4 ml-3 cursor-pointer "
                onClick={() => handleDeleteRadioOption(index)}
              />
            </div>
          ))}

          <button className="btn-secondary w-36" onClick={handleRadioOptions}>
            Add more option
          </button>
          <Trash2Icon
            className="w-4 absolute cursor-pointer right-4 top-4"
            onClick={handleDelete}
          />
        </div>
      );

    case "Yes / No":
      return (
        <div
          key={index.toString() + name}
          className={
            "flex flex-col gap-6 w-full p-8 border border-zinc-200 hover:border-green-400 " +
            (isActive ? "border-sky-400" : "")
          }
          style={{
            position: "relative",
            boxShadow: "2px 2px 15px rgba(32, 161, 255, 0.20)",
          }}
          onClick={handleActiveFormElement}
        >
          <input
            placeholder="Enter label name here"
            type="text"
            value={label}
            onChange={onLabelChange}
            className="text-gray-700 text-lg  font-semibold outline-none"
          />
          <div className="flex gap-3 items-center border border-zinc-200 rounded p-3 hover:bg-slate-200">
            <Check />
            Yes
          </div>
          <div className="flex gap-3 items-center border border-zinc-200 rounded p-3 hover:bg-slate-200">
            <X />
            No
          </div>

          <Trash2Icon
            className="w-4 absolute cursor-pointer right-4 top-4"
            onClick={handleDelete}
          />
        </div>
      );
    default:
      return <div className="flex flex-col gap-3">Work in progress</div>;
  }
}
