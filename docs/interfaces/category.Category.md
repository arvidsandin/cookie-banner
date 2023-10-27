[ask-manager](../README.md) / [category](../modules/category.md) / Category

# Interface: Category

[category](../modules/category.md).Category

## Table of contents

### Properties

- [description](category.Category.md#description)
- [key](category.Category.md#key)
- [name](category.Category.md#name)
- [purpose](category.Category.md#purpose)

## Properties

### description

• **description**: `string`

The descriptions diplayed in the second layer of the cookie banner.

#### Defined in

[category.ts:18](https://github.com/arvidsandin/ask-manager/blob/315be4e/src/utils/category.ts#L18)

___

### key

• **key**: `string`

The key used for the category when storing the consent and check the status of the consent.

Example: `'analytics'`

#### Defined in

[category.ts:7](https://github.com/arvidsandin/ask-manager/blob/315be4e/src/utils/category.ts#L7)

___

### name

• **name**: `string`

The name of the category displayed in the second layer of the cookie banner.

Example: `'Analytical cookies'`

#### Defined in

[category.ts:24](https://github.com/arvidsandin/ask-manager/blob/315be4e/src/utils/category.ts#L24)

___

### purpose

• `Optional` **purpose**: `string`

The adjective to use in `options.texts.mainContent` before the word "purposes".
This is **required** if `options.texts.mainContent` is not set, otherwise it will not be used at all.

Example: `'analytical'`

#### Defined in

[category.ts:14](https://github.com/arvidsandin/ask-manager/blob/315be4e/src/utils/category.ts#L14)
