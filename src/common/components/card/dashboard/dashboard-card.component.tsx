import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import CardComponent from "../card.component";
import * as H from "history";

type DashboardCardProps = {
  title: string;
  icon: IconProp;
  linkTo:
    | H.LocationDescriptor
    | ((location: H.Location) => H.LocationDescriptor);
};

const DashboardCardComponent: FC<DashboardCardProps> = (props) => {
  return (
    <CardComponent
      classNames={{
        root: "dashboard_card",
        content: "dashboard_card_content",
      }}
    >
      <NavLink to={props.linkTo} className="dashboard_card__link">
        <div className="dashboard_card__title">{props.title}</div>
        <FontAwesomeIcon
          size="2x"
          className="dashboard_card__icon"
          icon={props.icon}
        />
      </NavLink>
    </CardComponent>
  );
};

export default DashboardCardComponent;
