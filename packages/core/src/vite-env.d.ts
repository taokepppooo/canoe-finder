/// <reference types="vite/client" />

interface ImportMeta {
  glob: (
    pattern: string,
    options?: { eager?: boolean; import?: 'default' | 'namespace' | 'all' },
  ) => Record<string, any>;
}
