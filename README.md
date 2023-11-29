# cookie-banner

## About The Project

`cookie-banner` is an easy way to comply with the GDPR regarding cookie consent. Rather than trying to deceive users into thinking that they have to press "Accept all cookies" and consequently [getting a fine](https://web.archive.org/web/20220422103838/https://www.theverge.com/2022/4/21/23035289/google-reject-all-cookie-button-eu-privacy-data-laws), `cookie-banner` is primary built to follow EU laws regarding consent. It minimizes resources put on ensuring GDPR compliance and can easily be put in any project, either with minimal setup or deeper configuration according to need.


### Built With

* [Stencil](https://stenciljs.com/)

## Getting started

`cookie-banner` is available for React, Vue, Angular, and as an independent Web Component. For instructions, view the readme of the relevant directory:

* [Angular](packages/angular-workspace/README.md)
* [React](packages/react-library/README.md)
* [Vue](packages/vue-library/README.md)
* [Web Component](packages/stencil-library/README.md)


## Development

Since `cookie-banner`is build with Stencil, only the files in packages/stencil-library should be manually modified. To get a local copy up and running follow these steps.

### Prerequisites

* Node 18
* npm

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/arvidsandin/cookie-banner.git && cd cookie-banner
   ```
2. Install npm packages
   ```sh
   npm install
   ```
4. Start local development server
   ```sh
   cd packages/stencil-library
   npm start
   ```

When creating the framework integrations, run `npm build` once in `packages/stencil-library` and then once in `packages/angular-workspace`, `packages/react-library` or `packages/vue-library` depending on which framework to build for.


## License

Distributed under the MIT License. See `LICENSE.txt` for more information.


## Acknowledgments

* Thanks to [Jens Hunt](https://github.com/R0tenur) for supervising this project
