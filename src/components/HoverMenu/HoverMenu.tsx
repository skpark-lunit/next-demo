import { Menu } from "@headlessui/react";
import { FC, Fragment } from "react";

import { DefaultTransitionComponent } from "./DefaultTransitionComponent";
import { HoverMenuItem } from "./HoverMenuItem";
import {
  MenuButtonComponentType,
  MenuItemComponentType,
  MenuItemConfig,
} from "./types";
import { useHoverMenu } from "./useHoverMenu";

interface Props<MenuItemConfigData, MenuItemKeyType extends string> {
  activeKey: MenuItemKeyType;
  items: MenuItemKeyType[];
  itemConfig: MenuItemConfig<MenuItemConfigData, MenuItemKeyType>;
  MenuButtonComponent: MenuButtonComponentType<MenuItemKeyType>;
  TransitionComponent: FC<{ isActive: boolean }>;
  MenuItemsComponent: FC;
  MenuItemComponent: MenuItemComponentType<MenuItemConfigData, MenuItemKeyType>;
  onSelect?: (key: MenuItemKeyType) => void;
  ariaLabel: string;
}

export const HoverMenu = <MenuItemConfigData, MenuItemKeyType extends string>({
  items,
  itemConfig,
  activeKey,
  MenuButtonComponent,
  TransitionComponent = DefaultTransitionComponent,
  MenuItemsComponent,
  MenuItemComponent,
  onSelect,
  ariaLabel,
}: Props<MenuItemConfigData, MenuItemKeyType>) => {
  const {
    onMouseEnter,
    onMouseLeave,
    isActive,
    onMouseDown,
    onFocus,
    getOnMenuItemButtonClick,
    menuButtonRef,
  } = useHoverMenu({ onSelect });

  return (
    <Menu as={Fragment}>
      <Menu.Button
        aria-label={ariaLabel}
        as="button"
        ref={menuButtonRef}
        onFocus={onFocus}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseDown={onMouseDown}
        className="w-full"
      >
        <MenuButtonComponent activeKey={activeKey} />
      </Menu.Button>
      <TransitionComponent isActive={isActive}>
        <Menu.Items onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          <MenuItemsComponent>
            {items.map((itemKey) => {
              return (
                <HoverMenuItem
                  key={itemKey}
                  itemKey={itemKey}
                  activeKey={activeKey}
                  itemConfig={itemConfig}
                  getOnMenuItemButtonClick={getOnMenuItemButtonClick}
                  MenuItemComponent={MenuItemComponent}
                />
              );
            })}
          </MenuItemsComponent>
        </Menu.Items>
      </TransitionComponent>
    </Menu>
  );
};
