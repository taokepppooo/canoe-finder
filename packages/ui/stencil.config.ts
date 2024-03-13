import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'cf-ui',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        { src: './examples', dest: 'examples' },
        { src: '../style/theme', dest: 'theme' },
      ]
    },
  ],
  testing: {
    browserHeadless: "new",
  },
};
