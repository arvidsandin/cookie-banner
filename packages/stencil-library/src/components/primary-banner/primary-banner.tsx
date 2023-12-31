import { Component, Prop, h } from '@stencil/core';
import state from '../../store/store';

@Component({
  tag: 'primary-banner',
  shadow: false,
})
export class PrimaryBanner {
  /**
   * A function to use when accepting categories
   */
  @Prop() acceptCategories: (categories: string[]) => void;
  /**
   * A function to set the options view as the active one
   */
  @Prop() showOptions: () => void;
  /**
   * A function to make the banner reappear
   */
  @Prop() hideBanner: () => void;

  private rejectAllCookies = () => {
    this.acceptCategories([]);
  };
  private acceptAllCookies = () => {
    this.acceptCategories(state.options.categories.map(c => c.key));
  };

  // Copy to not interfere with Stencil's renderer cache
  private getCopyOfMainContent() {
    return JSON.parse(JSON.stringify(state.options.texts.mainContent));
  }

  render() {
    return (
      <div class="consent-box">
        <div class="info-text">
          <p>{this.getCopyOfMainContent()}</p>
        </div>
        <button type="button" aria-label="Close cookie banner" class="close-button" onClick={this.hideBanner}>
          <span aria-hidden="true">✖</span>
        </button>
        <div class="primary-banner-buttons buttons">
          <button onClick={this.showOptions}>{state.options.texts.moreOptions}</button>
          <button onClick={this.rejectAllCookies}>{state.options.texts.reject}</button>
          <button onClick={this.acceptAllCookies}>{state.options.texts.accept}</button>
        </div>
      </div>
    );
  }
}
