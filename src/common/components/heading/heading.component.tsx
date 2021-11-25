import classNames from "classnames";
import { FC, Fragment, ReactNode } from "react";

type HeadingProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode[];
};

const HeadingComponent: FC<HeadingProps> = (props) => {
  return (
    <div className="heading">
      <div className={classNames("heading_main_row")}>
        <h1 className="heading_title">{props.title}</h1>
        <div className="heading_actions">
          {props.actions?.map((item, index) => (
            <Fragment key={index}>{item}</Fragment>
          ))}
        </div>
      </div>
      {props.subtitle && (
        <div className="heading_sub_row">
          <h5 className="heading_subtitle">{props.subtitle}</h5>
        </div>
      )}
    </div>
  );
};

export default HeadingComponent;
