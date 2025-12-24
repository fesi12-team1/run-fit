import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { faker } from '@/mocks/data';
import { Profile } from '@/types/user';
import { HeaderView } from '.';

/**
 *
 * 로고, 네비게이션, 사용자 아바타를 표시하는 애플리케이션 헤더 컴포넌트입니다.
 */

const meta: Meta<typeof HeaderView> = {
  title: 'layout/Header',
  component: HeaderView,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const [client] = useState(
        () =>
          new QueryClient({
            defaultOptions: {
              queries: {
                retry: false,
                refetchOnWindowFocus: false,
              },
            },
          })
      );

      return (
        <QueryClientProvider client={client}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
};
export default meta;

type Story = StoryObj<typeof HeaderView>;

const mockUser = {
  city: '전북',
  createdAt: '2025-09-27T11:03:16.030Z',
  email: 'admin2@example.com',
  id: 2,
  image: faker.image.avatar(),
  introduction: '안녕하세요!',
  name: '관리자2',
  pace: 367,
  styles: ['조깅', '인터벌'],
  updatedAt: '2025-12-19T09:05:36.463Z',
} as Profile;

export const LoggedInSessions: Story = {
  args: {
    pathname: '/sessions',
    user: mockUser,
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    pathname: '/sessions',
    user: null,
    isLoading: true,
  },
};

export const GuestSessions: Story = {
  args: {
    pathname: '/sessions',
    user: null,
    isLoading: false,
  },
};

export const LoggedInCrews: Story = {
  args: {
    pathname: '/crews/123',
    user: mockUser,
    isLoading: false,
  },
};

export const LoggedInLikes: Story = {
  args: {
    pathname: '/sessions/likes',
    user: mockUser,
    isLoading: false,
  },
};
