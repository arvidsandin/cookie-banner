[@cookie-banner/stencil](../README.md) / [options](../modules/options.md) / Options

# Interface: Options

[options](../modules/options.md).Options

## Table of contents

### Properties

- [categories](options.Options.md#categories)
- [cookiePolicyLastUpdated](options.Options.md#cookiepolicylastupdated)
- [linkToPrivacyPolicy](options.Options.md#linktoprivacypolicy)
- [storageName](options.Options.md#storagename)
- [texts](options.Options.md#texts)
- [useCookieButton](options.Options.md#usecookiebutton)

## Properties

### categories

• `Optional` **categories**: [`Category`](category.Category.md)[]

The categories of non-essential cookies used on the website.
See below for details about the Category type.
If left empty, it implies only essential cookies are used, in which case it doesn't really make sense to use `cookie-banner`, as the GDPR does not require the same level of consent when only essential cookies are used.

**`Default`**

`[]`

#### Defined in

[options.ts:24](https://github.com/arvidsandin/cookie-banner/blob/e5447aa/packages/stencil-library/src/utils/options.ts#L24)

___

### cookiePolicyLastUpdated

• **cookiePolicyLastUpdated**: `string`

A date of the last time the cookie policy was updated.
If the user consented earlier than this date, new consent will be required.
Can be any string parsable by the Date() function in Javascript.

#### Defined in

[options.ts:8](https://github.com/arvidsandin/cookie-banner/blob/e5447aa/packages/stencil-library/src/utils/options.ts#L8)

___

### linkToPrivacyPolicy

• **linkToPrivacyPolicy**: `string`

A relative or absolute link to the privacy policy.

#### Defined in

[options.ts:12](https://github.com/arvidsandin/cookie-banner/blob/e5447aa/packages/stencil-library/src/utils/options.ts#L12)

___

### storageName

• `Optional` **storageName**: `string`

The key to use for storing the consent in localStorage.

**`Default`**

`'cookie-consent'`

#### Defined in

[options.ts:17](https://github.com/arvidsandin/cookie-banner/blob/e5447aa/packages/stencil-library/src/utils/options.ts#L17)

___

### texts

• `Optional` **texts**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `accept?` | `string` | The text on the button that accepts all cookies. **Do not** write something ambiguous like "Okay" or "I understand"(understanding is not the same as consenting), as the consent is not valid according to the GDPR if the user has not unambiguously given it. **`Default`** `'Accept all'` |
| `back?` | `string` | The text on the button that takes the user back to the first layer from the second layer of the cookie banner. **`Default`** `'Back'` |
| `confirm?` | `string` | The text on the button that confirms the user's selected options. **`Default`** `'Confirm selection'` |
| `essentialCategoryName?` | `string` | The name of the "essential" category displayed in the second layer of the cookie banner. **`Default`** `'Essential cookies'` |
| `essentialDescription?` | `string` | The desription of the "essential cookies" category diplayed in the second layer of the cookie banner **`Default`** `'Essental cookies are cookies that are strictly necessary for the core functionalities of the website. These are required to ensure proper behaviour when using the website and can not be disabled.'` |
| `essentialPurpose?` | `string` | The adjective to use in `options.texts.mainContent` before the word "cookies". This is required if `options.texts.mainContent` is not set, otherwise it will not be used at all. **`Default`** `'essential'` |
| `linkText?` | `string` | The word(s) that should link to the privacy policy. Will replace {Link} in `texts.mainContent`. **`Default`** `'privacy policy'` |
| `mainContent?` | `string` | The text viewed in the first layer of the cookie banner. If not set, it will automatically insert the categories defined in `categories` in the text. Write {Link} (with brackets) in place of the word that you want to link to the privacy policy, and the word itself in `texts.linkText`. If no occurence of { Link } is found, the word and link will be appended at the end. To comply with the GDPR, this text must contain the purposes(categories) of the cookies used, a link to an information page(privacy policy) and information that the user can withdraw their consent at any time and how they can do that. **`Default`** `'This website uses cookies for [purpose categories] purposes. Read more in our {Link}. You can manage your choices at any time by clicking the cookie button.'` |
| `moreOptions?` | `string` | The text on the button that takes the user to the second layer of the cookie banner. **`Default`** `'More options'` |
| `reject?` | `string` | The text on the button that rejects all non - essential cookies. **`Default`** `'Reject non-essential cookies'` |

#### Defined in

[options.ts:30](https://github.com/arvidsandin/cookie-banner/blob/e5447aa/packages/stencil-library/src/utils/options.ts#L30)

___

### useCookieButton

• `Optional` **useCookieButton**: `boolean`

Whether to include a floating button to change consent in the future. If set to `false`, another action that calls the `cookie-banner.showBanner()` method has to be offered on to the user, such as through a link in the footer of the website.

**`Default`**

`true`

#### Defined in

[options.ts:29](https://github.com/arvidsandin/cookie-banner/blob/e5447aa/packages/stencil-library/src/utils/options.ts#L29)
