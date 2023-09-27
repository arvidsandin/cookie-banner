import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'more-options-banner',
  shadow: false,
})
export class MoreOptionsBanner {
  @Prop() categories: string[] = [];
  @Prop() backText: string = null;
  @Prop() confirmText: string = null;
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
          {this.categories.map(category => (
            <div class="option" key={category}>
              <p>{category}</p>
              <label class="checkbox-container">
                <input
                  type="checkbox"
                  class="checkbox"
                  value={category}
                  checked={this.acceptedCategories.includes(category)}
                  ref={element => {
                    this.categoryCheckboxes[this.categories.indexOf(category)] = element;
                  }}
                ></input>
                <span class="checkmark"></span>
              </label>
            </div>
          ))}
        </div>
        <div class="options-banner-buttons">
          <button onClick={this.hideOptions}>{this.backText}</button>
          <button onClick={this.acceptSelectedCookies}>{this.confirmText}</button>
        </div>
      </div>
    );
  }
}
