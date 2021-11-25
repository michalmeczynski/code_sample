import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

type FormIconProps = Omit<FontAwesomeIconProps, "size">;

const FormIcon: FC<FormIconProps> = (props) => {
  return <FontAwesomeIcon size="lg" {...props} />;
};

export default FormIcon;
