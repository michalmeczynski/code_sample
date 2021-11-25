import React, { useEffect, useRef, useCallback, FC, ReactNode } from "react";
import classNames from "classnames";
import ComponentClassnames from "../../types/component-classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icon from "../icons/icon";
import ButtonComponent from "../button/button.component";

export type ModalProps = {
  isOpen: boolean;
  onCloseClick: () => void;
  children: ReactNode;
  header: {
    title: string;
  };
  actions?: ReactNode[];
  classNames?: ComponentClassnames;
};

const ModalComponent: FC<ModalProps> = (props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const modalHeaderRef = useRef<HTMLDivElement>(null);
  const modalWrapperRef = useRef<HTMLDivElement>(null);

  const escapeKeyHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        props.onCloseClick();
      }
    },
    [props]
  );

  useEffect(() => {
    if (props.isOpen) {
      modalRef?.current?.focus();
      document.addEventListener("keydown", escapeKeyHandler, false);

      return () => {
        document.removeEventListener("keydown", escapeKeyHandler, false);
      };
    }
  }, [props.isOpen, escapeKeyHandler]);

  const modalBackgroundClassname = classNames(
    "modal__background",
    props.isOpen && "is-open"
  );
  const modalClassname = classNames(
    "modal",
    props.classNames?.root,
    props.isOpen && "is-open"
  );

  function onModalClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
  }

  return (
    <div
      className={modalBackgroundClassname}
      onMouseDown={() => props.onCloseClick()}
    >
      <div
        className={modalClassname}
        ref={modalRef}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal__wrapper" ref={modalWrapperRef}>
          <div className="modal__header" ref={modalHeaderRef}>
            {props.header.title && (
              <h4 className="modal__title">{props.header.title}</h4>
            )}
            <div className="modal__close" onClick={props.onCloseClick}>
              <ButtonComponent
                onClick={props.onCloseClick}
                classNames={{ root: "modal__close__button" }}
              >
                <FontAwesomeIcon
                  icon={Icon.close}
                  size="lg"
                  className="modal__close__icon"
                />
              </ButtonComponent>
            </div>
          </div>

          <div className="modal__container" onClick={onModalClick}>
            <div className="modal__content">{props.children}</div>
            {props.actions?.length && (
              <div className="modal__cta">
                {props.actions.map((action, index) => (
                  <span key={index} className="modal__cta__item">
                    {action}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
