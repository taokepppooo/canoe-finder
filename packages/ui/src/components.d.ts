/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { MenuItem, MenuOption, MenuType } from "./components/menu/types";
import { PartialOptions } from "overlayscrollbars";
export { MenuItem, MenuOption, MenuType } from "./components/menu/types";
export { PartialOptions } from "overlayscrollbars";
export namespace Components {
    interface CfUiIconifyIcon {
        "height": number;
        "icon": string;
        "width": number;
    }
    interface CfUiMenu {
        "height": string;
        "items": MenuItem[];
        "options": MenuOption;
        "type": MenuType;
    }
    interface CfUiScrollbar {
        "height": string;
        "options": PartialOptions;
        "width": string;
    }
}
declare global {
    interface HTMLCfUiIconifyIconElement extends Components.CfUiIconifyIcon, HTMLStencilElement {
    }
    var HTMLCfUiIconifyIconElement: {
        prototype: HTMLCfUiIconifyIconElement;
        new (): HTMLCfUiIconifyIconElement;
    };
    interface HTMLCfUiMenuElement extends Components.CfUiMenu, HTMLStencilElement {
    }
    var HTMLCfUiMenuElement: {
        prototype: HTMLCfUiMenuElement;
        new (): HTMLCfUiMenuElement;
    };
    interface HTMLCfUiScrollbarElement extends Components.CfUiScrollbar, HTMLStencilElement {
    }
    var HTMLCfUiScrollbarElement: {
        prototype: HTMLCfUiScrollbarElement;
        new (): HTMLCfUiScrollbarElement;
    };
    interface HTMLElementTagNameMap {
        "cf-ui-iconify-icon": HTMLCfUiIconifyIconElement;
        "cf-ui-menu": HTMLCfUiMenuElement;
        "cf-ui-scrollbar": HTMLCfUiScrollbarElement;
    }
}
declare namespace LocalJSX {
    interface CfUiIconifyIcon {
        "height"?: number;
        "icon"?: string;
        "width"?: number;
    }
    interface CfUiMenu {
        "height"?: string;
        "items"?: MenuItem[];
        "options"?: MenuOption;
        "type"?: MenuType;
    }
    interface CfUiScrollbar {
        "height"?: string;
        "options"?: PartialOptions;
        "width"?: string;
    }
    interface IntrinsicElements {
        "cf-ui-iconify-icon": CfUiIconifyIcon;
        "cf-ui-menu": CfUiMenu;
        "cf-ui-scrollbar": CfUiScrollbar;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "cf-ui-iconify-icon": LocalJSX.CfUiIconifyIcon & JSXBase.HTMLAttributes<HTMLCfUiIconifyIconElement>;
            "cf-ui-menu": LocalJSX.CfUiMenu & JSXBase.HTMLAttributes<HTMLCfUiMenuElement>;
            "cf-ui-scrollbar": LocalJSX.CfUiScrollbar & JSXBase.HTMLAttributes<HTMLCfUiScrollbarElement>;
        }
    }
}
