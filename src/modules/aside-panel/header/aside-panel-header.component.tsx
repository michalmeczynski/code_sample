import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import appConfig from "../../../app.config";
import { useAppContext } from "../../../app.context";
import ButtonComponent from "../../../common/components/button/button.component";
import Icon from "../../../common/components/icons/icon";
import useIsMobile from "../../../common/hooks/use-is-mobile";
import appRoutesHelper from "../../../routes/app-routes.helper";

type AsidePanelHeaderProps = {};

const AsidePanelHeaderComponent: FC<AsidePanelHeaderProps> = () => {
  const isMobile = useIsMobile();
  const { setIsAsidePanelExpanded } = useAppContext();
  return (
    <div className={classNames("aside_panel_header")}>
      <NavLink
        className="aside_panel_header__app_name"
        to={appRoutesHelper.getMainRoute()}
      >{`${appConfig.appName} Admin`}</NavLink>

      {isMobile && (
        <ButtonComponent
          classNames={{ root: "aside_panel_header_close_button" }}
          onClick={() => setIsAsidePanelExpanded(false)}
        >
          <FontAwesomeIcon
            icon={Icon.close}
            size="2x"
            className="aside_panel_header_close_button__icon"
          />
        </ButtonComponent>
      )}
    </div>
  );
};

export default AsidePanelHeaderComponent;
