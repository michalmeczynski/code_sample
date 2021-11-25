import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, Fragment, ReactNode, useEffect, useMemo, useState } from "react";
import ButtonComponent from "../../../common/components/button/button.component";
import { NavLink, useLocation } from "react-router-dom";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import asideMenuHelper from "./common/helper/aside-menu.helper";
import classNames from "classnames";

type AsidePanelMenuProps = {};

const AsidePanelMenuComponent: FC<AsidePanelMenuProps> = () => {
  const location = useLocation();
  const [openedMenuItemKeys, setOpenedMenuItemKeys] = useState<string[]>([]);
  const menuItems = useMemo(() => asideMenuHelper.getAsideMenuItems(), []);

  useEffect(() => {
    if (!location.pathname) {
      return;
    }
    let hasFound = false;
    const newOpenedMenuItemKeys: string[] = [];
    for (const menuItem of menuItems) {
      if (menuItem.subMenu) {
        for (const subMenuItem of menuItem.subMenu) {
          if (subMenuItem.linkTo === location.pathname) {
            hasFound = true;
            newOpenedMenuItemKeys.push(subMenuItem.key);
          }
          if (hasFound) {
            break;
          }
        }
      }
      if (hasFound) {
        newOpenedMenuItemKeys.push(menuItem.key);
        break;
      }

      if (menuItem.linkTo === location.pathname) {
        newOpenedMenuItemKeys.push(menuItem.key);
      }
    }

    setOpenedMenuItemKeys(newOpenedMenuItemKeys);
  }, [location.pathname, menuItems]);

  const getIsMenuItemOpened = (key: string): boolean => {
    return !!openedMenuItemKeys.find((item) => item === key);
  };

  const toggleMenuItemOpen = (key: string) => {
    const foundMenuItemKey = openedMenuItemKeys.find((item) => item === key);

    if (foundMenuItemKey) {
      return;
    }

    setOpenedMenuItemKeys([...openedMenuItemKeys, key]);
  };

  const MenuItem = useMemo(
    () =>
      ({ children, isActive }: { children: ReactNode; isActive: boolean }) => {
        return (
          <li
            className={classNames(
              "aside_panel_menu_item",
              isActive && "active"
            )}
          >
            {children}
          </li>
        );
      },
    []
  );

  const MenuItemLink = useMemo(
    () =>
      ({ children, to }: { children: ReactNode; to: string }) => {
        return (
          <NavLink className="aside_panel_menu_item__link" to={to}>
            {children}
          </NavLink>
        );
      },
    []
  );

  const MenuItemContent = useMemo(
    () =>
      ({
        text,
        icon,
        onClick,
      }: {
        text: string;
        icon: IconProp;
        onClick?: () => void;
      }) => {
        return (
          <div className="aside_panel_menu_item__content" onClick={onClick}>
            <FontAwesomeIcon
              icon={icon}
              className="aside_panel_menu_item__icon"
            />
            {<span className="aside_panel_menu_item__text">{text}</span>}
          </div>
        );
      },
    []
  );

  const ExpandMenuItemButton = useMemo(
    () =>
      ({ onClick, isExpanded }: { onClick: () => void; isExpanded: boolean }) =>
        (
          <ButtonComponent
            onClick={onClick}
            classNames={{
              root: "aside_panel_menu_item__toggle_button",
            }}
          >
            <FontAwesomeIcon
              icon={isExpanded ? faChevronDown : faChevronRight}
            />
          </ButtonComponent>
        ),
    []
  );

  const SubMenuItem = useMemo(
    () =>
      ({ children, isActive }: { children: ReactNode; isActive: boolean }) => {
        return (
          <li
            className={classNames(
              "aside_panel_sub_menu_item",
              isActive && "active"
            )}
          >
            {children}
          </li>
        );
      },
    []
  );

  const SubMenuItemLink = useMemo(
    () =>
      ({ children, to }: { children: ReactNode; to: string }) => {
        return (
          <NavLink className="aside_panel_sub_menu_item__link" to={to}>
            {children}
          </NavLink>
        );
      },
    []
  );

  const SubMenuItemContent = useMemo(
    () =>
      ({
        text,
        icon,
        onClick,
      }: {
        text: string;
        icon: IconProp;
        onClick?: () => void;
      }) => {
        return (
          <div className="aside_panel_sub_menu_item__content" onClick={onClick}>
            <FontAwesomeIcon
              icon={icon}
              className="aside_panel_sub_menu_item__icon"
            />
            <span className="aside_panel_sub_menu_item__text">{text}</span>
          </div>
        );
      },
    []
  );

  return (
    <div className="aside_panel_menu">
      <div className="aside_panel_menu__title">Menu</div>
      <ul className="aside_panel_menu_list">
        {menuItems.map((menuItem) => {
          const shouldRenderSubMenu =
            menuItem.subMenu && getIsMenuItemOpened(menuItem.key);
          const shouldRenderExpandButton = menuItem.subMenu?.length;
          return (
            <Fragment key={menuItem.key}>
              <MenuItem isActive={getIsMenuItemOpened(menuItem.key)}>
                <MenuItemLink to={menuItem.linkTo}>
                  <MenuItemContent
                    icon={menuItem.icon}
                    text={menuItem.text}
                    onClick={() => {}}
                  />
                </MenuItemLink>

                {shouldRenderExpandButton && (
                  <ExpandMenuItemButton
                    onClick={() => toggleMenuItemOpen(menuItem.key)}
                    isExpanded={getIsMenuItemOpened(menuItem.key)}
                  />
                )}
              </MenuItem>
              {shouldRenderSubMenu && (
                <ul className="aside_panel_sub_menu_list">
                  {menuItem.subMenu!.map((subMenuItem) => {
                    return (
                      <SubMenuItem
                        key={subMenuItem.key}
                        isActive={getIsMenuItemOpened(subMenuItem.key)}
                      >
                        <SubMenuItemLink to={subMenuItem.linkTo}>
                          <SubMenuItemContent
                            icon={subMenuItem.icon}
                            text={subMenuItem.text}
                            onClick={() => toggleMenuItemOpen(subMenuItem.key)}
                          />
                        </SubMenuItemLink>
                      </SubMenuItem>
                    );
                  })}
                </ul>
              )}
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default AsidePanelMenuComponent;
