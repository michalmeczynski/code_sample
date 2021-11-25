import React, { FC, useEffect, useState } from "react";
import AsideComponent from "../../../../../common/components/aside/aside.component";
import ButtonComponent from "../../../../../common/components/button/button.component";
import DateTimePickerComponent from "../../../../../common/components/date-time-picker/date-time-picker.component";
import FormFieldComponent from "../../../../../common/components/form/field/form-field.component";
import SelectComponent from "../../../../../common/components/form/select/select.component";
import userEventsAccessApiService from "../common/api/user-events-access-api.service";
import userEventAccessFactory from "../common/factory/user-event-access.factory";
import UserDetailsAvailableEvent from "../common/types/user-details-avaiable-event";
import UserDetailsAvailableEventPackageSelectOption from "../common/types/user-details-available-event-package-select-option";
import UserDetailsAvailableEventSelectOption from "../common/types/user-details-available-event-select-option";
import UserDetailsEventAccess from "../common/types/user-details-event-access";

type UserEventsAccessAddProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddNewEventAccessSuccess: (newEventAccess: UserDetailsEventAccess) => void;
};

const UserEventsAccessAddComponent: FC<UserEventsAccessAddProps> = (props) => {
  const [isFetchingAvailableEventList, setIsFetchingAvailableEventList] =
    useState(false);

  const [availableEventList, setAvaiableEventList] = useState<
    UserDetailsAvailableEvent[]
  >([]);
  const [selectedEventOption, setSelectedEventOption] = useState<
    UserDetailsAvailableEventSelectOption | undefined
  >(undefined);
  const [selectedPackageOption, setSelectedPackageOption] = useState<
    UserDetailsAvailableEventPackageSelectOption[]
  >([]);
  const [fromDate, setFromDate] = useState<Date | undefined>(new Date());
  const [toDate, setToDate] = useState<Date | undefined>(undefined);

  const clearInputs = () => {
    setSelectedEventOption(undefined);
    setSelectedPackageOption([]);
    setFromDate(undefined);
    setToDate(undefined);
  };

  useEffect(() => {
    if (!props.isOpen) {
      clearInputs();
      return;
    }
    setIsFetchingAvailableEventList(true);

    userEventsAccessApiService.fetchAvailableEventsList().then((response) => {
      setAvaiableEventList(response);
      setIsFetchingAvailableEventList(false);
    });
  }, [props.isOpen]);

  const shouldRenderPackageSelect =
    !!selectedEventOption?.value.packages.length;

  const eventSelectOptions =
    userEventAccessFactory.getAvailableEventSelectOptions(availableEventList);

  const eventPackageSelectOptions =
    userEventAccessFactory.getAvailableEventPackageSelectOptions(
      selectedEventOption?.value.packages ?? []
    );

  const onAddButtonClick = () => {
    // TODO: api call and then

    if (!selectedEventOption || !fromDate) {
      return;
    }

    const newEventAccess: UserDetailsEventAccess = {
      event: selectedEventOption.value,
      validity: {
        from: fromDate,
        to: toDate,
      },
    };

    props.onAddNewEventAccessSuccess(newEventAccess);
  };

  return (
    <AsideComponent
      header={{ title: "Add new access" }}
      isOpen={props.isOpen}
      onCloseClick={props.onClose}
      footer={{
        buttons: [
          <ButtonComponent onClick={onAddButtonClick} type="success">
            Add
          </ButtonComponent>,
        ],
      }}
      isLoading={isFetchingAvailableEventList}
    >
      <FormFieldComponent label={"Event"} isRequired>
        <SelectComponent
          options={eventSelectOptions}
          onChange={(option) =>
            setSelectedEventOption(
              option as UserDetailsAvailableEventSelectOption
            )
          }
          value={selectedEventOption}
        />
      </FormFieldComponent>
      {shouldRenderPackageSelect && (
        <FormFieldComponent label={"Packages"}>
          <SelectComponent
            options={eventPackageSelectOptions}
            isMulti
            onChange={(options) =>
              setSelectedPackageOption(
                options as UserDetailsAvailableEventPackageSelectOption[]
              )
            }
            value={selectedPackageOption}
          />
        </FormFieldComponent>
      )}
      <FormFieldComponent label={"From"} isRequired>
        <DateTimePickerComponent onChange={setFromDate} date={fromDate} />
      </FormFieldComponent>
      <FormFieldComponent label={"To"}>
        <DateTimePickerComponent onChange={setToDate} date={toDate} />
      </FormFieldComponent>
    </AsideComponent>
  );
};

export default UserEventsAccessAddComponent;
