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
await customElements.whenDefined('ask-mananger');
document.querySelector('ask-manager').setOptions(options)
```

Here is a minimal example of how the options object can look:

```js
const options = {
   categories: [
      {
         key: 'analytics',
         name: 'Analytical Cookies',
         description: 'Allows analytic to be used to improve the usability of the website in the future',
         purpose: 'analytical',
         },
   ],
   cookiePolicyLastUpdated: '2023-09-13',
   linkToPrivacyPolicy: 'https://example.com',
}
```

Check out the [Options](docs/interfaces/options.Options.md) and [Category](docs/interfaces/category.Category.md) objects to view the details of these properties and other optional ones.

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
