import { Trash2, Trash2Icon } from "lucide-react";

export function renderFinalFormElements(name, label, value, handleValueChange) {
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
            className="border-b border-gray-400 py-4 outline-none bg-white "
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
          <div className="flex justify-center items-center border border-dotted border-gray-400 h-48 w-full">
            <input
              type="file"
              className="border-b border-gray-400 bg-white  py-4 outline-none"
              placeholder="Enter answer here "
              value={value}
              onChange={handleValueChange}
            />
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
            className="border-b border-gray-400 bg-white  py-4 outline-none"
            placeholder="Enter answer here "
            value={value}
            onChange={handleValueChange}
          />
        </div>
      );
    default:
      return <div className="flex flex-col gap-3">Work in progress</div>;
  }
}
