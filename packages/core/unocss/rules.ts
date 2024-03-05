import type { Rule } from 'unocss';

interface Theme {
  colors: Record<string, string>;
  bg: Record<string, string>;
}

export const themeRules: Rule<Theme>[] = [
  [
    /^text-(.*)$/,
    ([, c], { theme }) => {
      if (theme.colors[c]) return { color: theme.colors[c] };
    },
  ],
  [
    /^bg-(.*)$/,
    ([, c], { theme }) => {
      if (theme.bg[c]) return { color: theme.bg[c] };
    },
  ],
];

export const rules: Rule<Theme>[] = [
  [
    /^bgc-(.+)$/,
    ([, color], { theme }) => {
      if (theme.colors[color]) {
        return { 'background-color': theme.colors[color] };
      }
      return { 'background-color': color };
    },
  ],
];
