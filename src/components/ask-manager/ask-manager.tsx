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
  @Prop() hasAccepted: boolean;

  render() {
    return <div><p>This website uses cookies</p></div>;
  }
}
