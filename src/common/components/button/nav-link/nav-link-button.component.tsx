import classNames from "classnames";
import React, { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import ComponentClassnames from "../../../types/component-classnames";
import ButtonType from "../button.type";
import * as H from "history";

export type NavLinkButtonProps = {
  children: ReactNode;
  to: H.LocationDescriptor | ((location: H.Location) => H.LocationDescriptor);
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  classNames?: ComponentClassnames & {
    content?: string;
  };
  isDisabled?: boolean;
  type?: ButtonType;
  title?: string;
};

const NavLinkButtonComponent: FC<NavLinkButtonProps> = (props) => {
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
    getClassnameByType()
  );

  const navLinkContentClassnames = classNames(
    "button_content",
    props.classNames?.content
  );

  return (
    <NavLink
      className={rootClassNames}
      to={props.to}
      onClick={props.onClick}
      title={props.title}
    >
      <span className={navLinkContentClassnames}>{props.children}</span>
    </NavLink>
  );
};

export default NavLinkButtonComponent;
