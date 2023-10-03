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
        <p class="info-text">{state.options.texts.mainContent}</p>
        <button onClick={this.showOptions}>{state.options.texts.moreOptions}</button>
        <button onClick={this.rejectAllCookies}>{state.options.texts.reject}</button>
        <button onClick={this.acceptAllCookies}>{state.options.texts.accept}</button>
      </div>
    );
  }
}
