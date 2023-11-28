/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from '@cookie-banner/stencil';


@ProxyCmp({
  methods: ['hasConsent', 'getCategoriesWithConsent', 'setOptions', 'showBanner', 'hideBanner', 'deleteConsent', 'setStyling']
})
@Component({
  selector: 'cookie-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class CookieBanner {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['consentUpdated']);
  }
}


export declare interface CookieBanner extends Components.CookieBanner {
  /**
   * Event when the user has updated their consent @event consentUpdated,@property {string[]} detail - An array with the keys of all cookies that the user has consented to
   */
  consentUpdated: EventEmitter<CustomEvent<string[]>>;
}


@ProxyCmp({
  inputs: ['showBanner'],
  methods: ['changeColor']
})
@Component({
  selector: 'floating-cookie-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['showBanner'],
})
export class FloatingCookieButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface FloatingCookieButton extends Components.FloatingCookieButton {}


@ProxyCmp({
  inputs: ['acceptCategories', 'acceptedCategories', 'hideOptions']
})
@Component({
  selector: 'more-options-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['acceptCategories', 'acceptedCategories', 'hideOptions'],
})
export class MoreOptionsBanner {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface MoreOptionsBanner extends Components.MoreOptionsBanner {}


@ProxyCmp({
  inputs: ['acceptCategories', 'hideBanner', 'showOptions']
})
@Component({
  selector: 'primary-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['acceptCategories', 'hideBanner', 'showOptions'],
})
export class PrimaryBanner {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface PrimaryBanner extends Components.PrimaryBanner {}


