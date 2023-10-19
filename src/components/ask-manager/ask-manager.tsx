import { Component, Method, State, Event, EventEmitter, h } from '@stencil/core';
import state from '../../store/store';
import { Options } from '../../utils/options';

@Component({
  tag: 'ask-manager',
  styleUrl: 'ask-manager.css',
  shadow: true,
})
export class AskManager {
  @Method()
  async hasConsent(key: string) {
    return state.cookieConsent.acceptedCategories.includes(key);
  }
  @Method()
  async getCategoriesWithConsent() {
    return state.cookieConsent.acceptedCategories;
  }
  @Method()
  async setOptions(userOptions: Options) {
    let options = { ...this.defaultOptions, ...userOptions };
    this.validateOptions(options);
    options = this.formatOptions(options);
    state.options = options;
  }
  @Method()
  async showBanner() {
    this.forceBannerVisibility = true;
  }
  @Method()
  async deleteConsent() {
    state.cookieConsent = {
      lastAccepted: null,
      acceptedCategories: [],
    };
  }
  @Event() consentUpdated: EventEmitter<string[]>;

  private readonly stringTokenForLink = '{Link}';

  private readonly defaultOptions: Options = {
    categories: [],
    cookiePolicyLastUpdated: null,
    storageName: 'cookie-consent',
    linkToPrivacyPolicy: null,
    useCookieButton: true,
    texts: {
      mainContent: null,
      linkText: 'privacy policy',
      accept: 'Accept all',
      reject: 'Reject non-essential',
      moreOptions: 'More options',
      back: 'Back',
      confirm: 'Confirm selection',
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
  };

  private formatOptions = (options: Options) => {
    let formattedOptions = options;
    //Generate text if no text is provided
    if (!formattedOptions.texts.mainContent) {
      formattedOptions.texts.mainContent = `This website uses cookies for ${this.listToString(formattedOptions.categories.map(c => c.purpose))} purposes. Read more in our ${
        this.stringTokenForLink
      }. You can manage your choices at any time by clicking the cookie button.`;
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

  private listToString(list: string[]) {
    return list.length == 1 ? list[0] : [list.slice(0, -1).join(', '), list.slice(-1)].join(' and ');
  }

  @State() isInOptionsView: boolean = false;
  @State() forceBannerVisibility = false;
  private bannerVisible() {
    return this.forceBannerVisibility || new Date(state.cookieConsent.lastAccepted) < new Date(state.options.cookiePolicyLastUpdated);
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

  private floatingCookieButton: HTMLFloatingCookieButtonElement;

  render() {
    return this.bannerVisible() ? (
      <div class="dimmable-backdrop">
        {this.isInOptionsView ? (
          <more-options-banner
            acceptedCategories={state.cookieConsent.acceptedCategories}
            acceptCategories={c => this.acceptCategories(c)}
            hideOptions={this.hideOptions}
          ></more-options-banner>
        ) : (
          <primary-banner stringTokenForLink={this.stringTokenForLink} acceptCategories={c => this.acceptCategories(c)} showOptions={this.showOptions}></primary-banner>
        )}
      </div>
    ) : state.options.useCookieButton ? (
      <div>
        <floating-cookie-button showBanner={() => this.showBanner()} ref={el => (this.floatingCookieButton = el)}></floating-cookie-button>
      </div>
    ) : null;
  }
}
