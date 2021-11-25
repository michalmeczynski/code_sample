import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Breadcrumb from "../common/types/breadcrumb";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import useIsMobile from "../../../hooks/use-is-mobile";

type BreadcrumbItemProps = Breadcrumb & {
  icon: IconProp;
  isActive: boolean;
};

const BreadcrumbItemComponent: FC<BreadcrumbItemProps> = (props) => {
  const isMobile = useIsMobile();
  return (
    <NavLink
      to={props.linkTo ?? ""}
      className={classNames("breadcrumb_item", props.isActive && "active")}
      activeClassName="default_active"
    >
      <FontAwesomeIcon
        icon={props.icon}
        size="sm"
        className="breadcrumb_item__icon"
        spin={props.isSpinning}
      />
      {!isMobile && <div className="breadcrumb_item__text">{props.text}</div>}
    </NavLink>
  );
};

export default BreadcrumbItemComponent;
