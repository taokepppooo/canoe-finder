import { defineConfig } from 'unocss';
import { shortcuts } from './unocss/shortcuts';
import { breakpoints, lightTheme } from './unocss/theme';
import { themeRules, rules } from './unocss/rules';
import type { ConfigBase } from 'unocss';

const config: ConfigBase = {
  shortcuts,
  rules: [...themeRules, ...rules],
  theme: {
    breakpoints,
    lightTheme,
  },
};

export default defineConfig(config);
