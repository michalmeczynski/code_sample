import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { FC, Fragment, ReactNode } from "react";
import ComponentClassnames from "../../types/component-classnames";
import LoaderComponent from "../loader/loader.component";

type CardProps = {
  header?: {
    title: string;
    subtitle?: string;
    icon?: IconProp;
    actions?: ReactNode[];
  };
  classNames?: ComponentClassnames & {
    content?: string;
  };
  isLoading?: boolean;
};

const CardComponent: FC<CardProps> = (props) => {
  return (
    <div className={classNames("card", props.classNames?.root)}>
      {props.header && (
        <div className="card_header">
          <div className="card_header__heading">
            {props.header.icon && (
              <FontAwesomeIcon
                icon={props.header.icon}
                className="card_header__icon"
                size="lg"
              />
            )}
            <div>
              <h1 className="card_header__title">{props.header.title}</h1>
              <h5 className="card_header__subtitle">{props.header.subtitle}</h5>
            </div>
          </div>
          <div className="card_header__actions">
            {props.header.actions?.map((action, index) => (
              <Fragment key={index}>{action}</Fragment>
            ))}
          </div>
        </div>
      )}
      <div className={classNames("card_content", props.classNames?.content)}>
        {props.isLoading && (
          <div className="card_content_loading_overlay">
            <LoaderComponent type="primary" />
          </div>
        )}
        {props.children}
      </div>
    </div>
  );
};

export default CardComponent;
