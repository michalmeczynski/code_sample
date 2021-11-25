import { ReactNode } from "react";
import { RouteComponentProps } from "react-router-dom";

type RouteItem = {
  path: string;
  exact?: boolean;
  component?:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>
    | ReactNode;
};

export default RouteItem;
