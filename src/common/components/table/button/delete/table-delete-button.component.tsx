import { FC } from "react";
import Icon from "../../../icons/icon";
import TableButtonComponent, {
  TableButtonProps,
} from "../table-button.component";

type TableDeleteButtonProps = Pick<TableButtonProps, "onClick">;

const TableDeleteButtonComponent: FC<TableDeleteButtonProps> = (props) => {
  return (
    <TableButtonComponent
      onClick={props.onClick}
      icon={Icon.delete}
      type="danger"
      title={`Delete`}
    />
  );
};

export default TableDeleteButtonComponent;
