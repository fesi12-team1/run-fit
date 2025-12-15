import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { errorResponse, successResponse } from '@/mocks/utils';
import Header from '.';

/**
 *
 * 로고, 네비게이션, 사용자 아바타를 표시하는 애플리케이션 헤더 컴포넌트입니다.
 */

const meta: Meta<typeof Header> = {
  title: 'layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false },
    },
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Header>;

export const LoggedIn: Story = {
  decorators: [
    (Story) => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      });

      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
  parameters: {
    msw: {
      handlers: [
        http.get('/api/user', () => {
          return HttpResponse.json(
            successResponse({
              id: 1,
              email: 'user@example.com',
              name: '러너',
              image: 'https://i.pravatar.cc/150?img=1',
              introduction: '안녕하세요, 러너입니다!',
              city: '서울',
              page: '06:00',
              style: ['빠른 편'],
            })
          );
        }),
      ],
    },
  },
};

export const LoggedOut: Story = {
  decorators: [
    (Story) => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      });

      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
  parameters: {
    msw: {
      handlers: [
        http.get('/api/user', () => {
          return HttpResponse.json(
            errorResponse({
              code: 'UNAUTHORIZED',
              message: '인증되지 않은 사용자입니다.',
            }),
            { status: 401 }
          );
        }),
      ],
    },
  },
};

export const Loading: Story = {
  decorators: [
    (Story) => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      });

      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
  parameters: {
    msw: {
      handlers: [
        http.get('/api/user', async () => {
          await new Promise(() => {});
        }),
      ],
    },
  },
};
