import { Clock, Settings } from "lucide-react";
import { useGlobalContext } from "../../context/Global";
import { Button } from "../UI/Button";
import { useLocation, useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const { openSideBar, handleOpenSidebar } = useGlobalContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${
        openSideBar ? "translate-x-0" : "-translate-x-full"
      } w-64 bg-white shadow-md transition-transform duration-300 ease-in-out z-30 md:relative md:translate-x-0 min-h-screen`}
    >
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Pomodoro</h1>
        <nav className="space-y-2">
          <Button
            variant={pathname === "/" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => {
              navigate("/");
              handleOpenSidebar(false);
            }}
          >
            <Clock className="mr-2 h-4 w-4" /> Timer
          </Button>
          <Button
            variant={pathname === "/settings" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => {
              navigate("/settings");
              handleOpenSidebar(false);
            }}
          >
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Button>
        </nav>
      </div>
    </div>
  );
};
