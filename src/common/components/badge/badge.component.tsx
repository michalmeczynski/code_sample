import classNames from "classnames";
import { FC } from "react";
import ComponentClassnames from "../../types/component-classnames";
import ComponentType from "../../types/component-type";

export type BadgeType = ComponentType;

type BadgeProps = {
  type?: BadgeType;
  title?: string;
  classNames?: ComponentClassnames;
};

const BadgeComponent: FC<BadgeProps> = (props) => {
  return (
    <div
      className={classNames("badge", `${props.type}`, props.classNames?.root)}
      title={props.title}
    >
      {props.children}
    </div>
  );
};

BadgeComponent.defaultProps = {
  type: "primary",
};

export default BadgeComponent;
