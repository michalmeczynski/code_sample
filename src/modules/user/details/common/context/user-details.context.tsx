import { createContext, ReactNode, useContext, useState } from "react";
import UserData from "../types/user-data";

type UserDetailsContextProps = {
  isFetching: boolean;
  setIsFetching: (isFetching: boolean) => void;
  userData: UserData | undefined;
  setUserData: (userData: UserData) => void;
  setAccountActive: () => void;
  toggleAccountBlock: () => void;
  setAccountDeleted: () => void;
};

const UserDetailsContext = createContext<UserDetailsContextProps | null>(null);

export const useUserDetailsContext = () => {
  const ctx = useContext(UserDetailsContext);

  if (ctx === undefined || ctx === null) {
    throw new Error(
      "useUserDetailsContext must be used within a UserDetailsContextProvider"
    );
  }
  return ctx;
};

const UserDetailsContextProvider = ({ children }: { children: ReactNode }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [userData, setUserData] = useState<UserData | undefined>(undefined);

  const setAccountActive = () => {
    setUserData((curr) => ({ ...curr!, isActive: true }));
  };

  const setAccountDeleted = () => {
    setUserData((curr) => ({ ...curr!, isDeleted: true }));
  };

  const toggleAccountBlock = () => {
    setUserData((curr) => ({ ...curr!, isBlocked: !curr?.isBlocked }));
  };

  return (
    <UserDetailsContext.Provider
      value={{
        isFetching,
        setIsFetching,
        userData,
        setUserData,
        setAccountActive,
        setAccountDeleted,
        toggleAccountBlock,
      }}
    >
      {children}
    </UserDetailsContext.Provider>
  );
};

export default UserDetailsContextProvider;
