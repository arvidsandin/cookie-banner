import { createStore } from '@stencil/store';
import { Options } from '../utils/options';

const initialOptions: Options = {
  cookiePolicyLastUpdated: null,
  linkToPrivacyPolicy: 'https://github.com/arvidsandin/cookie-banner#readme',
  texts: {
    mainContent: `Options have not been set - this cookie banner is non-functional. View the documentation for required options`,
    linkText: 'documentation',
  },
};

const { state, onChange } = createStore({
  cookieConsent: {
    lastAccepted: null,
    acceptedCategories: [],
  },
  options: initialOptions,
});

onChange('options', value => {
  state.cookieConsent = JSON.parse(localStorage.getItem(value.storageName)) || {
    lastAccepted: null,
    acceptedCategories: [],
  };
});

onChange('cookieConsent', value => {
  localStorage.setItem(state.options.storageName, JSON.stringify(value));
});

export default state;
