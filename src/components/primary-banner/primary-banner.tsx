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
    this.acceptCategories(state.options.categories);
  };

  render() {
    return (
      <div class="consent-box">
        <p class="info-text">{state.options.texts.mainTextContent}</p>
        <button onClick={this.showOptions}>{state.options.texts.moreOptionsText}</button>
        <button onClick={this.rejectAllCookies}>{state.options.texts.rejectText}</button>
        <button onClick={this.acceptAllCookies}>{state.options.texts.acceptText}</button>
      </div>
    );
  }
}
