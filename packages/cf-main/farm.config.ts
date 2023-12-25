import { defineConfig } from '@farmfe/core';

export default defineConfig({
  compilation: {
    input: {
      index: './index.html'
    },
    output: {
      path: 'build',
      publicPath: '/',
      targetEnv: 'browser'
    }
  },
  plugins: ['@farmfe/plugin-react']
});
