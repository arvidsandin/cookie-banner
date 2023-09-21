import { Component, Method, State, h } from '@stencil/core';

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

  @State() mainTextContent: string = `Options have not been set - this cookie banner is non-functional. View the ${this.stringTokenForLink} for required options`;
  @State() linkText: string = 'documentation';
  @State() linkToPrivacyPolicy: string = 'https://github.com/arvidsandin/ask-manager#readme';
  @State() acceptText: string = null;
  @State() rejectText: string = null;
  @State() moreOptionsText: string = null;
  @State() backText: string = null;
  @State() confirmText: string = null;

  /**
   * key to use when storing the consent in localStorage
   */
  private storageName: string = null;

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
    this.storageName = options.storageName;
    this.categories = options.categories;
    this.cookiePolicyLastUpdated = options.cookiePolicyLastUpdated;
    this.mainTextContent = options.mainTextContent;
    this.linkText = options.linkText;
    this.linkToPrivacyPolicy = options.linkToPrivacyPolicy;
    this.acceptText = options.acceptText;
    this.rejectText = options.rejectText;
    this.moreOptionsText = options.moreOptionsText;
    this.backText = options.backText;
    this.confirmText = options.confirmText;

    if (this.cookiePolicyLastUpdated == null) {
      console.warn('No date for cookiePolicyLastUpdated chosen - Current datetime will be selected, which will show the banner on every reload!');
      this.cookiePolicyLastUpdated = new Date().toISOString();
    }
    this.cookieConsent = JSON.parse(localStorage.getItem(this.storageName)) || {
      lastAccepted: null,
      acceptedCategories: [],
    };
  }

  @State() isInOptionsView: boolean = false;

  private cookieConsent = {
    lastAccepted: null,
    acceptedCategories: [],
  };

  private acceptCategories(categories: string[]) {
    this.cookieConsent = {
      lastAccepted: new Date(),
      acceptedCategories: categories,
    };
    localStorage.setItem(this.storageName, JSON.stringify(this.cookieConsent));
  }

  private showOptions = () => {
    this.isInOptionsView = true;
  };
  private hideOptions = () => {
    this.isInOptionsView = false;
  };

  render() {
    return (
      <div class="dimmable-backdrop">
        {this.isInOptionsView ? (
          <more-options-banner
            categories={this.categories}
            backText={this.backText}
            confirmText={this.confirmText}
            acceptedCategories={this.cookieConsent.acceptedCategories}
            acceptCategories={c => this.acceptCategories(c)}
            hideOptions={() => this.hideOptions()}
          ></more-options-banner>
        ) : (
          <primary-banner
            categories={this.categories}
            mainTextContent={this.mainTextContent}
            linkText={this.linkText}
            linkToPrivacyPolicy={this.linkToPrivacyPolicy}
            acceptText={this.acceptText}
            rejectText={this.rejectText}
            moreOptionsText={this.moreOptionsText}
            stringTokenForLink={this.stringTokenForLink}
            acceptCategories={c => this.acceptCategories(c)}
            showOptions={() => this.showOptions()}
          ></primary-banner>
        )}
      </div>
    );
  }
}
