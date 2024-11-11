import { RouterProvider } from "react-router-dom";
import { routers } from "./route";
import { GlobalContextProvider } from "./context/Global";
import { SettingContextProvider } from "./context/Settings";
import { Notification } from "./component/common/Notification";

function App() {
  return (
    <GlobalContextProvider>
      <SettingContextProvider>
        <RouterProvider router={routers} />
        <Notification />
      </SettingContextProvider>
    </GlobalContextProvider>
  );
}

export default App;
