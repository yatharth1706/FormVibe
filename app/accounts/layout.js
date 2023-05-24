import NavigationBar from "@/components/NavigationBar";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "FormVibe Account Dashboard",
  description: "Interactive Form Creation Dashboard",
};

export default function AccountsLayout({ children }) {
  return (
    <div className="flex flex-col w-full">
      <NavigationBar />
      <div className="flex w-full">
        <Sidebar />
        <div>{children}</div>
      </div>
    </div>
  );
}
