import { FC } from "react";
import Icon from "../../../icons/icon";
import CardButtonComponent, { CardButtonProps } from "../card-button.component";

type CardRefreshButtonProps = Pick<
  CardButtonProps,
  "isDisabled" | "isLoading" | "onClick" | "title"
>;

const CardRefreshButtonComponent: FC<CardRefreshButtonProps> = (props) => {
  return <CardButtonComponent icon={Icon.refresh} {...props} />;
};

CardRefreshButtonComponent.defaultProps = {
  title: "Refresh",
};

export default CardRefreshButtonComponent;
