import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import NavLinkButtonComponent, {
  NavLinkButtonProps,
} from "../../../button/nav-link/nav-link-button.component";

type TableButtonProps = Omit<NavLinkButtonProps, "children"> & {
  icon: IconProp;
};

const TableNavLinkButtonComponent: FC<TableButtonProps> = (props) => {
  return (
    <NavLinkButtonComponent
      onClick={props.onClick}
      to={props.to}
      classNames={{ root: "table_button" }}
      isDisabled={props.isDisabled}
      type={props.type}
      title={props.title}
    >
      <FontAwesomeIcon
        icon={props.icon}
        className="table_button__icon"
        size={"sm"}
      />
    </NavLinkButtonComponent>
  );
};

TableNavLinkButtonComponent.defaultProps = {
  type: "brand",
};

export default TableNavLinkButtonComponent;
