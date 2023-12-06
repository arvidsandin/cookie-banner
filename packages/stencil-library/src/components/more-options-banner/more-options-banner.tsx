import { Component, Prop, h } from '@stencil/core';
import state from '../../store/store';

@Component({
  tag: 'more-options-banner',
  shadow: false,
})
export class MoreOptionsBanner {
  /**
   * The categories that are already accepted and should be shown as pre-checked to the user
   */
  @Prop() acceptedCategories: string[] = [];
  /**
   * A function to use when accepting categories
   */
  @Prop() acceptCategories: (categories: string[]) => void;
  /**
   * A function to no longer set the options view as the active one
   */
  @Prop() hideOptions: () => void;

  private categoryCheckboxes = [];

  private acceptSelectedCookies = () => {
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
              <p class="category-name">{state.options.texts.essentialCategoryName}</p>
              <p class="categpry-description">{state.options.texts.essentialDescription}</p>
              <label class="checkbox-container">
                <input type="checkbox" class="checkbox" value="essential" checked={true} disabled={true}></input>
                <span class="checkmark disabled"></span>
              </label>
            </div>
          }
          {state.options.categories.map((category, index) => (
            <div class="option" key={category.key}>
              <p class="category-name">{category.name}</p>
              <p class="categpry-description">{category.description}</p>
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
