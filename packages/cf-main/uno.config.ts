import { defineConfig } from 'unocss';
import { shortcuts } from './unocss/shortcuts';
import { lightTheme } from './unocss/theme';

export default defineConfig({
  shortcuts,
  theme: {
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    lightTheme,
  },
});
