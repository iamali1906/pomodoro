import React, { createContext, useContext, useState, ReactNode } from "react";
import { Settings } from "../types";

export interface ISettingContext {
  settings: Settings;
  setSettings: (settings: Settings) => void;
}

const SettingContext = createContext<ISettingContext | undefined>(undefined);

export const SettingContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<Settings>({
    shortBreakDuration: 5,
    longBreakDuration: 15,
    longBreakInterval: 1,
  });
  return (
    <SettingContext.Provider
      value={{
        settings,
        setSettings,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
};

export const useSettingContext = (): ISettingContext => {
  const context = useContext(SettingContext);
  if (context === undefined) {
    throw new Error(
      "useSettingContext must be used within a SettingContextProvider"
    );
  }
  return context;
};
