import { FC, useEffect } from "react";
import classNames from "classnames";
import AsidePanelHeaderComponent from "./header/aside-panel-header.component";
import AsidePanelMenuComponent from "./menu/aside-panel-menu.component";
import { useAppContext } from "../../app.context";
import useLayoutBreakpoint from "../../common/hooks/use-layout-breakpoint";

type AsidePanelProps = {};

const AsidePanelComponent: FC<AsidePanelProps> = () => {
  const { isAsidePanelExpanded, setIsAsidePanelExpanded } = useAppContext();

  const isFixed = useLayoutBreakpoint<boolean>({
    default: true,
    mid: false,
  });

  useEffect(() => {
    setIsAsidePanelExpanded(false);
  }, [isFixed, setIsAsidePanelExpanded]);

  return (
    <div
      className={classNames(
        "aside_panel",
        isAsidePanelExpanded && "expanded",
        isFixed && "fixed"
      )}
    >
      <AsidePanelHeaderComponent />
      <AsidePanelMenuComponent />
    </div>
  );
};

export default AsidePanelComponent;
