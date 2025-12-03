import type { Preview } from '@storybook/nextjs-vite';
import '@app/globals.css';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';

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
        default: { name: 'default', value: '#0F1014' },
        light: { name: 'light', value: '#FFFFFF' },
        dark: { name: 'dark', value: '#000000' },
      },
    },
    viewport: {
      options: { ...MINIMAL_VIEWPORTS, ...INITIAL_VIEWPORTS },
    },
  },

  initialGlobals: {
    backgrounds: { value: 'default' },
    viewport: { value: 'mobile1', isRotated: false },
  },
};

export default preview;
