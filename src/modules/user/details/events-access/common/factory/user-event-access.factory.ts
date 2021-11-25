import UserDetailsEventAccess from "../types/user-details-event-access";
import UserDetailsEventAccessListResponse, {
  UserEventAccessResponseListItem,
} from "../api/user-event-access-list.response";
import UserDetailsAvailableEvent from "../types/user-details-avaiable-event";
import UserDetailsAvailableEventSelectOption from "../types/user-details-available-event-select-option";
import UserDetailsAvailableEventPackageSelectOption from "../types/user-details-available-event-package-select-option";
import UserDetailsAvailableEventPackage from "../types/user-details-available-event-package";

const getUserEventAccess = (
  responseEventAccess: UserEventAccessResponseListItem
): UserDetailsEventAccess => {
  return {
    ...responseEventAccess,
    validity: {
      from: new Date(responseEventAccess.validity.from),
      to: responseEventAccess.validity.to
        ? new Date(responseEventAccess.validity.to)
        : undefined,
    },
  };
};

const getUserEventAccessList = (
  response: UserDetailsEventAccessListResponse
) => {
  return response.map((responseItem) => {
    return getUserEventAccess(responseItem);
  });
};

const getAvailableEventSelectOptions = (
  availableEventList: UserDetailsAvailableEvent[]
): UserDetailsAvailableEventSelectOption[] => {
  return availableEventList.map((avaiblableEvent) => {
    const newSelectOption: UserDetailsAvailableEventSelectOption = {
      label: avaiblableEvent.title,
      value: avaiblableEvent,
    };
    return newSelectOption;
  });
};

const getAvailableEventPackageSelectOptions = (
  availableEventPackageList: UserDetailsAvailableEventPackage[]
): UserDetailsAvailableEventPackageSelectOption[] => {
  return availableEventPackageList.map((avaiblableEventPackage) => {
    const newSelectOption: UserDetailsAvailableEventPackageSelectOption = {
      label: avaiblableEventPackage.name,
      value: avaiblableEventPackage,
    };
    return newSelectOption;
  });
};

const userEventAccessFactory = {
  getUserEventAccessList,
  getAvailableEventSelectOptions,
  getAvailableEventPackageSelectOptions,
};

export default userEventAccessFactory;
