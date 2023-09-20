import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'primary-banner',
  shadow: false,
})
export class PrimaryBanner {
  private readonly stringTokenForLink = '{Link}';

  @Prop() categories;
  @Prop() mainTextContent: string = `Options have not been set - this cookie banner is non-functional. View the ${this.stringTokenForLink} for required options`;
  @Prop() linkText: string = 'documentation';
  @Prop() linkToPrivacyPolicy: string = 'https://github.com/arvidsandin/ask-manager#readme';
  @Prop() acceptText: string = null;
  @Prop() rejectText: string = null;
  @Prop() moreOptionsText: string = null;

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
