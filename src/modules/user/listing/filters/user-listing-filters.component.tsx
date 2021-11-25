import { FC } from "react";
import ButtonComponent from "../../../../common/components/button/button.component";
import DatePickerComponent from "../../../../common/components/date-picker/date-picker.component";
import FormFieldComponent from "../../../../common/components/form/field/form-field.component";
import InputComponent from "../../../../common/components/form/input/input.component";
import SelectOption from "../../../../common/components/form/select/select-option";
import SelectComponent from "../../../../common/components/form/select/select.component";
import Column from "../../../../common/components/grid/column";
import Row from "../../../../common/components/grid/row";
import UserListingFilters from "../common/types/user-listing-filters";

type UserListingFiltersProps = {
  isVisible: boolean;
  filters: UserListingFilters;
  onFiltersChange: (filters: UserListingFilters) => void;
  onApplyFiltersClick: () => void;
  onClearFiltersClick: () => void;
  isApplyFiltersButtonDisabled: boolean;
  isClearFiltersButtonDisabled: boolean;
};

const UserListingFiltersComponent: FC<UserListingFiltersProps> = (props) => {
  const onIdFilterChange = (id: string | undefined) => {
    const newFilters = { ...props.filters };

    newFilters.id = id || undefined;

    props.onFiltersChange(newFilters);
  };

  const onEmailFilterChange = (email: string | undefined) => {
    const newFilters = { ...props.filters };

    newFilters.email = email || undefined;

    props.onFiltersChange(newFilters);
  };

  const onNameFilterChange = (name: string | undefined) => {
    const newFilters = { ...props.filters };

    newFilters.name = name || undefined;

    props.onFiltersChange(newFilters);
  };

  const onCreatedAtFromFilterChange = (date: Date | undefined) => {
    const newFilters = { ...props.filters };

    newFilters.createdAt = {
      from: date,
      to: newFilters.createdAt?.to,
    };

    props.onFiltersChange(newFilters);
  };

  const onCreatedAtToFilterChange = (date: Date | undefined) => {
    const newFilters = { ...props.filters };

    newFilters.createdAt = {
      from: newFilters.createdAt?.from,
      to: date,
    };

    props.onFiltersChange(newFilters);
  };

  const onActiveFilterChange = (
    value: SelectOption<any> | SelectOption<any>[] | undefined
  ) => {
    const newFilters = { ...props.filters };

    const selectedValue = value as SelectOption<any> | undefined;

    newFilters.isActive = selectedValue?.value;

    props.onFiltersChange(newFilters);
  };

  if (!props.isVisible) {
    return null;
  }

  return (
    <div className="filters">
      <div className="filters_header d-flex justify-content-between align-items-center">
        <div className="filters_header__title ">Filters</div>
        <div className="filters_header__actions d-flex">
          <ButtonComponent
            type="brand"
            onClick={props.onApplyFiltersClick}
            isDisabled={props.isApplyFiltersButtonDisabled}
            classNames={{ root: "mr-1" }}
          >
            Apply filters
          </ButtonComponent>
          <ButtonComponent
            type="primary"
            onClick={props.onClearFiltersClick}
            isDisabled={props.isClearFiltersButtonDisabled}
          >
            Clear filters
          </ButtonComponent>
        </div>
      </div>
      <Row>
        <Column sm={4} lg={4} withPaddings>
          <FormFieldComponent label="ID" classNames={{ root: "m-0" }}>
            <InputComponent
              value={props.filters.id}
              type="number"
              onChange={onIdFilterChange}
              placeholder="ID"
            />
          </FormFieldComponent>
        </Column>
        <Column sm={8} lg={4} withPaddings>
          <FormFieldComponent label="Email" classNames={{ root: "m-0" }}>
            <InputComponent
              value={props.filters.email}
              onChange={onEmailFilterChange}
              placeholder="Email"
            />
          </FormFieldComponent>
        </Column>
        <Column lg={4} withPaddings>
          <FormFieldComponent label="Name" classNames={{ root: "m-0" }}>
            <InputComponent
              value={props.filters.name}
              onChange={onNameFilterChange}
              placeholder="Name"
            />
          </FormFieldComponent>
        </Column>
      </Row>
      <Row>
        <Column sm={6} lg={4} withPaddings>
          <FormFieldComponent label="Created From" classNames={{ root: "m-0" }}>
            <DatePickerComponent
              date={props.filters.createdAt?.from}
              maxDate={props.filters.createdAt?.to ?? new Date()}
              onChange={onCreatedAtFromFilterChange}
              placeholder="Created From"
            />
          </FormFieldComponent>
        </Column>
        <Column sm={6} lg={4} withPaddings>
          <FormFieldComponent label="Created To" classNames={{ root: "m-0" }}>
            <DatePickerComponent
              date={props.filters.createdAt?.to}
              minDate={props.filters.createdAt?.from}
              maxDate={new Date()}
              onChange={onCreatedAtToFilterChange}
              placeholder="Created To"
            />
          </FormFieldComponent>
        </Column>
        <Column lg={4} withPaddings>
          <FormFieldComponent label="Active" classNames={{ root: "m-0" }}>
            <SelectComponent
              value={
                props.filters.isActive !== undefined
                  ? {
                      label: props.filters.isActive ? "Yes" : "No",
                      value: props.filters.isActive,
                    }
                  : undefined
              }
              onChange={onActiveFilterChange}
              options={[
                {
                  label: "Yes",
                  value: true,
                },
                {
                  label: "No",
                  value: false,
                },
              ]}
              isClearable
              placeholder="Active"
            />
          </FormFieldComponent>
        </Column>
      </Row>
    </div>
  );
};

export default UserListingFiltersComponent;
