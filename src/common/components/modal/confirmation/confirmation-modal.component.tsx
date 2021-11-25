import React, { FC, ReactNode } from "react";
import ButtonComponent from "../../button/button.component";
import ModalComponent, { ModalProps } from "../modal.component";

type ConfirmationModalProps = Omit<ModalProps, "actions"> & {
  confirmButton: ReactNode;
};

const ConfirmationModalComponent: FC<ConfirmationModalProps> = (props) => {
  return (
    <ModalComponent
      header={props.header}
      isOpen={props.isOpen}
      onCloseClick={props.onCloseClick}
      actions={[
        props.confirmButton,
        <ButtonComponent type="info" onClick={props.onCloseClick}>
          Cancel
        </ButtonComponent>,
      ]}
      classNames={props.classNames}
    >
      {props.children}
    </ModalComponent>
  );
};

export default ConfirmationModalComponent;
