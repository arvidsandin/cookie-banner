import { Component, Method, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'ask-manager',
  styleUrl: 'ask-manager.css',
  shadow: true,
})
export class AskManager {
  /**
   * list of categories of the cookies
   */
  categories: string[] = [];

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
  @Prop() storageName: string = 'cookie-consent';

  private readonly defaultOptions = {
    categories: [],
    cookiePolicyLastUpdated: null,
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
    if (!options.linkToPrivacyPolicy.trim()) {
      throw new Error('No linkToPrivacyPolicy provided');
    }
    if (!options.linkText.trim()) {
      throw new Error('No linkText provided');
    }
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
  }

  @State() isInOptionsView: boolean = false;

  categoryCheckboxes = [];

  cookieConsent = JSON.parse(localStorage.getItem(this.storageName)) || {
    lastAccepted: null,
    acceptedCategories: [],
  };

  acceptCategories(categories: string[]) {
    this.cookieConsent = {
      lastAccepted: new Date(),
      acceptedCategories: categories,
    };
    localStorage.setItem(this.storageName, JSON.stringify(this.cookieConsent));
  }

  showOptions = () => {
    this.isInOptionsView = true;
  };
  hideOptions = () => {
    this.isInOptionsView = false;
  };
  rejectAllCookies = () => {
    this.acceptCategories([]);
  };
  acceptAllCookies = () => {
    this.acceptCategories(this.categories);
  };
  acceptSelectedCookies = () => {
    let selectedCategories = [];
    for (const option of this.categoryCheckboxes) {
      if (option.checked) {
        selectedCategories.push(option.value);
      }
    }
    this.acceptCategories(selectedCategories);
    this.isInOptionsView = false;
  };

  render() {
    return (
      <div class="dimmable-backdrop">
        {this.isInOptionsView ? (
          <div class="options-box">
            {this.categories.map(category => (
              <div key={category}>
                <input
                  type="checkbox"
                  class="checkbox"
                  value={category}
                  checked={this.cookieConsent.acceptedCategories.includes(category)}
                  ref={element => {
                    this.categoryCheckboxes[this.categories.indexOf(category)] = element;
                  }}
                ></input>
                <p>{category}</p>
              </div>
            ))}
            <button onClick={this.hideOptions}>{this.backText}</button>
            <button onClick={this.acceptSelectedCookies}>{this.confirmText}</button>
          </div>
        ) : (
          <div class="consent-box">
            {this.mainTextContent.includes(this.stringTokenForLink) ? (
              <p class="info-text">
                {this.mainTextContent.split(this.stringTokenForLink)[0]}
                <a href={this.linkToPrivacyPolicy}>{this.linkText}</a>
                {this.mainTextContent.split(this.stringTokenForLink)[1]}
              </p>
            ) : (
              <p class="info-text">
                {this.mainTextContent} <a href={this.linkToPrivacyPolicy}>{this.linkText}</a>
              </p>
            )}
            <button onClick={this.showOptions}>{this.moreOptionsText}</button>
            <button onClick={this.acceptAllCookies}>{this.rejectText}</button>
            <button onClick={this.rejectAllCookies}>{this.acceptText}</button>
          </div>
        )}
      </div>
    );
  }
}
