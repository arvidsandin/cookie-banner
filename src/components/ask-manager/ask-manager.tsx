import { Component, Host, Method, State, h } from '@stencil/core';
import state from '../../store/store';

@Component({
  tag: 'ask-manager',
  styleUrl: 'ask-manager.css',
  shadow: true,
})
export class AskManager {
  /**
   * last time the privacy policy or which cookies that are used by the website was updated
   * used to know if updated consent is needed
   * can be any string that can be read by Date()
   */
  private cookiePolicyLastUpdated: string = null;
  private readonly stringTokenForLink = '{Link}';

  private readonly defaultOptions = {
    categories: [],
    cookiePolicyLastUpdated: null,
    storageName: 'cookie-consent',
    linkToPrivacyPolicy: null,
    texts: {
      mainTextContent: `This website uses cookies for functional, analytical and marketing purposes. Read more in our ${this.stringTokenForLink}. You can manage your choices at any time.`,
      linkText: 'privacy policy',
      acceptText: 'Accept all',
      rejectText: 'Reject non-essential',
      moreOptionsText: 'More options',
      backText: 'Back',
      confirmText: 'Confirm selection',
    },
  };

  @Method()
  async setOptions(userOptions) {
    const options = { ...this.defaultOptions, ...userOptions };
    this.validateOptions(options);

    state.storageName = options.storageName;
    state.categories = options.categories;
    this.cookiePolicyLastUpdated = options.cookiePolicyLastUpdated;
    state.linkToPrivacyPolicy = options.linkToPrivacyPolicy;
    state.texts.linkText = options.texts.linkText;
    state.texts.acceptText = options.texts.acceptText;
    state.texts.rejectText = options.texts.rejectText;
    state.texts.moreOptionsText = options.texts.moreOptionsText;
    state.texts.backText = options.texts.backText;
    state.texts.confirmText = options.texts.confirmText;
    state.texts.mainTextContent = options.texts.mainTextContent.includes(this.stringTokenForLink) ? (
      <span>
        {options.texts.mainTextContent.split(this.stringTokenForLink)[0]}
        <a href={options.linkToPrivacyPolicy}>{options.texts.linkText}</a>
        {options.texts.mainTextContent.split(this.stringTokenForLink)[1]}
      </span>
    ) : (
      <span>
        {options.texts.mainTextContent} <a href={options.linkToPrivacyPolicy}>{options.texts.linkText}</a>
      </span>
    );

    if (this.cookiePolicyLastUpdated == null) {
      console.warn('No date for cookiePolicyLastUpdated chosen - Current datetime will be selected, which will show the banner on every reload!');
      this.cookiePolicyLastUpdated = new Date().toISOString();
    }
  }

  private validateOptions = (options: any) => {
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
    return this.forceBannerVisibility || new Date(state.cookieConsent.lastAccepted) < new Date(this.cookiePolicyLastUpdated);
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
