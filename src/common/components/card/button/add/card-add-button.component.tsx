import { FC } from "react";
import Icon from "../../../icons/icon";
import CardButtonComponent, { CardButtonProps } from "../card-button.component";

type CardRefreshButtonProps = Pick<
  CardButtonProps,
  "isDisabled" | "isLoading" | "onClick" | "title"
>;

const CardAddButtonComponent: FC<CardRefreshButtonProps> = (props) => {
  return <CardButtonComponent icon={Icon.add} {...props} />;
};

CardAddButtonComponent.defaultProps = {
  title: "Add",
};

export default CardAddButtonComponent;
