import React, { FC, ReactNode, RefObject } from "react";
import classNames from "classnames";
import ComponentClassnames from "../../types/component-classnames";
import ButtonType from "./button.type";

export type ButtonProps = {
  children: ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  classNames?: ComponentClassnames & {
    content?: string;
  };
  isDisabled?: boolean;
  componentRef?: RefObject<HTMLButtonElement>;
  type?: ButtonType;
  isLoading?: boolean;
  title?: string;
};

const ButtonComponent: FC<ButtonProps> = (props) => {
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.onClick(event);
  };

  const getClassnameByType = () => {
    switch (props.type) {
      case "primary":
        return "primary";
      case "brand":
        return "brand";
      case "danger":
        return "danger";
      case "success":
        return "success";
      case "warning":
        return "warning";
      case "info":
        return "info";
      default:
        return undefined;
    }
  };

  const rootClassNames = classNames(
    "button",
    props.classNames?.root,
    props.isDisabled && "disabled",
    props.isLoading && "loading",
    getClassnameByType()
  );

  const buttonContentClassnames = classNames(
    "button_content",
    props.classNames?.content,
    props.isLoading && "loading"
  );

  return (
    <button
      ref={props.componentRef}
      onClick={onClick}
      className={rootClassNames}
      disabled={props.isDisabled}
      title={props.title}
    >
      <span className={buttonContentClassnames}>{props.children}</span>
      {props.isLoading && <div className="button_loader"></div>}
    </button>
  );
};

export default ButtonComponent;
