import { FC, useState } from "react";
import CardComponent from "../../../../common/components/card/card.component";
import FormFieldComponent from "../../../../common/components/form/field/form-field.component";
import Icon from "../../../../common/components/icons/icon";
import SwitchComponent from "../../../../common/components/switch/switch.component";
import dateService from "../../../../common/utils/date/date.service";
import { useUserDetailsContext } from "../common/context/user-details.context";
import UserDetailsBasicInfoBlockAccountComponent from "./block/user-details-basic-info-block-account.component";
import UserDetailsBasicInfoDeleteAccountComponent from "./delete/user-details-basic-info-delete.component";

type UserDetailsBasicInfoProps = {};

const UserDetailsBasicInfoComponent: FC<UserDetailsBasicInfoProps> = () => {
  const { userData, setAccountActive, toggleAccountBlock, setAccountDeleted } =
    useUserDetailsContext();
  const [isBlockAccountModalOpen, setIsBlockAccountModalOpen] = useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false);

  const openBlockAccountModal = () => {
    setIsBlockAccountModalOpen(true);
  };

  const closeBlockAccountModal = () => {
    setIsBlockAccountModalOpen(false);
  };

  const openDeleteAccountModal = () => {
    setIsDeleteAccountModalOpen(true);
  };

  const closeDeleteAccountModal = () => {
    setIsDeleteAccountModalOpen(false);
  };

  const onBlockAccountChange = () => {
    if (userData?.isBlocked) {
      toggleAccountBlock();
      return;
    }

    openBlockAccountModal();
  };

  const onBlockAccountConfirm = () => {
    // TODO: api call and then
    closeBlockAccountModal();
    toggleAccountBlock();
  };

  const onDeleteAccountConfirm = () => {
    // TODO: api call and then
    closeDeleteAccountModal();
    setAccountDeleted();
  };

  if (!userData) {
    return null;
  }

  const fullName = `${userData.firstName} ${userData.lastName}`;

  const isActiveSwitchDisabled = userData.isActive || userData.isDeleted;
  const isBlockSwitchDisabled = userData.isDeleted;

  return (
    <>
      <CardComponent header={{ title: "Basic Informations", icon: Icon.user }}>
        <FormFieldComponent label="User ID">{`${userData.id} (${userData.uid})`}</FormFieldComponent>
        <FormFieldComponent label="Full name">{fullName}</FormFieldComponent>
        <FormFieldComponent label="Email">{userData.email}</FormFieldComponent>
        <FormFieldComponent label="Creation date">
          {dateService.getDateTimeString(userData.creationDate)}
        </FormFieldComponent>
        <FormFieldComponent label="Active">
          <SwitchComponent
            isChecked={userData.isActive}
            onChange={setAccountActive}
            isDisabled={isActiveSwitchDisabled}
            title={
              userData.isDeleted
                ? `Cannot block deleted account`
                : userData.isActive
                ? `Cannot manually change account active`
                : `Click to activate an account`
            }
          />
        </FormFieldComponent>
        <FormFieldComponent label="Email subscription">
          <SwitchComponent
            isChecked={userData.isAgreedForEmailSubscription}
            onChange={() => {}}
            isDisabled
            title={`Cannot manually change email subscription`}
          />
        </FormFieldComponent>
        <FormFieldComponent label="Blocked">
          <SwitchComponent
            type="danger"
            isChecked={userData.isBlocked}
            onChange={onBlockAccountChange}
            isDisabled={isBlockSwitchDisabled}
            title={
              userData.isDeleted
                ? `Cannot block deleted account`
                : userData.isBlocked
                ? `Click to unblock an account`
                : `Click to block an account`
            }
          />
        </FormFieldComponent>
        <FormFieldComponent label="Deleted">
          <SwitchComponent
            type="danger"
            isChecked={userData.isDeleted}
            onChange={openDeleteAccountModal}
            isDisabled={userData.isDeleted}
            title={
              userData.isDeleted
                ? `Cannot restore an account`
                : `Click to delete an account`
            }
          />
        </FormFieldComponent>
      </CardComponent>
      <UserDetailsBasicInfoBlockAccountComponent
        isOpen={isBlockAccountModalOpen}
        onClose={closeBlockAccountModal}
        onBlockAccountConfirm={onBlockAccountConfirm}
      />
      <UserDetailsBasicInfoDeleteAccountComponent
        isOpen={isDeleteAccountModalOpen}
        onClose={closeDeleteAccountModal}
        onDeleteAccountConfirm={onDeleteAccountConfirm}
      />
    </>
  );
};

export default UserDetailsBasicInfoComponent;
