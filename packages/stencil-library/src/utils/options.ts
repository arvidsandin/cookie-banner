import { Category } from './category';
export interface Options {
  /**
   * A date of the last time the cookie policy was updated.
   * If the user consented earlier than this date, new consent will be required.
   * Can be any string parsable by the Date() function in Javascript.
   */
  cookiePolicyLastUpdated: string;
  /**
   * A relative or absolute link to a privacy policy or cookie policy.
   */
  linkToPrivacyPolicy: string;
  /**
   * The key to use for storing the consent in localStorage.
   * @default `'cookie-consent'`
   */
  storageName?: string;
  /**
   * The categories of non-essential cookies used on the website.
   * See below for details about the Category type.
   * If left empty, it implies only essential cookies are used, in which case it doesn't really make sense to use `cookie-banner`, as the GDPR does not require the same level of consent when only essential cookies are used.
   * @default `[]`
   */
  categories?: Category[];
  /**
   * Whether to include a floating button to change consent in the future. If set to `false`, another action that calls the `cookie-banner.showBanner()` method has to be offered on to the user, such as through a link in the footer of the website.
   * @default `true`
   */
  useCookieButton?: boolean;
  /**
   * How many months a cookie choice should be considered valid
   * @default 12
   */
  monthsOfValidity?: number;
  texts?: {
    /**
     * The text viewed in the first layer of the cookie banner.
     * If not set, it will automatically insert the categories defined in `categories` in the text.
     * Write {Link} (with brackets) in place of the word that you want to link to the privacy policy, and the word itself in `texts.linkText`.
     * If no occurence of { Link } is found, the word and link will be appended at the end.
     * To comply with the GDPR, this text must contain the purposes(categories) of the cookies used, a link to an information page(privacy policy) and information that the user can withdraw their consent at any time and how they can do that.
     * @default `'This website uses cookies for [purpose categories] purposes. Read more in our {Link}. You can manage your choices at any time by clicking the cookie button. Click "More options" to only allow some of the cookies or to view more details of the purposes.'`
     */
    mainContent?: string;
    /**
     * The word(s) that should link to the privacy/cookie policy.
     * Will replace {Link} in `texts.mainContent`.
     * @default `'privacy policy'`
     */
    linkText?: string;
    /**
     * The text on the button that accepts all cookies.
     * **Do not** write something ambiguous like "Okay" or "I understand"(understanding is not the same as consenting), as the consent is not valid according to the GDPR if the user has not unambiguously given it.
     * @default `'Accept all'`
     */
    accept?: string;
    /**
     * The text on the button that rejects all non - essential cookies.
     * @default `'Reject non-essential cookies'`
     */
    reject?: string;
    /**
     * The text on the button that takes the user to the second layer of the cookie banner.
     * @default `'More options'`
     */
    moreOptions?: string;
    /**
     * The text on the button that takes the user back to the first layer from the second layer of the cookie banner.
     * @default `'Back'`
     */
    back?: string;
    /**
     * The text on the button that confirms the user's selected options.
     * @default `'Confirm selection'`
     */
    confirm?: string;
    /**
     * The name of the "essential" category displayed in the second layer of the cookie banner.
     * @default `'Essential cookies'`
     */
    essentialCategoryName?: string;
    /**
     * The adjective to use in `options.texts.mainContent` before the word "cookies". This is required if `options.texts.mainContent` is not set, otherwise it will not be used at all.
     * @default `'essential'`
     */
    essentialPurpose?: string;
    /**
     * The desription of the "essential cookies" category diplayed in the second layer of the cookie banner
     * @default `'Essental cookies are cookies that are strictly necessary for the core functionalities of the website. These are required to ensure proper behaviour when using the website and can not be disabled.'`
     */
    essentialDescription?: string;
  };
}
