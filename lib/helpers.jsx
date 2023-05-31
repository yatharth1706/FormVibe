export function renderFormElement(name, label, onLabelChange, disabled) {
  switch (name) {
    case "Text Field":
      return (
        <div className="flex flex-col gap-2 w-full">
          <input
            type="text"
            value={label}
            onChange={onLabelChange}
            placeholder="Enter label name here"
            className="text-gray-700 text-lg font-semibold outline-none"
          />
          <input
            type="text"
            className="border-b border-gray-400 py-4 outline-none bg-white cursor-pointer"
            placeholder="Enter answer here "
            disabled={disabled}
          />
        </div>
      );
    case "File Upload":
      return (
        <div className="flex flex-col gap-2 w-full">
          <input
            type="text"
            value={label}
            onChange={onLabelChange}
            placeholder="Enter label name here"
            className="text-gray-700 text-lg font-semibold outline-none"
          />
          <div className="flex justify-center items-center border border-dotted border-gray-400 h-48 w-full">
            <input
              type="file"
              className="border-b border-gray-400 bg-white cursor-pointer py-4 outline-none"
              placeholder="Enter answer here "
              disabled={disabled}
            />
          </div>
        </div>
      );
    case "Date":
      return (
        <div className="flex flex-col gap-2 w-full">
          <input
            placeholder="Enter label name here"
            type="text"
            value={label}
            onChange={onLabelChange}
            className="text-gray-700 text-lg  font-semibold outline-none"
          />
          <input
            type="date"
            className="border-b border-gray-400 bg-white cursor-pointer py-4 outline-none"
            placeholder="Enter answer here "
            disabled={disabled}
          />
        </div>
      );
    default:
      return <div className="flex flex-col gap-3">Work in progress</div>;
  }
}
