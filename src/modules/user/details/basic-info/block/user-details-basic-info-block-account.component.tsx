import React, { FC } from "react";
import ButtonComponent from "../../../../../common/components/button/button.component";
import ConfirmationModalComponent from "../../../../../common/components/modal/confirmation/confirmation-modal.component";
import { useUserDetailsContext } from "../../common/context/user-details.context";

type UserDetailsBasicInfoDeleteProps = {
  isOpen: boolean;
  onClose: () => void;
  onBlockAccountConfirm: () => void;
};

const UserDetailsBasicInfoBlockAccountComponent: FC<UserDetailsBasicInfoDeleteProps> =
  (props) => {
    const { userData } = useUserDetailsContext();

    return (
      <ConfirmationModalComponent
        isOpen={props.isOpen}
        onCloseClick={props.onClose}
        header={{ title: "Are you sure you want to block an account?" }}
        confirmButton={
          <ButtonComponent type="danger" onClick={props.onBlockAccountConfirm}>
            Block
          </ButtonComponent>
        }
      >
        <div>
          User:{" "}
          <strong>{`${userData?.firstName} ${userData?.lastName} (${userData?.email})`}</strong>
        </div>
        <div>User will not be able to log into his account</div>
      </ConfirmationModalComponent>
    );
  };

export default UserDetailsBasicInfoBlockAccountComponent;
