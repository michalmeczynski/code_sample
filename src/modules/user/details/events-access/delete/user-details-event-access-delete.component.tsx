import React, { FC } from "react";
import ButtonComponent from "../../../../../common/components/button/button.component";
import ConfirmationModalComponent from "../../../../../common/components/modal/confirmation/confirmation-modal.component";
import { useUserDetailsContext } from "../../common/context/user-details.context";
import UserDetailsEventAccess from "../common/types/user-details-event-access";

type UserDetailsEventAccessDeleteProps = {
  isOpen: boolean;
  onClose: () => void;
  eventAccess: UserDetailsEventAccess | undefined;
  onDeleteSuccess: () => void;
};
const UserDetailsEventAccessDeleteComponent: FC<UserDetailsEventAccessDeleteProps> =
  (props) => {
    const { userData } = useUserDetailsContext();

    const onDeleteButtonClick = () => {
      //TODO: api call and then

      props.onDeleteSuccess();
    };

    return (
      <ConfirmationModalComponent
        isOpen={props.isOpen}
        onCloseClick={props.onClose}
        header={{ title: "Are you sure you want to delete access?" }}
        confirmButton={
          <ButtonComponent type="danger" onClick={onDeleteButtonClick}>
            Delete
          </ButtonComponent>
        }
      >
        <div>
          Event: <strong>{`${props.eventAccess?.event.title}`}</strong>
        </div>
        <div>
          User:{" "}
          <strong>{`${userData?.firstName} ${userData?.lastName} (${userData?.email})`}</strong>
        </div>
      </ConfirmationModalComponent>
    );
  };

export default UserDetailsEventAccessDeleteComponent;
