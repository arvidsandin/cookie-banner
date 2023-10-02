import { createStore } from '@stencil/store';
import { Options } from '../utils/options';

const initialOptions: Options = {
  cookiePolicyLastUpdated: new Date().toISOString(),
  storageName: null,
  linkToPrivacyPolicy: 'https://github.com/arvidsandin/ask-manager#readme',
  texts: {
    mainTextContent: `Options have not been set - this cookie banner is non-functional. View the documentation for required options`,
    linkText: 'documentation',
    acceptText: null,
    rejectText: null,
    moreOptionsText: null,
    backText: null,
    confirmText: null,
  },
  categories: [],
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
