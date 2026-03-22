import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  documents: 'apps/client/src/**/*.graphql',
  generates: {
    './apps/client/src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-rtk-query'],
      config: {
        fetcher: 'fetch',
      },
    },
  },
};

export default config;
