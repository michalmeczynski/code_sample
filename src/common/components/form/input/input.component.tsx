import { useRef, RefObject, useState, FC, ReactNode } from "react";
import classNames from "classnames";
import ComponentClassnames from "../../../types/component-classnames";

type InputProps = {
  classNames?: ComponentClassnames & {
    input?: string;
  };
  value: string | undefined;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onFocusLeft?: () => void;
  onBlur?: () => void;
  placeholder: string;
  id?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  type?: "email" | "password" | "number" | "text";
  isDisabled?: boolean;
  isReadOnly?: boolean;
  inputRef?: RefObject<HTMLInputElement> | undefined;
  hasError?: boolean;
};

const InputComponent: FC<InputProps> = (props) => {
  const inputWrapperClassnames = classNames(
    "form_input",
    props.classNames?.root,
    props.hasError && "error",
    props.isDisabled && "disabled"
  );
  const inputClassnames = classNames(
    "form_input__input",
    props.classNames?.input
  );
  const [areActionsActive, setAreActionsActive] = useState(false);

  const inputWrapperRef: RefObject<HTMLLabelElement> = useRef(null);

  const onInputFocus = () => {
    inputWrapperRef?.current?.classList.add("active");
    if (props.onFocus) {
      props.onFocus();
    }
  };

  const onInputBlur = () => {
    inputWrapperRef?.current?.classList.remove("active");
    if (props.onBlur && areActionsActive) {
      props.onBlur();
    }
    if (props.onFocusLeft) {
      props.onFocusLeft();
    }
  };

  const onChange = (value: string) => {
    if (props.onChange) {
      props.onChange(value);
      setAreActionsActive(true);
    }
  };

  return (
    <>
      <label ref={inputWrapperRef} className={inputWrapperClassnames}>
        {props.iconLeft && (
          <i className="form_input__icon_left">{props.iconLeft}</i>
        )}
        <input
          ref={props.inputRef}
          type={props.type || "text"}
          id={props.id}
          value={props.value ?? ""}
          placeholder={props.placeholder}
          className={inputClassnames}
          autoComplete="off"
          onChange={(e) => onChange(e.target.value)}
          autoCorrect="false"
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          readOnly={props.isReadOnly || props.isDisabled}
          disabled={props.isDisabled}
        />
        {props.iconRight && (
          <i className="form_input__icon_right">{props.iconRight}</i>
        )}
      </label>
    </>
  );
};

export default InputComponent;
