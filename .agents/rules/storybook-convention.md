# Storybook Convention

## File Structure

```
src/components/{domain}/{ComponentName}/{ComponentName}.stories.tsx
```

Stories live alongside components. One story file per component.

## Basic Template

```tsx
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ComponentName from '.';

/**
 * 컴포넌트에 대한 간단한 설명 (한글)
 */
const meta: Meta<typeof ComponentName> = {
  title: 'Category/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered', // or 'fullscreen'
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // default props
  },
};
```

## Title Categories

| Category | Usage | Example |
| --- | --- | --- |
| `UI/` | Atomic UI components | `UI/Button`, `UI/Input` |
| `layout/` | Layout components | `layout/Header` |
| `Filters/` | Filter components | `Filters/SessionDateFilter` |

## Story Patterns

### Simple Props (args)

```tsx
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
  },
};
```

### With Render Function

For interactive examples or multiple elements:

```tsx
export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="default">Default</Button>
      <Button variant="outlined">Outlined</Button>
    </div>
  ),
};
```

### With Args + Render

Combine args controls with custom render:

```tsx
export const Sizes: Story = {
  args: {
    children: 'Button',
  },
  render: (args) => (
    <div className="flex gap-4">
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="default">Default</Button>
    </div>
  ),
};
```

### Stateful Stories

Use `useState` for interactive components:

```tsx
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return <Input value={value} onChange={(e) => setValue(e.target.value)} />;
  },
};
```

## Compound Components

Show sub-component usage:

```tsx
export const WithContents: Story = {
  render: () => (
    <Tabs defaultValue="1">
      <Tabs.List>
        <Tabs.Trigger value="1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="2">Tab 2</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="1">Content 1</Tabs.Content>
      <Tabs.Content value="2">Content 2</Tabs.Content>
    </Tabs>
  ),
};
```

## ArgTypes Configuration

```tsx
argTypes: {
  variant: {
    control: { type: 'select' },
    options: ['default', 'outlined', 'neutral'],
  },
  size: {
    control: 'radio',
    options: ['sm', 'lg'],
    description: '버튼 크기',
  },
  disabled: {
    control: { type: 'boolean' },
  },
  children: {
    control: false, // disable control
  },
},
```

## Decorators

### Simple Wrapper

```tsx
decorators: [
  (Story) => (
    <div className="flex items-center justify-center p-8">
      <Story />
    </div>
  ),
],
```

### With Context Providers

```tsx
decorators: [
  (Story) => {
    const [client] = useState(
      () => new QueryClient({
        defaultOptions: { queries: { retry: false } },
      })
    );
    return (
      <QueryClientProvider client={client}>
        <Story />
      </QueryClientProvider>
    );
  },
],
```

## Parameters

```tsx
parameters: {
  layout: 'centered',        // 'centered' | 'fullscreen' | 'padded'
  docs: {
    story: {
      inline: false,         // render in iframe
      iframeHeight: 500,
    },
  },
  nextjs: {
    appDirectory: true,      // for Next.js components
  },
},
```

## Mock Data

Use faker from mocks or inline objects:

```tsx
import { faker } from '@/mocks/data';

const mockUser = {
  id: 1,
  name: '테스트 유저',
  image: faker.image.avatar(),
} as Profile;

export const LoggedIn: Story = {
  args: { user: mockUser },
};
```

## Story Naming

| Name | Usage |
| --- | --- |
| `Default` | Base component state |
| `Variants` | All variant options |
| `Sizes` | Size variations |
| `States` | Normal/Disabled/Error states |
| `WithIcon` | Icon variations |
| `Controlled` | useState controlled example |
| `Uncontrolled` | Internal state example |

## JSDoc Comments

Add Korean descriptions for autodocs:

```tsx
/**
 * 버튼은 사용자가 클릭하여 작업을 수행하는 클릭 가능한 요소입니다.
 */
const meta: Meta<typeof Button> = { ... };

/**
 * 기본 버튼 - 가장 일반적인 사용 사례
 */
export const Default: Story = { ... };
```

## Imports

```tsx
// Storybook types
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// React (if needed)
import { useState } from 'react';

// Component (relative import)
import ComponentName from '.';

// Other components (relative or alias)
import Button from '../Button';
import { faker } from '@/mocks/data';
```
