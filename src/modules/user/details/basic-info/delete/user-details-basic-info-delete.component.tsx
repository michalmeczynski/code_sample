import React, { FC } from "react";
import ButtonComponent from "../../../../../common/components/button/button.component";
import ConfirmationModalComponent from "../../../../../common/components/modal/confirmation/confirmation-modal.component";
import { useUserDetailsContext } from "../../common/context/user-details.context";

type UserDetailsBasicInfoDeleteProps = {
  isOpen: boolean;
  onClose: () => void;
  onDeleteAccountConfirm: () => void;
};

const UserDetailsBasicInfoDeleteAccountComponent: FC<UserDetailsBasicInfoDeleteProps> =
  (props) => {
    const { userData } = useUserDetailsContext();

    return (
      <ConfirmationModalComponent
        isOpen={props.isOpen}
        onCloseClick={props.onClose}
        header={{ title: "Are you sure you want to delete an account?" }}
        confirmButton={
          <ButtonComponent type="danger" onClick={props.onDeleteAccountConfirm}>
            Delete
          </ButtonComponent>
        }
      >
        <div>
          User:{" "}
          <strong>{`${userData?.firstName} ${userData?.lastName} (${userData?.email})`}</strong>
        </div>
        <div>Be careful! This process is irreversible</div>
      </ConfirmationModalComponent>
    );
  };

export default UserDetailsBasicInfoDeleteAccountComponent;
