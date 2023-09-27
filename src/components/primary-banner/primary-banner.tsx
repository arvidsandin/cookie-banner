import { Component, Prop, h } from '@stencil/core';
import state from '../../store/store';

@Component({
  tag: 'primary-banner',
  shadow: false,
})
export class PrimaryBanner {
  @Prop() categories: string[];
  @Prop() stringTokenForLink: string;

  @Prop() acceptCategories: (categories: string[]) => void;
  @Prop() showOptions: () => void;

  private rejectAllCookies = () => {
    this.acceptCategories([]);
  };
  private acceptAllCookies = () => {
    this.acceptCategories(this.categories);
  };

  render() {
    return (
      <div class="consent-box">
        <p class="info-text">{state.texts.mainTextContent}</p>
        <button onClick={this.showOptions}>{state.texts.moreOptionsText}</button>
        <button onClick={this.rejectAllCookies}>{state.texts.rejectText}</button>
        <button onClick={this.acceptAllCookies}>{state.texts.acceptText}</button>
      </div>
    );
  }
}
