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
        <div class="options">
          {
            <div class="option">
              <p>{state.options.texts.essentialCategoryName}</p>
              <p>{state.options.texts.essentialDescription}</p>
              <label class="checkbox-container">
                <input type="checkbox" class="checkbox" value="essential" checked={true} disabled={true}></input>
                <span class="checkmark disabled"></span>
              </label>
            </div>
          }
          {state.options.categories.map((category, index) => (
            <div class="option" key={category.key}>
              <p>{category.name}</p>
              <p>{category.description}</p>
              <label class="checkbox-container">
                <input
                  type="checkbox"
                  class="checkbox"
                  value={category.key}
                  checked={this.acceptedCategories.includes(category.key)}
                  ref={element => {
                    this.categoryCheckboxes[index] = element;
                  }}
                ></input>
                <span class="checkmark"></span>
              </label>
            </div>
          ))}
        </div>
        <div class="options-banner-buttons buttons">
          <button onClick={this.hideOptions}>{state.options.texts.back}</button>
          <button onClick={this.acceptSelectedCookies}>{state.options.texts.confirm}</button>
        </div>
      </div>
    );
  }
}
