export interface Options {
  /**
   * last time the privacy policy or which cookies that are used by the website was updated
   * used to know if updated consent is needed
   * can be any string that can be read by Date()
   */
  cookiePolicyLastUpdated: string;
  /**
   * name to use for the key in localStorage
   */
  storageName?: string;
  /**
   * relative or absolute link to privacy policy
   */
  linkToPrivacyPolicy: string;
  /**
   * the categories of cookies to ask for consent for
   */
  categories?: string[];
  texts?: {
    /**
     * text to show in the primary view of the banner
     * write {Link} instead of the word that should link to the privacy policy
     */
    mainTextContent?: string;
    /**
     * the word(s) to replace {Link} with
     */
    linkText?: string;
    /**
     * Text on the "Accept all" button
     */
    acceptText?: string;
    /**
     * text on the "Reject all" button
     */
    rejectText?: string;
    /**
     * text on the "More options" button
     */
    moreOptionsText?: string;
    /**
     * text on the "Back" button
     */
    backText?: string;
    /**
     * text on the "Confirm selection" button
     */
    confirmText?: string;
  };
}
