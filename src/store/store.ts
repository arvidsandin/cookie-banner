import { createStore } from '@stencil/store';

const { state, onChange } = createStore({
  cookieConsent: {
    lastAccepted: null,
    acceptedCategories: [],
  },
  storageName: null,
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
