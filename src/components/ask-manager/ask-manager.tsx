import { Component, Host, Method, State, h } from '@stencil/core';
import state from '../../store/store';

@Component({
  tag: 'ask-manager',
  styleUrl: 'ask-manager.css',
  shadow: true,
})
export class AskManager {
  /**
   * list of categories of the cookies
   */
  private categories: string[] = [];

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
    mainTextContent: `This website uses cookies for functional, analytical and marketing purposes. Read more in our ${this.stringTokenForLink}. You can manage your choices at any time.`,
    linkText: 'privacy policy',
    linkToPrivacyPolicy: null,
    acceptText: 'Accept all',
    rejectText: 'Reject non-essential',
    moreOptionsText: 'More options',
    backText: 'Back',
    confirmText: 'Confirm selection',
  };

  @Method()
  async setOptions(userOptions) {
    const options = { ...this.defaultOptions, ...userOptions };

    //check for empty string or only whitespace string
    if (!options.linkToPrivacyPolicy || !options.linkToPrivacyPolicy.trim()) {
      throw new Error('No linkToPrivacyPolicy provided');
    }
    if (!options.linkText || !options.linkText.trim()) {
      throw new Error('Empty linkText provided');
    }
    state.storageName = options.storageName;
    this.categories = options.categories;
    this.cookiePolicyLastUpdated = options.cookiePolicyLastUpdated;
    state.texts.mainTextContent = options.mainTextContent;
    state.texts.linkText = options.linkText;
    state.linkToPrivacyPolicy = options.linkToPrivacyPolicy;
    state.texts.acceptText = options.acceptText;
    state.texts.rejectText = options.rejectText;
    state.texts.moreOptionsText = options.moreOptionsText;
    state.texts.backText = options.backText;
    state.texts.confirmText = options.confirmText;

    if (this.cookiePolicyLastUpdated == null) {
      console.warn('No date for cookiePolicyLastUpdated chosen - Current datetime will be selected, which will show the banner on every reload!');
      this.cookiePolicyLastUpdated = new Date().toISOString();
    }
  }

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
              categories={this.categories}
              acceptedCategories={state.cookieConsent.acceptedCategories}
              acceptCategories={c => this.acceptCategories(c)}
              hideOptions={() => this.hideOptions()}
            ></more-options-banner>
          ) : (
            <primary-banner
              categories={this.categories}
              stringTokenForLink={this.stringTokenForLink}
              acceptCategories={c => this.acceptCategories(c)}
              showOptions={() => this.showOptions()}
            ></primary-banner>
          )}
        </div>
      </Host>
    );
  }
}
