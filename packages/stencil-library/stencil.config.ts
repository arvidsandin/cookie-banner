import { Config } from '@stencil/core';
import { vueOutputTarget } from '@stencil/vue-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';
import { angularOutputTarget } from '@stencil/angular-output-target';

export const config: Config = {
  namespace: 'cookie-banner',
  outputTargets: [
    {
      type: 'dist',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
      dir: 'docs',
      strict: true,
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    vueOutputTarget({
      componentCorePackage: '@cookie-banner/stencil',
      proxiesFile: '../vue-library/lib/components.ts',
    }),
    reactOutputTarget({
      componentCorePackage: '@cookie-banner/stencil',
      proxiesFile: '../react-library/lib/components/stencil-generated/index.ts',
    }),
    angularOutputTarget({
      componentCorePackage: '@cookie-banner/stencil',
      outputType: 'component',
      directivesProxyFile: '../angular-workspace/projects/component-library/src/lib/stencil-generated/components.ts',
      directivesArrayFile: '../angular-workspace/projects/component-library/src/lib/stencil-generated/index.ts',
    }),
  ],
  testing: {
    browserHeadless: 'new',
  },
  extras: {
    enableImportInjection: true,
  },
};
