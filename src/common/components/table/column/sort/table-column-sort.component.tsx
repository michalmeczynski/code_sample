import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { FC } from "react";
import ButtonComponent from "../../../button/button.component";

type TableColumnSortProps = {
  isAscActive: boolean;
  isDescActive: boolean;
  onClick: () => void;
};

const TableColumnSortComponent: FC<TableColumnSortProps> = (props) => {
  const Icon = ({
    icon,
    className,
  }: {
    icon: IconProp;
    className?: string;
  }) => {
    return (
      <FontAwesomeIcon
        size={"lg"}
        icon={icon}
        className={classNames("table__th__sort__icon", className)}
      />
    );
  };

  const AscendingIcon = <Icon icon={faSortUp} className="" />;
  const DescendingIcon = <Icon icon={faSortDown} className="" />;
  const InactiveIcon = <Icon icon={faSort} className="inactive" />;

  return (
    <div className="table__th__sort">
      <ButtonComponent onClick={props.onClick}>
        {props.isAscActive
          ? AscendingIcon
          : props.isDescActive
          ? DescendingIcon
          : InactiveIcon}
      </ButtonComponent>
    </div>
  );
};

export default TableColumnSortComponent;
