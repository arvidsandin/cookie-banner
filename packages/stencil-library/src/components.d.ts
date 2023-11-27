/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { Options } from "./utils/options";
import { StylingOptions } from "./utils/stylingOptions";
export { Options } from "./utils/options";
export { StylingOptions } from "./utils/stylingOptions";
export namespace Components {
    interface CookieBanner {
        /**
          * Delete all previous set consents
         */
        "deleteConsent": () => Promise<void>;
        /**
          * Get the categories that the user has consented to
          * @returns An array with the keys of all cookies that the user has consented to
         */
        "getCategoriesWithConsent": () => Promise<any[]>;
        /**
          * Check if the user has conseted to a particular category
          * @param key The category of cookie to check consent status for
          * @returns Whether the user has consented to that cookie
         */
        "hasConsent": (key: string) => Promise<boolean>;
        /**
          * Set the options used for the component. Is required to run at initialization, but can be run any number of times after that
          * @param userOptions The Options object that contains the settings for the component
         */
        "setOptions": (userOptions: Options) => Promise<void>;
        /**
          * Set the styling used for the component. Any undefined properties will use the last defined value for that property, the default value are only used if it has never been defined. Can be run any number of times.
          * @param newStyling The StylingOptions object that contains the stylingt for the component. View the documentation of the StylingOptions object to see available styling options.
         */
        "setStyling": (newStyling: StylingOptions) => Promise<void>;
        /**
          * Make the banner reappear
         */
        "showBanner": () => Promise<void>;
    }
    interface FloatingCookieButton {
        "changeColor": (background: string, foreground: string) => Promise<void>;
        "showBanner": () => void;
    }
    interface MoreOptionsBanner {
        /**
          * A function to use when accepting categories
         */
        "acceptCategories": (categories: string[]) => void;
        /**
          * The categories that are already accepted and should be shown as pre-checked to the user
         */
        "acceptedCategories": string[];
        /**
          * A function to no longer set the options view as the active one
         */
        "hideOptions": () => void;
    }
    interface PrimaryBanner {
        /**
          * A function to use when accepting categories
         */
        "acceptCategories": (categories: string[]) => void;
        /**
          * A function to set the options view as the active one
         */
        "showOptions": () => void;
    }
}
export interface CookieBannerCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCookieBannerElement;
}
declare global {
    interface HTMLCookieBannerElementEventMap {
        "consentUpdated": string[];
    }
    interface HTMLCookieBannerElement extends Components.CookieBanner, HTMLStencilElement {
        addEventListener<K extends keyof HTMLCookieBannerElementEventMap>(type: K, listener: (this: HTMLCookieBannerElement, ev: CookieBannerCustomEvent<HTMLCookieBannerElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLCookieBannerElementEventMap>(type: K, listener: (this: HTMLCookieBannerElement, ev: CookieBannerCustomEvent<HTMLCookieBannerElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLCookieBannerElement: {
        prototype: HTMLCookieBannerElement;
        new (): HTMLCookieBannerElement;
    };
    interface HTMLFloatingCookieButtonElement extends Components.FloatingCookieButton, HTMLStencilElement {
    }
    var HTMLFloatingCookieButtonElement: {
        prototype: HTMLFloatingCookieButtonElement;
        new (): HTMLFloatingCookieButtonElement;
    };
    interface HTMLMoreOptionsBannerElement extends Components.MoreOptionsBanner, HTMLStencilElement {
    }
    var HTMLMoreOptionsBannerElement: {
        prototype: HTMLMoreOptionsBannerElement;
        new (): HTMLMoreOptionsBannerElement;
    };
    interface HTMLPrimaryBannerElement extends Components.PrimaryBanner, HTMLStencilElement {
    }
    var HTMLPrimaryBannerElement: {
        prototype: HTMLPrimaryBannerElement;
        new (): HTMLPrimaryBannerElement;
    };
    interface HTMLElementTagNameMap {
        "cookie-banner": HTMLCookieBannerElement;
        "floating-cookie-button": HTMLFloatingCookieButtonElement;
        "more-options-banner": HTMLMoreOptionsBannerElement;
        "primary-banner": HTMLPrimaryBannerElement;
    }
}
declare namespace LocalJSX {
    interface CookieBanner {
        /**
          * Event when the user has updated their consent
          * @event consentUpdated
          * @property {string[]} detail - An array with the keys of all cookies that the user has consented to
         */
        "onConsentUpdated"?: (event: CookieBannerCustomEvent<string[]>) => void;
    }
    interface FloatingCookieButton {
        "showBanner"?: () => void;
    }
    interface MoreOptionsBanner {
        /**
          * A function to use when accepting categories
         */
        "acceptCategories"?: (categories: string[]) => void;
        /**
          * The categories that are already accepted and should be shown as pre-checked to the user
         */
        "acceptedCategories"?: string[];
        /**
          * A function to no longer set the options view as the active one
         */
        "hideOptions"?: () => void;
    }
    interface PrimaryBanner {
        /**
          * A function to use when accepting categories
         */
        "acceptCategories"?: (categories: string[]) => void;
        /**
          * A function to set the options view as the active one
         */
        "showOptions"?: () => void;
    }
    interface IntrinsicElements {
        "cookie-banner": CookieBanner;
        "floating-cookie-button": FloatingCookieButton;
        "more-options-banner": MoreOptionsBanner;
        "primary-banner": PrimaryBanner;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "cookie-banner": LocalJSX.CookieBanner & JSXBase.HTMLAttributes<HTMLCookieBannerElement>;
            "floating-cookie-button": LocalJSX.FloatingCookieButton & JSXBase.HTMLAttributes<HTMLFloatingCookieButtonElement>;
            "more-options-banner": LocalJSX.MoreOptionsBanner & JSXBase.HTMLAttributes<HTMLMoreOptionsBannerElement>;
            "primary-banner": LocalJSX.PrimaryBanner & JSXBase.HTMLAttributes<HTMLPrimaryBannerElement>;
        }
    }
}