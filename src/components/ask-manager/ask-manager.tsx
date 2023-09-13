import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'ask-manager',
  styleUrl: 'ask-manager.css',
  shadow: true,
})
export class AskManager {
  /**
   * Has the user accepted cookies
   */
  @Prop() hasAccepted: boolean = false;

  render() {
    return (
      <div class="dimmable-background">
        <div class="consent-box">
          <p class="info-text">
            This website uses cookies for functional, analytical and marketing purposes. Read more in our <a href="https://example.com">privacy policy</a> You can manage your
            choices at any time.
          </p>
          <button>More options</button>
          <button>Reject non-essential</button>
          <button>Accept all</button>
        </div>
      </div>
    );
  }
}
