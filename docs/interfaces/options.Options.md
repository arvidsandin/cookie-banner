[ask-manager](../README.md) / [options](../modules/options.md) / Options

# Interface: Options

[options](../modules/options.md).Options

## Table of contents

### Properties

- [categories](options.Options.md#categories)
- [cookiePolicyLastUpdated](options.Options.md#cookiepolicylastupdated)
- [linkToPrivacyPolicy](options.Options.md#linktoprivacypolicy)
- [storageName](options.Options.md#storagename)
- [texts](options.Options.md#texts)

## Properties

### categories

• `Optional` **categories**: [`Category`](category.Category.md)[]

the categories of cookies to ask for consent for

#### Defined in

[options.ts:20](https://github.com/arvidsandin/ask-manager/blob/3883aa0/src/utils/options.ts#L20)

___

### cookiePolicyLastUpdated

• **cookiePolicyLastUpdated**: `string`

last time the privacy policy or which cookies that are used by the website was updated
used to know if updated consent is needed
can be any string that can be read by Date()

#### Defined in

[options.ts:8](https://github.com/arvidsandin/ask-manager/blob/3883aa0/src/utils/options.ts#L8)

___

### linkToPrivacyPolicy

• **linkToPrivacyPolicy**: `string`

relative or absolute link to privacy policy

#### Defined in

[options.ts:16](https://github.com/arvidsandin/ask-manager/blob/3883aa0/src/utils/options.ts#L16)

___

### storageName

• `Optional` **storageName**: `string`

name to use for the key in localStorage

#### Defined in

[options.ts:12](https://github.com/arvidsandin/ask-manager/blob/3883aa0/src/utils/options.ts#L12)

___

### texts

• `Optional` **texts**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `accept?` | `string` | Text on the "Accept all" button |
| `back?` | `string` | text on the "Back" button |
| `confirm?` | `string` | text on the "Confirm selection" button |
| `linkText?` | `string` | the word(s) to replace {Link} with |
| `mainContent?` | `string` | text to show in the primary view of the banner write {Link} instead of the word that should link to the privacy policy |
| `moreOptions?` | `string` | text on the "More options" button |
| `reject?` | `string` | text on the "Reject all" button |

#### Defined in

[options.ts:21](https://github.com/arvidsandin/ask-manager/blob/3883aa0/src/utils/options.ts#L21)
