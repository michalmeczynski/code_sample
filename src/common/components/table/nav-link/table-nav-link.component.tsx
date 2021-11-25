import { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import * as H from "history";

type TableNavLinkProps = {
  children: ReactNode;
  to: H.LocationDescriptor | ((location: H.Location) => H.LocationDescriptor);
};

const TableNavLinkComponent: FC<TableNavLinkProps> = (props) => {
  return (
    <NavLink to={props.to} className="table_nav_link">
      {props.children}
    </NavLink>
  );
};

export default TableNavLinkComponent;
