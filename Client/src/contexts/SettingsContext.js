import { createContext } from "react";
import { defaultSettings } from "../config";
import useLocalStorage from "../hooks/useLocalStorage";

const initialState = {
  ...defaultSettings,
  onToggleMode: () => {},
};

const SettingsContext = createContext(initialState);

const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useLocalStorage("settings", {
    themeMode: initialState.themeMode,
  });

  const onToggleMode = () => {
    setSettings({
      ...settings,
      themeMode: settings.themeMode === "light" ? "dark" : "light",
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings, // Mode
        onToggleMode,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export {SettingsContext};
export default SettingsProvider;