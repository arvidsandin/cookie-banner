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

  /**
   * key to use when storing the consent in localStorage
   */
  private storageName: string = null;

  private readonly defaultOptions = {
    categories: [],
    cookiePolicyLastUpdated: null,
    storageName: 'cookie-consent',
  };

  @Method()
  async setOptions(userOptions) {
    const options = { ...this.defaultOptions, ...userOptions };
    this.storageName = options.storageName;
    this.categories = options.categories;
    this.cookiePolicyLastUpdated = options.cookiePolicyLastUpdated;

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

  private categoryCheckboxes = [];

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
  private rejectAllCookies = () => {
    this.acceptCategories([]);
  };
  private acceptAllCookies = () => {
    this.acceptCategories(this.categories);
  };
  private acceptSelectedCookies = () => {
    const selectedCategories = this.categoryCheckboxes.filter(option => option.checked).map(option => option.value);
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
            <button onClick={this.hideOptions}>Back</button>
            <button onClick={this.acceptSelectedCookies}>Confirm selection</button>
          </div>
        ) : (
          <div class="consent-box">
            <p class="info-text">
              This website uses cookies for functional, analytical and marketing purposes. Read more in our <a href="https://example.com">privacy policy</a> You can manage your
              choices at any time.
            </p>
            <button onClick={this.showOptions}>More options</button>
            <button onClick={this.rejectAllCookies}>Reject non-essential</button>
            <button onClick={this.acceptAllCookies}>Accept all</button>
          </div>
        )}
      </div>
    );
  }
}
