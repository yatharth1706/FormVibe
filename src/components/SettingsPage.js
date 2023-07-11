import { PencilIcon } from "lucide-react";

export default function SettingsPage({
  formBannerPreview,
  handleFormBannerChange,
  formIconPreview,
  handleFormIconChange,
  formName,
  setFormName,
  setInitialRender,
  formDescription,
  setFormDescription,
  formType,
  setFormType,
}) {
  return (
    <div className="flex flex-col gap-4 w-11/12 mx-auto p-8">
      <h2 className="font-semibold">Form Appearance</h2>
      <div className="flex flex-col gap-8 items-center w-full border border-zinc-200 rounded bg-white pb-10">
        <div className="flex text-gray-600 gap-2 justify-center items-center h-56 w-full bg-slate-200 hover:bg-slate-300 cursor-pointer border border-zinc-200 border-dashed relative">
          {formBannerPreview && (
            <img
              src={formBannerPreview}
              className="w-full h-full object-cover"
            />
          )}
          {!formBannerPreview && (
            <>
              <PencilIcon className="w-5 h-5" />
            </>
          )}
          <input
            type="file"
            id="formBanner"
            className="w-full h-full absolute inset-0 opacity-0"
            onChange={handleFormBannerChange}
          />
        </div>
        <div className="bg-white border border-[#efefef] rounded flex -mt-16 z-20 gap-4 flex-grow px-16 py-8 w-8/12">
          <div className="border border-dashed boder flex justify-center items-center w-28 h-20 rounded hover:bg-slate-100 cursor-pointer border-zinc-300 relative">
            {formIconPreview && (
              <img
                src={formIconPreview}
                className="w-full h-full object-contain"
              />
            )}
            {!formIconPreview && (
              <img
                src="/assets/icons/ImageUpload.svg"
                alt="Upload Banner Image"
              />
            )}
            <input
              type="file"
              id="formIcon"
              className="absolute w-full h-full inset-0 opacity-0"
              onChange={handleFormIconChange}
            />
          </div>
          <div className="flex flex-col flex-grow w-full gap-1 ">
            <input
              type="text"
              value={formName}
              placeholder="Enter form name here"
              onChange={(e) => {
                setFormName(e.target.value);
                setInitialRender(false);
              }}
              className="outline-none py-2 font-semibold text-gray-600 text-lg"
            />

            <input
              type="text"
              value={formDescription}
              placeholder="Enter some description for the form (optional)"
              onChange={(e) => {
                setFormDescription(e.target.value);
                setInitialRender(false);
              }}
              className="text-gray-500 w-full outline-none py-2"
            />
          </div>
        </div>
      </div>
      <h2 className="fon">Render form as </h2>
      <select
        className="p-3 rounded bg-white border border-gray-200 outline-sky-400"
        value={formType}
        onChange={(e) => {
          setInitialRender(false);
          setFormType(e.target.value);
        }}
      >
        <option>Airtable</option>
        <option>Typeform</option>
      </select>
    </div>
  );
}
