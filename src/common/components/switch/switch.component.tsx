import classNames from "classnames";
import { FC } from "react";
import ComponentClassnames from "../../types/component-classnames";
import ComponentType from "../../types/component-type";

type SwitchProps = {
  classNames?: ComponentClassnames;
  type?: ComponentType;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
  isDisabled?: boolean;
  title?: string;
};
const SwitchComponent: FC<SwitchProps> = (props) => {
  return (
    <div
      className={classNames("switch", props.classNames?.root)}
      title={props.title}
    >
      <label className="switch__label">
        <input
          role="switch"
          type="checkbox"
          className="switch__input"
          checked={props.isChecked}
          onChange={() => props.onChange(!props.isChecked)}
          disabled={props.isDisabled}
        />
        <span className={classNames("switch__toggle", props.type)}></span>
        <span className="switch__handle"></span>
      </label>
    </div>
  );
};

SwitchComponent.defaultProps = {
  type: "primary",
};

export default SwitchComponent;
