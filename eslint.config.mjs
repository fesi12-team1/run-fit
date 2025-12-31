import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import storybook from 'eslint-plugin-storybook';
import { defineConfig, globalIgnores } from 'eslint/config';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  ...storybook.configs['flat/recommended'],
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    '!.storybook',
  ]),
  {
    files: ['src/components/**/*.{tsx,jsx}'],
    plugins: {
      react,
      import: importPlugin,
    },
    rules: {
      'import/prefer-default-export': 'warn',
      'react/jsx-pascal-case': 'error',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'function-declaration',
          unnamedComponents: 'function-expression',
        },
      ],
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          shorthandFirst: false,
          reservedFirst: true,
        },
      ],
    },
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    ignores: ['src/components/**/*'],
    plugins: {
      react,
      import: importPlugin,
    },
    rules: {
      'import/prefer-default-export': 'off',
      'react/function-component-definition': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/member-ordering': [
        'warn',
        {
          default: ['signature', 'field', 'method'],
        },
      ],
    },
  },
]);

export default eslintConfig;
