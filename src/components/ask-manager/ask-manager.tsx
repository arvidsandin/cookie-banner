import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'ask-manager',
  styleUrl: 'ask-manager.css',
  shadow: true,
})
export class AskManager {
  /**
   * list of categories of the cookies
   */
  @Prop() categories: string[] = [];

  /**
   * last time the privacy policy or which cookies that are used by the website was updated
   * used to know if updated consent is needed
   * can be any string that can be read by Date()
   */
  @Prop() cookiePolicyLastUpdated!: string;

  cookieConsent = JSON.parse(localStorage.getItem('cookie-consent')) || {
    lastAccepted: null,
    acceptedCategories: [],
  };

  acceptCategories(categories: string[]) {
    this.cookieConsent = {
      lastAccepted: new Date(),
      acceptedCategories: categories,
    };
    localStorage.setItem(`cookie-consent`, JSON.stringify(this.cookieConsent));
  }

  showOptions = () => {
    // TODO
  };
  rejectAllCookies = () => {
    this.acceptCategories([]);
  };
  acceptAllCookies = () => {
    this.acceptCategories(this.categories);
  };

  render() {
    return (
      <div class="dimmable-backdrop">
        <div class="consent-box">
          <p class="info-text">
            This website uses cookies for functional, analytical and marketing purposes. Read more in our <a href="https://example.com">privacy policy</a> You can manage your
            choices at any time.
          </p>
          <button onClick={this.showOptions}>More options</button>
          <button onClick={this.acceptAllCookies}>Reject non-essential</button>
          <button onClick={this.rejectAllCookies}>Accept all</button>
        </div>
      </div>
    );
  }
}
