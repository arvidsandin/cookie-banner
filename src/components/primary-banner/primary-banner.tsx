import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'primary-banner',
  shadow: false,
})
export class PrimaryBanner {
  @Prop() categories: string[];
  @Prop() mainTextContent: string;
  @Prop() linkText: string;
  @Prop() linkToPrivacyPolicy: string;
  @Prop() acceptText: string;
  @Prop() rejectText: string;
  @Prop() moreOptionsText: string;
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
        {this.mainTextContent.includes(this.stringTokenForLink) ? (
          <p class="info-text">
            {this.mainTextContent.split(this.stringTokenForLink)[0]}
            <a href={this.linkToPrivacyPolicy}>{this.linkText}</a>
            {this.mainTextContent.split(this.stringTokenForLink)[1]}
          </p>
        ) : (
          <p class="info-text">
            {this.mainTextContent} <a href={this.linkToPrivacyPolicy}>{this.linkText}</a>
          </p>
        )}
        <button onClick={this.showOptions}>{this.moreOptionsText}</button>
        <button onClick={this.rejectAllCookies}>{this.rejectText}</button>
        <button onClick={this.acceptAllCookies}>{this.acceptText}</button>
      </div>
    );
  }
}
