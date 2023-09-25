import { createStore } from '@stencil/store';

const { state, onChange } = createStore({
  cookieConsent: {
    lastAccepted: null,
    acceptedCategories: [],
  },
  storageName: null,
  linkToPrivacyPolicy: 'https://github.com/arvidsandin/ask-manager#readme',
  texts: {
    mainTextContent: `Options have not been set - this cookie banner is non-functional. View the {Link} for required options`,
    linkText: 'documentation',
    acceptText: null,
    rejectText: null,
    moreOptionsText: null,
    backText: null,
    confirmText: null,
  },
});

onChange('storageName', value => {
  state.cookieConsent = JSON.parse(localStorage.getItem(value)) || {
    lastAccepted: null,
    acceptedCategories: [],
  };
});

onChange('cookieConsent', value => {
  localStorage.setItem(state.storageName, JSON.stringify(value));
});

export default state;
