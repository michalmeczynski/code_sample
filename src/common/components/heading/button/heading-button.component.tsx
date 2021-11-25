import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import ButtonComponent, { ButtonProps } from "../../button/button.component";

type HeadingButtonProps = ButtonProps & {
  icon: IconProp;
};

const HeadingButtonComponent: FC<HeadingButtonProps> = (props) => {
  return (
    <ButtonComponent
      onClick={props.onClick}
      classNames={{ root: "heading_button", content: "heading_button_content" }}
      isDisabled={props.isDisabled}
      isLoading={props.isLoading}
      type={props.type}
    >
      <FontAwesomeIcon icon={props.icon} className="heading_button_icon" />
      <div className="heading_button_text">{props.children}</div>
    </ButtonComponent>
  );
};

HeadingButtonComponent.defaultProps = {
  type: "primary",
};

export default HeadingButtonComponent;
