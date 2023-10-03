import { Component, Prop, h } from '@stencil/core';
import state from '../../store/store';

@Component({
  tag: 'more-options-banner',
  shadow: false,
})
export class MoreOptionsBanner {
  @Prop() acceptedCategories: string[] = [];

  @Prop() acceptCategories: (categories: string[]) => void;
  @Prop() hideOptions: () => void;

  private categoryCheckboxes = [];

  acceptSelectedCookies = () => {
    const selectedCategories = this.categoryCheckboxes.filter(option => option.checked).map(option => option.value);
    this.acceptCategories(selectedCategories);
    this.hideOptions();
  };

  render() {
    return (
      <div class="options-box">
        {state.categories.map((category, index) => (
          <div key={category}>
            <input
              type="checkbox"
              class="checkbox"
              value={category}
              checked={this.acceptedCategories.includes(category)}
              ref={element => {
                this.categoryCheckboxes[index] = element;
              }}
            ></input>
            <p>{category}</p>
          </div>
        ))}
        <button onClick={this.hideOptions}>{state.texts.backText}</button>
        <button onClick={this.acceptSelectedCookies}>{state.texts.confirmText}</button>
      </div>
    );
  }
}
