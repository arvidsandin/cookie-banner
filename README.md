# Ask Manager

## About The Project

Ask Manager is an easy way to comply with the GDPR regarding cookie consent. Rather than trying to deceive users into thinking that they have to press "Accept all cookies" and consequently [getting a fine](https://web.archive.org/web/20220422103838/https://www.theverge.com/2022/4/21/23035289/google-reject-all-cookie-button-eu-privacy-data-laws), Ask Manager is primary built to follow EU laws regarding consent. It minimizes resources put on ensuring GDPR compliance and can easily be put in any project, either with minimal setup or deeper configuration according to need.


### Built With

* [Stencil](https://stenciljs.com/)

## Getting started

### Installation

TODO

### Usage
After adding the `<ask-manager></ask-manager>` component, a setup is required. This can be done by running a function after the component is defined:
```js
customElements.whenDefined('ask-manager').then(() => {
   document.querySelector('ask-manager').setOptions(options)
})
```
Here is a minimal example of how the options object can look:
```js
const options = {
   categories: [
      {
         key: 'analytics',
         name: 'Analytical Cookies',
         description: 'Allows analytic to be used to improve the usability of the website in the future',
         adjective: 'analytical',
         },
   ],
   cookiePolicyLastUpdated: '2023-09-13',
   linkToPrivacyPolicy: 'https://example.com',
}
```

### The options object
Here is a list of all the properties in the options object:
| Name                        | Type         | Required  | Default value            | Description  |
|-----------------------------|--------------|-----------|--------------------------|--------------|
| `cookiePolicyLastUpdated`   | `string`     | yes       | n/a                      | A date of the last time the cookie policy was updated. If the user consented earlier than this date, new consent will be required. Can be any string parsable by the Date() function in Javascript. |
| `linkToPrivacyPolicy`       | `string`     | yes       | n/a                      | A relative or absolute link to the privacy policy. |
| `categories`                | `Category[]` | no        | `[]`                       | The categories of non-essential cookies used on the website. See below for details about the Category type. Doesn't really make sense to leave empty as the GDPR does not require the same level of consent if only essential cookies are used |
| `storageName`               | `string`     | no        | `'cookie-consent'`       | The key to use for storing the consent in localStorage. |
| `texts.mainContent`         | `string`     | no        | `'This website uses cookies for [purpose categories] purposes. Read more in our {Link}. You can manage your choices at any time.'` | The text viewed in the first layer of the cookie banner. If not set, it will automatically insert the categories defined in `categories` in the text. Write {Link} (with brackets) in place of the word that you want to link to the privacy policy, and the word itself in `texts.linkText`. If no occurence of {Link} is found, the word and link will be appended at the end. To comply with the GDPR, this text must contain the purposes (categories) of the cookies used, a link to an information page (privacy policy) and information that the user can withdraw their consent at any time. |
| `texts.linkText`            | `string`     | no        | `'privacy policy'`       | The word(s) that should link to the privacy policy. Will replace {Link} in `texts.mainContent` |
| `texts.accept`              | `string`     | no        | `'Accept all'`           | The text on the button that accepts all cookies. **Do not** write something ambiguous like "Okay" or "I understand" (understanding is not the same as consenting), as the consent is not valid according to the GDPR if the user has not unambiguously given it. |
| `texts.reject`              | `string`     | no        | `'Reject non-essential'` | The text on the button that rejects all non-essential cookies. |
| `texts.moreOptions`         | `string`     | no        | `'More options'`         | The text on the button that takes the user to the second layer of the cookie banner. |
| `texts.back`                | `string`     | no        | `'Back'`                 | The text on the button that takes the user back to the first layer from the second layer of the cookie banner. |
| `texts.confirm`             | `string`     | no        | `'Confirm selection'`    | The text on the button that confirms the user's selected options. |

The Category object looks as follows:
| Name            | Type   | Required  | Default value   | Description  |
|-----------------|--------|-----------|-----------------|--------------|
| `key`           | string | yes       | n/a             | The key used for the category when storing the consent and check the status of the consent. Example: `analytics` |
| `name`          | string | yes       | n/a             | The name of the category displayed in the second layer of the cookie banner. Example: `Analytical cookies` |
| `description`   | string | yes       | n/a             | The desriptions diplayed in the second layer of the cookie banner |
| `adjective`     | string | no*       | n/a             | The adjective to use in `options.texts.mainContent` before the word "purposes" Example: `analytical` *this is required if `options.texts.mainContent` is not set, otherwise it will not be used at all. |

## Development

To get a local copy up and running follow these steps.

### Prerequisites

* Node 18
* npm

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/arvidsandin/ask-manager.git && cd ask-manager
   ```
1. Install npm packages
   ```sh
   npm install
   ```
3. Start local development server
   ```sh
   npm start
   ```


## License

Distributed under the MIT License. See `LICENSE.txt` for more information.


## Acknowledgments

* Thanks to [Jens Hunt](https://github.com/R0tenur) for supervising this project
