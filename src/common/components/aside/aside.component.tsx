import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { FC, Fragment, ReactNode, useRef } from "react";
import ButtonComponent from "../button/button.component";
import Icon from "../icons/icon";
import OutsideClickHandler from "react-outside-click-handler";
import useKeyboardPress from "../../hooks/use-keyboard-press";
import LoaderComponent from "../loader/loader.component";

type AsideProps = {
  isOpen: boolean;
  onCloseClick: () => void;
  header: {
    title: string;
    subTitle?: string;
  };
  footer: {
    buttons: ReactNode[];
  };
  isLoading?: boolean;
};

const AsideComponent: FC<AsideProps> = (props) => {
  useKeyboardPress({ Escape: props.onCloseClick });

  const asideRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const asideHeight = asideRef.current?.clientHeight ?? 0;
  const headerHeight = headerRef.current?.clientHeight ?? 0;
  const footerHeight = footerRef.current?.clientHeight ?? 0;

  const contentHeight = asideHeight - headerHeight - footerHeight;

  return (
    <>
      <div
        className={classNames("aside_overlay", props.isOpen && "open")}
      ></div>
      <OutsideClickHandler onOutsideClick={props.onCloseClick}>
        <div
          className={classNames("aside", props.isOpen && "open")}
          ref={asideRef}
        >
          <div className="aside_header" ref={headerRef}>
            <div className="aside_header__content">
              <h1 className="aside_header__title">{props.header.title}</h1>
              {props.header.subTitle && (
                <h1 className="aside_header__subtitle">
                  {props.header.subTitle}
                </h1>
              )}
            </div>
            <div className="aside_header__close">
              <ButtonComponent
                onClick={props.onCloseClick}
                classNames={{ root: "aside_header__close__button" }}
              >
                <FontAwesomeIcon
                  icon={Icon.close}
                  size="lg"
                  className="aside_header__close__icon"
                />
              </ButtonComponent>
            </div>
          </div>
          <div className="aside_content" style={{ height: contentHeight }}>
            {props.children}
            {props.isLoading && (
              <>
                <div className="aside_overlay_loader_wrapper"></div>
                <div className="aside_loader_wrapper">
                  <LoaderComponent type="primary" />
                </div>
              </>
            )}
          </div>
          <div className="aside_footer" ref={footerRef}>
            {props.footer.buttons.map((button, index) => (
              <Fragment key={index}>{button}</Fragment>
            ))}
          </div>
        </div>
      </OutsideClickHandler>
    </>
  );
};

export default AsideComponent;
