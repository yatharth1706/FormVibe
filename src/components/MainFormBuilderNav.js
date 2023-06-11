import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BuilderFormNav({
  setTab,
  tab,
  formSlug,
  updateFormMetaData,
}) {
  const router = useRouter();
  return (
    <div className="flex gap-5 items-center px-9 py-7 h-8 w-full border-b border-zinc-300">
      <img
        src="/assets/icons/backIcon.svg"
        alt="Back Icon"
        onClick={() => router.push("/app")}
        className="cursor-pointer"
      />

      <div className="flex gap-8 ml-4">
        <div
          className="cursor-pointer relative flex flex-col gap-2 justify-center items-center"
          onClick={() => setTab("Form")}
        >
          <span className={tab === "Form" ? "font-bold" : ""}>Form</span>
          {tab === "Form" && (
            <img
              src="/assets/UnderLine.png"
              className="w-16 h-[2px] absolute -bottom-2"
            />
          )}
        </div>
        <div
          className="cursor-pointer relative flex flex-col gap-2 justify-center items-center"
          onClick={() => setTab("Share")}
        >
          <span className={tab === "Share" ? "font-bold" : ""}>Share</span>
          {tab === "Share" && (
            <img
              src="/assets/UnderLine.png"
              className="w-16 h-[2px] absolute -bottom-2"
            />
          )}
        </div>
        <div
          className="cursor-pointer relative flex flex-col gap-2 justify-center items-center"
          onClick={() => setTab("Settings")}
        >
          <span className={tab === "Settings" ? "font-bold" : ""}>
            Settings
          </span>
          {tab === "Settings" && (
            <img
              src="/assets/UnderLine.png"
              className="w-16 h-[2px] absolute -bottom-2"
            />
          )}
        </div>
      </div>
      <div className="flex ml-auto gap-4 items-center">
        <span>Auto saved</span>
        <Link href={"/" + formSlug} target="_blank">
          <button className="btn-secondary">Preview</button>
        </Link>
        <button
          className="btn-primary"
          onClick={() => updateFormMetaData("save")}
        >
          Save
        </button>
      </div>
    </div>
  );
}
