import type { Preview } from '@storybook/nextjs-vite';
import '@app/globals.css';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';

// Initialize MSW
initialize();

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className="antialiased">
        <Story />
      </div>
    ),
  ],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        default: { name: 'default', value: 'var(--color-gray-900)' },
        light: { name: 'light', value: 'var(--color-gray-50)' },
      },
    },
    viewport: {
      options: { ...MINIMAL_VIEWPORTS, ...INITIAL_VIEWPORTS },
    },
  },

  initialGlobals: {
    backgrounds: { value: 'default' },
    viewport: { value: 'desktop', isRotated: false },
  },

  loaders: [mswLoader],
};

export default preview;
