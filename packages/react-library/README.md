# React Cookie banner

`cookie-banner` is an easy way to comply with the GDPR regarding cookie consent. Rather than trying to deceive users into thinking that they have to press "Accept all cookies" and consequently [getting a fine](https://web.archive.org/web/20220422103838/https://www.theverge.com/2022/4/21/23035289/google-reject-all-cookie-button-eu-privacy-data-laws), `cookie-banner` is primary built to follow EU laws regarding consent. It minimizes resources put on ensuring GDPR compliance and can easily be put in any project, either with minimal setup or deeper configuration according to need.

Some common points of non-compliance for cookie banners include:
* Making it harder to withdraw consent than to give it
* Covering all content until a choice is made
* Nudging towards a certain option or away from another
* Making it harder to reject cookies than to accept them

`cookie-banner` is a React Component cookie banner, built to comply with the GDPR and avoid these mistakes. View the [Github repo](https://github.com/arvidsandin/cookie-banner) to see other frameworks available.

## Getting started

### Installation

```sh
npm install @cookie-banner/react
```
or, if you're using yarn:
```sh
yarn add @cookie-banner/react
```

Import the component where you want to use it
```js
//App.tsx
import { CookieBanner, defineCustomElements } from 'react-library';

defineCustomElements();

function App() {
  return (
    <div className="App">
      <CookieBanner first="Your" last="Name" />
    </div>
  );
}
```

### Usage

After adding the component, a setup is required. This can be done by running a function after the component is defined:

```js
function App() {
    customElements.whenDefined('cookie-banner').then(() => {
        const cookieBanner = document.querySelector('cookie-banner')!;
        cookieBanner.setOptions(options)
    })
    
  return (
    <div className="App">
      <CookieBanner first="Your" last="Name" />
    </div>
  );
}
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

Check out the [Options](../stencil-library/docs/interfaces/options.Options.md) and [Category](../stencil-library/docs/interfaces/category.Category.md) objects to view the details of these properties and other optional ones.

Check out the [`cookie-banner` documentation](../stencil-library/docs/components/cookie-banner/readme.md) to view available methods and events.

### Example usage
```js

function App() {
    customElements.whenDefined('cookie-banner').then(async () => {
        const cookieBanner = document.querySelector('cookie-banner')!;
        const options = {/*...*/};
        cookieBanner.setOptions(options);
    })

    //manually check
    const acceptedCategories = await cookieBanner.getCategoriesWithConsent();
    if (category.includes('analytical')){
        //run analytics
    }

    //listen to event
    cookieBanner.addEventListener('consentUpdated', e => {
        for (const category of e.detail){
            //update data collection
        }
    })
    
  return (
    <div className="App">
      <CookieBanner/>
    </div>
  );
}
´´´