import { Component, Host, Method, State, h } from '@stencil/core';
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
      mainContent: `This website uses cookies for functional, analytical and marketing purposes. Read more in our ${this.stringTokenForLink}. You can manage your choices at any time.`,
      linkText: 'privacy policy',
      accept: 'Accept all',
      reject: 'Reject non-essential',
      moreOptions: 'More options',
      back: 'Back',
      confirm: 'Confirm selection',
    },
  };

  @Method()
  async setOptions(userOptions: Options) {
    const options = { ...this.defaultOptions, ...userOptions };
    this.validateOptions(options);

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
  };

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

  render() {
    return (
      <Host style={this.bannerVisible() ? {} : { display: 'none' }}>
        <div class="dimmable-backdrop">
          {this.isInOptionsView ? (
            <more-options-banner
              acceptedCategories={state.cookieConsent.acceptedCategories}
              acceptCategories={c => this.acceptCategories(c)}
              hideOptions={() => this.hideOptions()}
            ></more-options-banner>
          ) : (
            <primary-banner stringTokenForLink={this.stringTokenForLink} acceptCategories={c => this.acceptCategories(c)} showOptions={() => this.showOptions()}></primary-banner>
          )}
        </div>
      </Host>
    );
  }
}
