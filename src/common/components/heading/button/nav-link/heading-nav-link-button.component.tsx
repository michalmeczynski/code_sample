import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import NavLinkButtonComponent, {
  NavLinkButtonProps,
} from "../../../button/nav-link/nav-link-button.component";

type HeadingNavLinkButtonProps = NavLinkButtonProps & {
  icon: IconProp;
};

const HeadingNavLinkButtonComponent: FC<HeadingNavLinkButtonProps> = (
  props
) => {
  return (
    <NavLinkButtonComponent
      to={props.to}
      classNames={{ root: "heading_button", content: "heading_button_content" }}
      isDisabled={props.isDisabled}
      onClick={props.onClick}
      type={props.type}
    >
      <FontAwesomeIcon icon={props.icon} className="heading_button_icon" />
      <div className="heading_button_text">{props.children}</div>
    </NavLinkButtonComponent>
  );
};

HeadingNavLinkButtonComponent.defaultProps = {
  type: "primary",
};

export default HeadingNavLinkButtonComponent;
