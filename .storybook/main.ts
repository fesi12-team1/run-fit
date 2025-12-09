import type { StorybookConfig } from '@storybook/nextjs-vite';
import svgr from 'vite-plugin-svgr';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: '@storybook/nextjs-vite',
  staticDirs: ['../public'],
  viteFinal: (config) => {
    config?.plugins?.push(
      svgr({
        include: '**/*.svg?react',
      })
    );
    return config;
  },
};
export default config;
