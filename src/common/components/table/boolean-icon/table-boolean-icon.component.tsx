import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

type TableBooleanIconProps = {
  value: boolean;
};

const TableBooleanIconComponent: FC<TableBooleanIconProps> = (props) => {
  if (props.value === true) {
    return <FontAwesomeIcon icon={faCheck} />;
  }

  return <FontAwesomeIcon icon={faTimes} />;
};

export default TableBooleanIconComponent;
