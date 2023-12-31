import { Component, Method, Prop, h } from '@stencil/core';
@Component({
  tag: 'floating-cookie-button',
  styleUrl: 'floating-cookie-button.css',
  shadow: true,
})
export class FloatingCookieButton {
  /**
   * A function to make the banner reappear
   */
  @Prop() showBanner: () => void;

  /**
   * Change the color of the cookie button
   * @param background CSS value to use for the background color
   * @param foreground CSS value to use for the cookie icon
   */
  @Method()
  async changeColor(background: string, foreground: string) {
    this.button.style.backgroundColor = background;
    this.button.style.color = foreground;

    const g_elements = this.button.getElementsByTagName('g');
    for (const g_element of g_elements) {
      g_element.style.stroke = foreground;
    }
  }

  button: HTMLButtonElement;

  render() {
    return (
      <button type="button" aria-label="Edit cookie consent" class="floating-button" onClick={this.showBanner} ref={el => (this.button = el)}>
        <svg width="74.983mm" height="73.728mm" version="1.1" viewBox="0 0 74.983 73.728" xmlns="http://www.w3.org/2000/svg">
          <g fill-opacity="0" stroke="#000">
            <path
              d="m71.991 36.872a34.493 33.863 0 0 1-21.367 31.316 34.493 33.863 0 0 1-37.629-7.4815 34.493 33.863 0 0 1-7.2724-37.01 34.493 33.863 0 0 1 32.094-20.686"
              stroke-width="6"
            />
            <g>
              <path d="m53.33 24.911a18.612 18.495 0 0 1-13.632-5.9158 18.612 18.495 0 0 1-4.9168-13.951" stroke-width="6" />
              <path d="m69.382 39.881a18.612 18.495 0 0 1-18.59-17.875" stroke-width="6" />
              <path
                d="m24.754 29.89a5.0304 4.9987 0 0 1-5.027-4.9695 5.0304 4.9987 0 0 1 4.9682-5.0276 5.0304 4.9987 0 0 1 5.0916 4.9042 5.0304 4.9987 0 0 1-4.902 5.0913z"
                stroke-width="3"
              />
              <path
                d="m25.816 56.191a5.0304 4.9987 0 0 1-5.027-4.9695 5.0304 4.9987 0 0 1 4.9682-5.0276 5.0304 4.9987 0 0 1 5.0916 4.9042 5.0304 4.9987 0 0 1-4.902 5.0913z"
                stroke-width="3"
              />
              <path
                d="m41.435 41.169a3.0814 3.062 0 0 1-3.0794-3.0441 3.0814 3.062 0 0 1 3.0433-3.0797 3.0814 3.062 0 0 1 3.1189 3.0041 3.0814 3.062 0 0 1-3.0028 3.1188z"
                stroke-width="2"
              />
              <path
                d="m14.762 41.342a3.0814 3.062 0 0 1-3.0794-3.0441 3.0814 3.062 0 0 1 3.0433-3.0797 3.0814 3.062 0 0 1 3.1189 3.0041 3.0814 3.062 0 0 1-3.0028 3.1188z"
                stroke-width="2"
              />
              <path
                d="m47.573 60.867a5.0304 4.9987 0 0 1-5.027-4.9695 5.0304 4.9987 0 0 1 4.9682-5.0276 5.0304 4.9987 0 0 1 5.0916 4.9042 5.0304 4.9987 0 0 1-4.902 5.0913z"
                stroke-width="3"
              />
            </g>
          </g>
        </svg>
      </button>
    );
  }
}
