'use client';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import Dropdown from '.';

const meta: Meta<typeof Dropdown> = {
  title: 'UI/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'lg'],
      description: '드롭다운 트리거 크기',
    },
    hasSelected: {
      control: false,
    },
    children: {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <div className="flex w-[400px] items-center justify-center rounded-xl p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FilterDropdown: Story = {
  args: {
    size: 'lg',
    hasSelected: false,
  },
  render: (args) => {
    const [selectedItem, setSelectedItem] = React.useState('난이도');

    const items = ['전체', '초급', '중급', '고급'];

    return (
      <Dropdown size={args.size} hasSelected={selectedItem !== '난이도'}>
        <Dropdown.Trigger>{selectedItem}</Dropdown.Trigger>

        <Dropdown.Content sideOffset={8}>
          {items.map((item) => (
            <Dropdown.Item
              key={item}
              selected={selectedItem === item}
              onSelect={() => {
                setSelectedItem(item === '전체' ? '난이도' : item);
              }}
            >
              {item}
            </Dropdown.Item>
          ))}
        </Dropdown.Content>
      </Dropdown>
    );
  },
};

export const SortDropdown: Story = {
  args: {
    size: 'lg',
  },
  render: (args) => {
    const [selectedItem, setSelectedItem] = React.useState('최신순');

    const items = ['최신순', '조회순', '인기순'];

    return (
      <Dropdown size={args.size}>
        <Dropdown.Trigger className="bg-transparent">
          {selectedItem}
        </Dropdown.Trigger>

        <Dropdown.Content>
          {items.map((item) => (
            <Dropdown.Item
              key={item}
              selected={selectedItem === item}
              onSelect={() => {
                setSelectedItem(item);
              }}
            >
              {item}
            </Dropdown.Item>
          ))}
        </Dropdown.Content>
      </Dropdown>
    );
  },
};
