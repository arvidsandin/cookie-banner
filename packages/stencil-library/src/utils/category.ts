export interface Category {
  /**
   * The key used for the category when storing the consent and check the status of the consent.
   *
   * Example: `'analytics'`
   */
  key: string;
  /**
   * The adjective to use in `options.texts.mainContent` before the word "purposes".
   * This is **required** if `options.texts.mainContent` is not set, otherwise it will not be used at all.
   *
   * Example: `'analytical'`
   */
  purpose?: string;
  /**
   * The descriptions diplayed in the second layer of the cookie banner.
   */
  description: string;
  /**
   * The name of the category displayed in the second layer of the cookie banner.
   *
   * Example: `'Analytical cookies'`
   */
  name: string;
}
