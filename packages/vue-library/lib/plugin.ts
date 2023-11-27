import { Plugin } from 'vue';
import { applyPolyfills, defineCustomElements } from 'cookie-banner/loader';

export const ComponentLibrary: Plugin = {
  async install() {
    applyPolyfills().then(() => {
      defineCustomElements();
    });
  },
};
