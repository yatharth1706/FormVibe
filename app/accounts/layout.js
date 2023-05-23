import NavigationBar from "@/components/NavigationBar";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "FormVibe Account Dashboard",
  description: "Interactive Form Creation Dashboard",
};

export default function AccountsLayout({ children }) {
  return (
    <div>
      <NavigationBar />
      <div>
        <Sidebar />
        <div>{children}</div>
      </div>
    </div>
  );
}
