export interface StylingOptions {
  /**
   * The border radius of the cookie banner
   * @default `'3px'`
   */
  borderRadiusMainBox?: string;
  /**
   * The border radius of the buttons
   * @default `'10px'`
   */
  borderRadiusButton?: string;
  /**
   * The border radius of the buttons in mobile view
   * @default `'10px'`
   */
  borderRadiusButtonMobile?: string;
  /**
   * The background color of the buttons
   * @default `'#000000'`
   */
  backgroundColorButton?: string;
  /**
   * The border color of the buttons
   * @default `'#000000'`
   */
  borderColorButton?: string;
  /**
   * The text color on the buttons
   * @default `'#ffffff'`
   */
  textColorButton?: string;
  /**
   * The text color in the cookie banner
   * @default `'#000000'`
   */
  textColorMainBox?: string;
  /**
   * The text color of the link to the privacy policy link
   * @default `'#3366CC'`
   */
  textColorLink?: string;
  /**
   * The background color of the cookie banner
   * @default `'#ffffff'`
   */
  backgroundColorMainBox?: string;
  /**
   * The border color of the buttons
   * @default `'#000000'`
   */
  borderColorMainBox?: string;
}
