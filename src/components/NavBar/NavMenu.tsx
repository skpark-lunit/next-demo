import { Transition } from "@headlessui/react";
import clsx from "clsx";
import cntl from "cntl";
import { FC, Fragment, useCallback, useState } from "react";

import { HoverMenu, MenuItemConfig } from "../HoverMenu";

export interface ConfigData {
  label: string;
}

export const enum ColorEnum {
  GREEN = "green",
  YELLOW = "yellow",
  RED = "red",
}

export const ITEMS: ColorEnum[] = [
  ColorEnum.GREEN,
  ColorEnum.YELLOW,
  ColorEnum.RED,
];

export const ITEM_CONFIG: MenuItemConfig<ConfigData, ColorEnum> = {
  [ColorEnum.GREEN]: {
    label: "Green",
  },
  [ColorEnum.RED]: {
    label: "Red",
  },
  [ColorEnum.YELLOW]: {
    label: "Yellow",
  },
} as const;

export const NavMenu: FC = () => {
  const [activeColor, setActiveColor] = useState<ColorEnum>(ColorEnum.GREEN);

  return (
    <HoverMenu<ConfigData, ColorEnum>
      activeKey={activeColor}
      items={ITEMS}
      itemConfig={ITEM_CONFIG}
      onSelect={setActiveColor}
      ariaLabel={"Select Color"}
      WrapperComponent={useCallback(
        ({ children }) => (
          <div className="relative inline-flex flex-col">{children}</div>
        ),
        []
      )}
      MenuButtonComponent={useCallback(
        ({ activeKey, itemConfig }) => (
          <div
            className="
              justify-left
              inline-flex 
              w-full
              rounded-md 
              bg-black 
              bg-opacity-20 
              px-4 py-2
              text-sm 
              font-medium 
              text-white 
              hover:bg-opacity-30                
              focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75
           "
          >
            {itemConfig[activeKey].label}
          </div>
        ),
        []
      )}
      TransitionComponent={useCallback(
        ({ children, isActive }) => (
          <Transition
            show={isActive}
            as={Fragment}
            enter={cntl`transition ease-out duration-100`}
            enterFrom={cntl`transform opacity-0 scale-95`}
            enterTo={cntl`transform opacity-100 scale-100`}
            leave={cntl`transition ease-in duration-75`}
            leaveFrom={cntl`transform opacity-100 scale-100`}
            leaveTo={cntl`transform opacity-0 scale-95`}
          >
            {children}
          </Transition>
        ),
        []
      )}
      MenuItemsComponent={useCallback(
        ({ children }) => (
          <div
            className="
              left-0
              inline-flex 
              w-full
              origin-top-right 
              flex-col
              divide-y
              divide-gray-100
              rounded-md
              bg-white
              px-1
              py-1
              shadow-lg
              ring-1
              ring-black
              ring-opacity-5
              focus:outline-none sm:absolute sm:z-10
              sm:w-64
            "
          >
            {children}
          </div>
        ),
        []
      )}
      MenuItemComponent={useCallback(
        ({ itemKey, itemConfig, active, selected }) => (
          <div
            className={clsx(
              `
              overflow-hidden
              whitespace-normal
              break-words
              rounded-md
              px-2
              py-2 text-sm
            `,
              {
                "bg-violet-500 text-white": active,
                "text-gray-900": !active,
              }
            )}
          >
            {itemConfig[itemKey].label}: {JSON.stringify({ active, selected })}
          </div>
        ),
        []
      )}
    />
  );
};
