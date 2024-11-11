import { Menu } from "lucide-react";
import { useGlobalContext } from "../../context/Global";
import { Button } from "../UI/Button";
import { ReactNode } from "react";
import { Sidebar } from "../common/SideBar";

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  const { openSideBar, handleOpenSidebar } = useGlobalContext();

  return (
    <div className="flex flex-col md:flex-row bg-gray-100">
      {/* Mobile menu button */}
      <div className="md:hidden p-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleOpenSidebar(!openSideBar)}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Overlay for mobile */}
      {openSideBar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => handleOpenSidebar(false)}
        ></div>
      )}

      {/* Main content */}
      {children}
    </div>
  );
};

export default MainLayout;
