import faker from "faker";
import { createContext, ReactNode, useContext, useState } from "react";
import useLayoutBreakpoint from "./common/hooks/use-layout-breakpoint";
import User from "./common/types/user";

type AppContextProps = {
  user: User;
  setUser: (user: User) => void;
  isAsidePanelExpanded: boolean;
  setIsAsidePanelExpanded: (isAsidePanelExpanded: boolean) => void;
  toggleAsidePanelExpand: () => void;
};

const AppContext = createContext<AppContextProps | null>(null);

export const useAppContext = () => {
  const ctx = useContext(AppContext);

  if (ctx === undefined || ctx === null) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }
  return ctx;
};

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
  });
  const [isAsidePanelExpanded, setIsAsidePanelExpanded] = useState(
    useLayoutBreakpoint<boolean>({
      default: false,
      mid: false,
    })
  );

  const toggleAsidePanelExpand = () => {
    setIsAsidePanelExpanded((curr) => !curr);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isAsidePanelExpanded,
        setIsAsidePanelExpanded,
        toggleAsidePanelExpand,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
