import { useRef, RefObject, ReactNode, FC } from "react";
import classNames from "classnames";
import ComponentClassnames from "../../../types/component-classnames";

type CheckboxProps = {
  children: ReactNode;
  isChecked: boolean;
  onChange: (value: boolean) => void;
  classNames?: ComponentClassnames;
  hasError?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
};

const CheckboxComponent: FC<CheckboxProps> = (props) => {
  const checkboxClassnames = classNames(
    "checkbox",
    props.classNames?.root,
    props.isDisabled && "disabled"
  );
  const checkboxMarkClassnames = classNames(
    "checkbox__checkmark",
    props.hasError && "error"
  );

  const checkboxCheckmarkRef: RefObject<HTMLSpanElement> | null = useRef(null);

  function onInputFocus() {
    checkboxCheckmarkRef?.current?.classList.add("active");
  }

  function onInputBlur() {
    checkboxCheckmarkRef?.current?.classList.remove("active");
  }

  return (
    <label
      className={checkboxClassnames}
      onFocus={onInputFocus}
      onBlur={onInputBlur}
    >
      <input
        type="checkbox"
        className="checkbox__input"
        checked={props.isChecked}
        onFocus={onInputFocus}
        onChange={(event) => props.onChange(event.target.checked)}
      />
      <span
        className={checkboxMarkClassnames}
        ref={checkboxCheckmarkRef}
      ></span>
      <span className="checkbox__title">
        {props.children}
        {props.isRequired && <span className="checkbox__required">*</span>}
      </span>
    </label>
  );
};

export default CheckboxComponent;
