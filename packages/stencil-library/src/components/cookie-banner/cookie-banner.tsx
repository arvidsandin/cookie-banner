import { Component, Method, State, Event, Element, EventEmitter, h } from '@stencil/core';
import state from '../../store/store';
import { Options } from '../../utils/options';
import { StylingOptions } from '../../utils/stylingOptions';

@Component({
  tag: 'cookie-banner',
  styleUrl: 'cookie-banner.css',
  shadow: true,
})
export class CookieBanner {
  /**
   * Check if the user has conseted to a particular category
   * @param key The category of cookie to check consent status for
   * @returns Whether the user has consented to that cookie
   */
  @Method()
  async hasConsent(key: string) {
    return state.cookieConsent.acceptedCategories.includes(key);
  }
  /**
   * Get the categories that the user has consented to
   * @returns An array with the keys of all cookies that the user has consented to
   */
  @Method()
  async getCategoriesWithConsent() {
    return state.cookieConsent.acceptedCategories;
  }
  /**
   * Set the options used for the component. Is required to run at initialization, but can be run any number of times after that
   * @param userOptions The Options object that contains the settings for the component
   */
  @Method()
  async setOptions(userOptions: Options) {
    let options = { ...this.defaultOptions, ...userOptions };
    this.validateOptions(options);
    options = this.formatOptions(options);
    state.options = options;
  }
  /**
   * Make the banner reappear
   */
  @Method()
  async showBanner() {
    this.forceBannerVisibility = true;
    this.bannerHidden = false;
  }
  /**
   * Hide the banner
   */
  @Method()
  async hideBanner() {
    this.forceBannerVisibility = false;
    this.bannerHidden = true;
  }
  /**
   * Delete all previous set consents
   */
  @Method()
  async deleteConsent() {
    state.cookieConsent = {
      lastAccepted: null,
      acceptedCategories: [],
    };
  }
  /**
   * Set the styling used for the component.
   * Any undefined properties will use the last defined value for that property, the default value are only used if it has never been defined.
   * Can be run any number of times.
   * @param newStyling The StylingOptions object that contains the stylingt for the component. View the documentation of the StylingOptions object to see available styling options.
   */
  @Method()
  async setStyling(newStyling: StylingOptions) {
    const styling: StylingOptions = { ...this.getCurrentStyling(), ...newStyling };
    for (const key in styling) {
      this.el.style.setProperty('--' + key, styling[key]);
    }
  }
  @Element() el: HTMLCookieBannerElement;
  /**
   * Event when the user has updated their consent
   * @event consentUpdated
   * @property {string[]} detail - An array with the keys of all cookies that the user has consented to
   */
  @Event() consentUpdated: EventEmitter<string[]>;

  private readonly stringTokenForLink = '{Link}';

  private getCurrentStyling(): StylingOptions {
    return {
      borderRadiusMainbox: getComputedStyle(this.el).getPropertyValue('--borderRadiusMainbox'),
      borderRadiusButton: getComputedStyle(this.el).getPropertyValue('--borderRadiusButton'),
      borderRadiusButtonMobile: getComputedStyle(this.el).getPropertyValue('--borderRadiusButtonMobile'),
      backgroundColorButton: getComputedStyle(this.el).getPropertyValue('--backgroundColorButton'),
      borderColorButton: getComputedStyle(this.el).getPropertyValue('--borderColorButton'),
      textColorButton: getComputedStyle(this.el).getPropertyValue('--textColorButton'),
      textColorMainBox: getComputedStyle(this.el).getPropertyValue('--textColorMainBox'),
      backgroundColorMainBox: getComputedStyle(this.el).getPropertyValue('--backgroundColorMainBox'),
      borderColorMainBox: getComputedStyle(this.el).getPropertyValue('--borderColorMainBox'),
    };
  }
  private readonly defaultOptions: Options = {
    categories: [],
    cookiePolicyLastUpdated: null,
    storageName: 'cookie-consent',
    linkToPrivacyPolicy: null,
    useCookieButton: true,
    monthsOfValidity: 12,
    texts: {
      mainContent: null,
      linkText: 'privacy policy',
      accept: 'Accept all cookies',
      reject: 'Reject non-essential',
      moreOptions: 'More options',
      back: 'Back',
      confirm: 'Confirm selection',
      essentialCategoryName: 'Essential cookies',
      essentialPurpose: 'essential',
      essentialDescription:
        'Essental cookies are cookies that are strictly necessary for the core functionalities of the website. These are required to ensure proper behaviour when using the website and can not be disabled.',
    },
  };

