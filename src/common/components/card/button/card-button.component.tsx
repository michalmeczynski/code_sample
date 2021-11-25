import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import ButtonComponent, { ButtonProps } from "../../button/button.component";

export type CardButtonProps = Omit<ButtonProps, "children"> & {
  icon: IconProp;
};

const CardButtonComponent: FC<CardButtonProps> = (props) => {
  return (
    <>
      <ButtonComponent
        onClick={props.onClick}
        classNames={{ root: "card_button" }}
        isDisabled={props.isDisabled}
        isLoading={props.isLoading}
        type={props.type}
        title={props.title}
      >
        <FontAwesomeIcon
          icon={props.icon}
          className="card_button__icon"
          size={"sm"}
        />
      </ButtonComponent>
    </>
  );
};

CardButtonComponent.defaultProps = {
  type: "primary",
};

export default CardButtonComponent;
