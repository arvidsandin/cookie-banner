import { Category } from './category';
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
  categories?: Category[];
  /**
   * Whether to use a floating button
   */
  useCookieButton?: boolean;
  texts?: {
    /**
     * text to show in the primary view of the banner
     * write {Link} instead of the word that should link to the privacy policy
     */
    mainContent?: string;
    /**
     * the word(s) to replace {Link} with
     */
    linkText?: string;
    /**
     * Text on the "Accept all" button
     */
    accept?: string;
    /**
     * text on the "Reject all" button
     */
    reject?: string;
    /**
     * text on the "More options" button
     */
    moreOptions?: string;
    /**
     * text on the "Back" button
     */
    back?: string;
    /**
     * text on the "Confirm selection" button
     */
    confirm?: string;
    /**
     * name of the "essential cookies" category
     */
    essentialCategoryName?: string;
    /**
     * purpose of the "essential cookies" category, written as an adjective
     */
    essentialPurpose?: string;
    /**
     * description of the "essential cookies" category
     */
    essentialDescription?: string;
  };
}
