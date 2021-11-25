import { FC } from "react";
import UserDetailsContextProvider from "./common/context/user-details.context";
import UserDetailsComponent from "./user-details.component";

const UserDetailsSection: FC = () => {
  return (
    <UserDetailsContextProvider>
      <UserDetailsComponent />
    </UserDetailsContextProvider>
  );
};

export default UserDetailsSection;
