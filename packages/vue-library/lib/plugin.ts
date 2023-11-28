import { Plugin } from 'vue';
import { applyPolyfills, defineCustomElements } from '@cookie-banner/stencil/loader';

export const ComponentLibrary: Plugin = {
  async install() {
    applyPolyfills().then(() => {
      defineCustomElements();
    });
  },
};
