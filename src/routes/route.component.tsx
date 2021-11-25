import React, { FC } from "react";
import {
  Route,
  RouteComponentProps as RouterDomRouteComponentProps,
} from "react-router-dom";
import RouteItem from "./route-item";

type RouteComponentProps = RouteItem;

const RouteComponent: FC<RouteComponentProps> = (props) => {
  const Component = props.component;

  return (
    <Route
      component={
        Component as
          | React.ComponentType<RouterDomRouteComponentProps<any>>
          | React.ComponentType<any>
      }
      key={props.path}
      path={props.path}
      exact={props.exact}
    />
  );
};

export default RouteComponent;
