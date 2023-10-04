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
        {state.options.categories.map((category, index) => (
          <div key={category.key}>
            <input
              type="checkbox"
              class="checkbox"
              value={category.key}
              checked={this.acceptedCategories.includes(category.key)}
              ref={element => {
                this.categoryCheckboxes[state.options.categories.indexOf(category)] = element;
              }}
            ></input>
            <p>{category.name}</p>
            <p>{category.description}</p>
          </div>
        ))}
        <button onClick={this.hideOptions}>{state.options.texts.back}</button>
        <button onClick={this.acceptSelectedCookies}>{state.options.texts.confirm}</button>
      </div>
    );
  }
}
