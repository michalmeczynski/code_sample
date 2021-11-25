import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import ButtonComponent, { ButtonProps } from "../../button/button.component";

export type TableButtonProps = Omit<ButtonProps, "children"> & {
  icon: IconProp;
};

const TableButtonComponent: FC<TableButtonProps> = (props) => {
  return (
    <ButtonComponent
      onClick={props.onClick}
      classNames={{ root: "table_button" }}
      isDisabled={props.isDisabled}
      isLoading={props.isLoading}
      type={props.type}
      title={props.title}
    >
      <FontAwesomeIcon
        icon={props.icon}
        className="table_button__icon"
        size={"sm"}
      />
    </ButtonComponent>
  );
};

TableButtonComponent.defaultProps = {
  type: "brand",
};

export default TableButtonComponent;
