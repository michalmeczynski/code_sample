import React, { useState, FC, ChangeEvent, RefObject, useRef } from "react";
import classNames from "classnames";
import ComponentClassnames from "../../../types/component-classnames";


type TextAreaProps = {
  value: string;
  onChange: (newValue: string) => void;
  onFocus?: () => void;
  onFocusLeft?: () => void;
  onBlur?: () => void;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  rows?: number;
  classNames?: ComponentClassnames & {
    textArea?: string;
  };
  autoFocus?: boolean;
  id?: string;
  placeholder?: string;
  maxLength?: number;
  hasError?: boolean;
};

const TextAreaComponent: FC<TextAreaProps> = (props) => {
  const inputWrapperRef: RefObject<HTMLLabelElement> | null = useRef(null);
  const textAreaContentLength = props.value.length;

  const inputWrapperClassnames = classNames(
    "text_area",
    props.classNames?.root,
    props.hasError && "error",
    props.isDisabled && "disabled"
  );

  const textAreaClassnames = classNames(
    "text_area__input",
    props.classNames?.root
  );

  const textAreaCounterClassnames = classNames(
    "text_area__counter",
    props.maxLength === textAreaContentLength && "error"
  );

  const [areActionsActive, setAreActionsActive] = useState(false);

  function onChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const newValue = e.target.value;

    props.onChange(newValue);
    setAreActionsActive(true);
  }

  function onTextAreaFocus() {
    inputWrapperRef?.current?.classList.add("active");
    if (props.onFocus) {
      props.onFocus();
    }
  }

  function onTextAreaBlur() {
    inputWrapperRef?.current?.classList.remove("active");
    if (props.onBlur && areActionsActive) {
      props.onBlur();
    }
    if (props.onFocusLeft) {
      props.onFocusLeft();
    }
  }

  return (
    <label ref={inputWrapperRef} className={inputWrapperClassnames}>
      <textarea
        value={props.value}
        id={props.id}
        placeholder={props.placeholder}
        className={textAreaClassnames}
        onChange={onChange}
        onFocus={onTextAreaFocus}
        onBlur={onTextAreaBlur}
        disabled={props.isDisabled}
        readOnly={props.isReadOnly}
        rows={props.rows}
        autoFocus={props.autoFocus}
        maxLength={props.maxLength}
      />
      {props.maxLength && (
        <small
          className={textAreaCounterClassnames}
        >{`${textAreaContentLength}/${props.maxLength}`}</small>
      )}
    </label>
  );
};

TextAreaComponent.defaultProps = {
  rows: 5,
};

export default TextAreaComponent;
