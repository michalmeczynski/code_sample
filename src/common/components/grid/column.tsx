import { FC } from "react";
import classNames from "classnames";

type ColumnProps = {
  def?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  withPaddings?: boolean;
};

const Column: FC<ColumnProps> = (props) => {
  const { def, sm, md, lg, xl, withPaddings } = props;

  if (def && (def < 0 || def > 12)) {
    console.error(`Column: Prop 'sm' is not valid.`);
  }

  if (sm && (sm < 0 || sm > 12)) {
    console.error(`Column: Prop 'sm' is not valid.`);
  }

  if (md && (md < 0 || md > 12)) {
    console.error(`Column: Prop 'md' is not valid.`);
  }

  if (lg && (lg < 0 || lg > 12)) {
    console.error(`Column: Prop 'lg' is not valid.`);
  }

  if (xl && (xl < 0 || xl > 12)) {
    console.error(`Column: Prop 'xl' is not valid.`);
  }

  const columnClassname = classNames(
    `col-${def ?? 12}`,
    sm && `col-sm-${sm}`,
    md && `col-md-${md}`,
    lg && `col-lg-${lg}`,
    xl && `col-xl-${xl}`,
    !withPaddings && `pt-0 pb-0`
  );
  return <div className={columnClassname}>{props.children}</div>;
};

Column.defaultProps = {
  def: 12,
};

export default Column;
