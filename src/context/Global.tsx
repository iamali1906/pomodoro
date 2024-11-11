export interface IGlobalContext {
  openSideBar: boolean;
  handleOpenSidebar: (open: boolean) => void;
  notification: Notificaiton;
  openNotification: (notification: Notificaiton) => void;
  closeNotification: () => void;
}

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Notificaiton } from "../util/types";

const GlobalContext = createContext<IGlobalContext | undefined>(undefined);

export const GlobalContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [openSideBar, setIsSidebarOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<Notificaiton>({
    open: false,
    message: "",
    type: null,
  });

  const openNotification = (notification: Notificaiton) =>
    setNotification(notification);
  const closeNotification = () =>
    setNotification({ open: false, message: "", type: null });
  const handleOpenSidebar = (open: boolean) => setIsSidebarOpen(open);

  return (
    <GlobalContext.Provider
      value={{
        openSideBar,
        handleOpenSidebar,
        openNotification,
        closeNotification,
        notification,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): IGlobalContext => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
};
