import classNames from "classnames";
import { FC } from "react";
import ComponentClassnames from "../../types/component-classnames";

type LoaderProps = {
  classNames?: ComponentClassnames;
  type?: "dark" | "primary";
};

const LoaderComponent: FC<LoaderProps> = (props) => {
  return (
    <div
      className={classNames("loader", props.classNames?.root, props.type)}
    ></div>
  );
};

export default LoaderComponent;
