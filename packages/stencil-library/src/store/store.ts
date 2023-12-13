import { createStore } from '@stencil/store';
import { Options } from '../utils/options';

const initialOptions: Options = {
  cookiePolicyLastUpdated: null,
  linkToPrivacyPolicy: 'https://github.com/arvidsandin/cookie-banner#readme',
  texts: {
    mainContent: `Options have not been set - this cookie banner is non-functional. View the documentation for required options`,
    linkText: 'documentation',
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

  if (monthDiff(new Date(state.cookieConsent.lastAccepted), new Date()) > state.options.monthsOfValidity) {
    //Overwrite outdated consent
    state.cookieConsent = {
      lastAccepted: null,
      acceptedCategories: [],
    };
  }
});

onChange('cookieConsent', value => {
  localStorage.setItem(state.options.storageName, JSON.stringify(value));
});

//From https://stackoverflow.com/posts/2536445/timeline
function monthDiff(d1: Date, d2: Date) {
  let months: number;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}

export default state;
