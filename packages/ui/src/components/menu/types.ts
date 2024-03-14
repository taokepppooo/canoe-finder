export interface MenuItem {
  label: string;
  name: string;
}

export interface MenuOption {
  positioning: 'absolute' | 'document';
  quick?: boolean;
  xOffset?: number;
  yOffset?: number;
  menuCorner?: 'start-start';
  anchorCorner?: 'start-start';
}

export type MenuType = 'trigger' | 'contextmenu';
