import { FC } from "react";

type TableActionsContainerProps = {};

const TableActionsContainerComponent: FC<TableActionsContainerProps> = (
  props
) => {
  return <div className="table_actions">{props.children}</div>;
};

export default TableActionsContainerComponent;
