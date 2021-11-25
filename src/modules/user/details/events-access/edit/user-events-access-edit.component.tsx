import { FC, useEffect, useState } from "react";
import AsideComponent from "../../../../../common/components/aside/aside.component";
import ButtonComponent from "../../../../../common/components/button/button.component";
import DateTimePickerComponent from "../../../../../common/components/date-time-picker/date-time-picker.component";
import FormFieldComponent from "../../../../../common/components/form/field/form-field.component";
import SelectComponent from "../../../../../common/components/form/select/select.component";
import userEventsAccessApiService from "../common/api/user-events-access-api.service";
import userEventAccessFactory from "../common/factory/user-event-access.factory";
import UserDetailsAvailableEventPackage from "../common/types/user-details-available-event-package";
import UserDetailsAvailableEventPackageSelectOption from "../common/types/user-details-available-event-package-select-option";
import UserDetailsAvailableEventSelectOption from "../common/types/user-details-available-event-select-option";
import UserDetailsEventAccess from "../common/types/user-details-event-access";

type UserEventsAccessEditProps = {
  isOpen: boolean;
  onClose: () => void;
  eventAccess: UserDetailsEventAccess | undefined;
};

const UserEventsAccessEditComponent: FC<UserEventsAccessEditProps> = (
  props
) => {
  const [
    isFetchingAvailableEventPackageList,
    setIsFetchingAvailableEventPackageList,
  ] = useState(false);
  const [eventPackageOptions, setEventPackageOptions] = useState<
    UserDetailsAvailableEventPackage[]
  >([]);
  const [selectedPackageOption, setSelectedPackageOption] = useState<
    UserDetailsAvailableEventPackageSelectOption[]
  >([]);
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (props.isOpen) {
      return;
    }

    clearInputs();
  }, [props.isOpen]);

  useEffect(() => {
    if (!props.isOpen || !props.eventAccess) {
      return;
    }

    setFromDate(props.eventAccess.validity.from);
    setToDate(props.eventAccess.validity.to);

    setIsFetchingAvailableEventPackageList(true);
    userEventsAccessApiService
      .fetchAvailableEventPackages()
      .then((response) => {
        setEventPackageOptions(response);
        setIsFetchingAvailableEventPackageList(false);
      });
  }, [props.isOpen, props.eventAccess]);

  const clearInputs = () => {
    setSelectedPackageOption([]);
    setFromDate(undefined);
    setToDate(undefined);
  };

  const shouldRenderPackageSelect = !!eventPackageOptions.length;

  const eventPackageSelectOptions =
    userEventAccessFactory.getAvailableEventPackageSelectOptions(
      eventPackageOptions
    );

  return (
    <AsideComponent
      header={{ title: "Edit access" }}
      isOpen={props.isOpen}
      onCloseClick={props.onClose}
      footer={{
        buttons: [
          <ButtonComponent onClick={() => {}} type="success">
            Save
          </ButtonComponent>,
        ],
      }}
      isLoading={isFetchingAvailableEventPackageList}
    >
      <FormFieldComponent label={"Event"}>
        {props.eventAccess?.event.title}
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

export default UserEventsAccessEditComponent;
