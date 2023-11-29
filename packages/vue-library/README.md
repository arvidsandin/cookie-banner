# Vue Cookie Banner
A Vue Component cookie banner, primarily built to comply with the GDPR. View the [Github repo](https://github.com/arvidsandin/cookie-banner) for more details.

## Getting started

### Installation

```sh
npm install @cookie-banner/vue
```
or, if you're using yarn:
```sh
yarn add @cookie-banner/vue
```


In your `vite.config.js` or `vite.config.ts` file, add the following:
```js
plugins: [
  vue({
    template: {
      compilerOptions: {
        // treat all tags with a dash as custom elements
        isCustomElement: (tag) => tag.includes('-'),
      },
    },
  }),
]
```
In your `main.js` or `main.ts` file, import the component library plugin and use it:

```js
import { ComponentLibrary } from '@cookie-banner/vue';

createApp(App).use(ComponentLibrary).mount('#app');
```

### Usage

Now you can add the `<cookie-banner></cookie-banner>` component to any Vue file you want.

After adding it, a setup is required. This can be done by running a function after the component is defined:

```js
await customElements.whenDefined('cookie-banner');
document.querySelector('cookie-banner').setOptions(options)!;
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
onMounted(async () => {
    await customElements.whenDefined('cookie-banner');
    const cookieBanner = document.querySelector('cookie-banner')!;
    const options = {/*...*/};
    cookieBanner.setOptions(options);

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
});
´´´