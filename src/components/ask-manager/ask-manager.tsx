import { Component, Method, State, Event, EventEmitter, h } from '@stencil/core';
import state from '../../store/store';
import { Options } from '../../utils/options';

@Component({
  tag: 'ask-manager',
  styleUrl: 'ask-manager.css',
  shadow: true,
})
export class AskManager {
  private readonly stringTokenForLink = '{Link}';

  private readonly defaultOptions = {
    categories: [],
    cookiePolicyLastUpdated: null,
    storageName: 'cookie-consent',
    linkToPrivacyPolicy: null,
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

  @Event() consentUpdated: EventEmitter<string[]>;

  @Method()
  async setOptions(userOptions: Options) {
    const options = { ...this.defaultOptions, ...userOptions };
    this.validateOptions(options);
    this.formatOptions(options);
    state.options = options;
  }

  private validateOptions = (options: Options) => {
    //check for empty string or only whitespace string
    if (!options.linkToPrivacyPolicy?.trim()) {
      throw new Error('No linkToPrivacyPolicy provided');
    }
    if (!options.texts?.linkText?.trim()) {
      throw new Error('Empty linkText provided');
    }
    if (!options.texts?.mainContent && options.categories?.filter(c => !c.adjective).length) {
      throw new Error('No adjectives to insert in default text');
    }
  };

  private formatOptions = (options: Options) => {
    if (!options.texts.mainContent) {
      options.texts.mainContent = `This website uses cookies for ${this.listToString(options.categories.map(c => c.adjective))} purposes. Read more in our ${
        this.stringTokenForLink
      }. You can manage your choices at any time.`;
    }

    options.texts.mainContent = options.texts.mainContent.includes(this.stringTokenForLink) ? (
      <span>
        {options.texts.mainContent.split(this.stringTokenForLink)[0]}
        <a href={options.linkToPrivacyPolicy}>{options.texts.linkText}</a>
        {options.texts.mainContent.split(this.stringTokenForLink)[1]}
      </span>
    ) : (
      <span>
        {options.texts.mainContent} <a href={options.linkToPrivacyPolicy}>{options.texts.linkText}</a>
      </span>
    );

    if (options.cookiePolicyLastUpdated == null) {
      console.warn('No date for cookiePolicyLastUpdated chosen - Current datetime will be selected, which will show the banner on every reload!');
      options.cookiePolicyLastUpdated = new Date().toISOString();
    }
  };

  private listToString(list) {
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

  @Method()
  async showBanner() {
    this.forceBannerVisibility = true;
  }

  private showOptions = () => {
    this.isInOptionsView = true;
  };
  private hideOptions = () => {
    this.isInOptionsView = false;
  };

  @Method()
  async hasConsent(key: string) {
    return state.cookieConsent.acceptedCategories.includes(key);
  }

  @Method()
  async getCategoriesWithConsent() {
    return state.cookieConsent.acceptedCategories;
  }

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
    ) : null;
  }
}
