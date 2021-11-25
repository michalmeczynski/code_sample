import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppContext } from "../../app.context";
import ButtonComponent from "../../common/components/button/button.component";
import Icon from "../../common/components/icons/icon";
import useIsMobile from "../../common/hooks/use-is-mobile";

const HeaderComponent = () => {
  const { toggleAsidePanelExpand, user } = useAppContext();
  const isMobile = useIsMobile();

  const onSignOutButtonClick = () => {};

  return (
    <div className="header">
      <div className="header_content">
        {isMobile && (
          <ButtonComponent
            onClick={toggleAsidePanelExpand}
            classNames={{ root: "header_toggle_aside_panel_button" }}
          >
            <FontAwesomeIcon icon={Icon.hamburger} size="2x" />
          </ButtonComponent>
        )}
        <div className="header_user">
          <ButtonComponent
            onClick={() => {}}
            classNames={{ root: "header_user__button" }}
          >
            <FontAwesomeIcon icon={Icon.user} size="2x" />
            <span className="header_user__text">
              Hi, <span className="header_user__name">{user.name}</span>
            </span>
          </ButtonComponent>
          <ButtonComponent
            onClick={onSignOutButtonClick}
            classNames={{ root: "header-sign-out-button" }}
            type="danger"
          >
            Sign Out
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