  private validateOptions = (options: Options) => {
    //check for empty string or only whitespace string
    if (!options.linkToPrivacyPolicy?.trim()) {
      throw new Error('No linkToPrivacyPolicy provided');
    }
    if (!options.texts?.linkText?.trim()) {
      throw new Error('Empty linkText provided');
    }

    if (!options.texts?.mainContent && options.categories?.filter(c => !c.purpose).length) {
      throw new Error('Missing "purpose" in Category object to insert in default text');
    }

    if (options.monthsOfValidity < 0) {
      throw new Error('monthsOfValididy cannot be negative');
    }
  };

  private formatOptions = (options: Options) => {
    let formattedOptions = options;
    //Generate text if no text is provided
    if (!formattedOptions.texts.mainContent) {
      formattedOptions.texts.mainContent = `This website uses ${formattedOptions.texts.essentialPurpose} cookies, as well as cookies for ${this.listToString(
        formattedOptions.categories.map(c => c.purpose),
      )} purposes. Read more in our ${this.stringTokenForLink}. You can manage your choices at any time by clicking the cookie button.
      Click "${formattedOptions.texts.moreOptions}" to only allow some of the cookies or to view more details of the purposes.`;
    }

    //Turn text into html
    formattedOptions.texts.mainContent = formattedOptions.texts.mainContent.includes(this.stringTokenForLink) ? (
      <span>
        {formattedOptions.texts.mainContent.split(this.stringTokenForLink)[0]}
        <a href={formattedOptions.linkToPrivacyPolicy}>{formattedOptions.texts.linkText}</a>
        {formattedOptions.texts.mainContent.split(this.stringTokenForLink)[1]}
      </span>
    ) : (
      <span>
        {formattedOptions.texts.mainContent} <a href={formattedOptions.linkToPrivacyPolicy}>{formattedOptions.texts.linkText}</a>
      </span>
    );

    //Add datetime if missing
    if (formattedOptions.cookiePolicyLastUpdated == null) {
      console.warn('No date for cookiePolicyLastUpdated chosen - Current datetime will be selected, which will show the banner on every reload!');
      formattedOptions.cookiePolicyLastUpdated = new Date().toISOString();
    }

    return formattedOptions;
  };

  //From https://stackoverflow.com/questions/4782948/convert-a-javascript-array-into-a-readable-string
  private listToString(list: string[]) {
    return list.length == 1 ? list[0] : [list.slice(0, -1).join(', '), list.slice(-1)].join(' and ');
  }

  @State() isInOptionsView: boolean = false;
  @State() forceBannerVisibility = false;
  @State() bannerHidden = false;
  private bannerVisible() {
    return (this.forceBannerVisibility || new Date(state.cookieConsent.lastAccepted) < new Date(state.options.cookiePolicyLastUpdated)) && !this.bannerHidden;
  }

  private acceptCategories(categories: string[]) {
    state.cookieConsent = {
      lastAccepted: new Date().toISOString(),
      acceptedCategories: categories,
    };
    this.forceBannerVisibility = false;
    this.consentUpdated.emit(state.cookieConsent.acceptedCategories);
  }

  private showOptions = () => {
    this.isInOptionsView = true;
  };
  private hideOptions = () => {
    this.isInOptionsView = false;
  };

  moreOptionsVisible() {
    return this.isInOptionsView && this.bannerVisible();
  }
  primaryVisible() {
    return !this.isInOptionsView && this.bannerVisible();
  }
  render() {
    return (
      <div id="cookie-banner">
        <more-options-banner
          style={{ visibility: this.moreOptionsVisible() ? 'visible' : 'hidden', opacity: this.moreOptionsVisible() ? '1' : '0' }}
          class="visibility-animation"
          acceptedCategories={state.cookieConsent.acceptedCategories}
          acceptCategories={c => this.acceptCategories(c)}
          hideOptions={this.hideOptions}
        ></more-options-banner>
        <primary-banner
          style={{ visibility: this.primaryVisible() ? 'visible' : 'hidden', opacity: this.primaryVisible() ? '1' : '0' }}
          class="visibility-animation"
          acceptCategories={c => this.acceptCategories(c)}
          showOptions={this.showOptions}
          hideBanner={() => this.hideBanner()}
        ></primary-banner>
        {state.options.useCookieButton && !this.bannerVisible() ? <floating-cookie-button showBanner={() => this.showBanner()}></floating-cookie-button> : null}
      </div>
    );
  }
}
