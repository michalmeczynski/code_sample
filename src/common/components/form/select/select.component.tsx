import React, { FC, ReactNode, useEffect, useState } from "react";
import Select, { ValueType, ActionMeta } from "react-select";
import SelectOption from "./select-option";
import classNames from "classnames";
import ComponentClassnames from "../../../types/component-classnames";

type SelectProps = {
  classNames?: ComponentClassnames;
  options: SelectOption[];
  value: SelectOption | SelectOption[] | undefined;
  onChange: (value: SelectOption | SelectOption[] | undefined) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  autoFocus?: boolean;
  defaultValue?: SelectOption;
  maxItems?: number;
  isMulti?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  hasError?: boolean;
};

const SelectComponent: FC<SelectProps> = (props) => {
  const [refreshFlag, setRefreshFlag] = useState(false);
  const onChange = (
    newValue: ValueType<SelectOption, boolean>,
    _actionMeta: ActionMeta<SelectOption>
  ) => {
    if (newValue === undefined || newValue === null) {
      props.onChange(undefined);
      return;
    }
    if (Array.isArray(newValue)) {
      props.onChange(newValue as SelectOption[]);
      return;
    }

    props.onChange(newValue as SelectOption);
  };

  const shouldCloseMenuOnSelect = !props.isMulti;

  const rootClassnames = classNames(
    "select",
    props.classNames?.root,
    props.hasError && "error"
  );

  useEffect(() => {
    if (props.value === [] || props.value === undefined) {
      setRefreshFlag((curr) => !curr);
    }
  }, [props.value]);

  return (
    <Select
      value={props.value}
      key={String(refreshFlag)}
      options={props.options}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      onChange={onChange}
      backspaceRemovesValue
      autoFocus={props.autoFocus}
      classNamePrefix="select"
      className={rootClassnames}
      placeholder={props.placeholder}
      defaultValue={props.defaultValue}
      isDisabled={props.isDisabled}
      isMulti={props.isMulti}
      isSearchable={props.isSearchable}
      pageSize={props.maxItems}
      menuPlacement="auto"
      menuPosition="absolute"
      blurInputOnSelect={false}
      closeMenuOnSelect={shouldCloseMenuOnSelect}
      maxMenuHeight={150}
      isClearable={props.isClearable}
    />
  );
};

SelectComponent.defaultProps = {
  maxItems: 2,
  isSearchable: false,
};

export default SelectComponent;
