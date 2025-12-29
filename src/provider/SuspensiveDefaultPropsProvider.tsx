'use client';

import { DefaultProps, DefaultPropsProvider } from '@suspensive/react';
import Spinner from '@/components/ui/Spinner';

const defaultProps = new DefaultProps({
  Suspense: {
    fallback: <Spinner />,
    clientOnly: false,
  },
});

export default function SuspensiveDefaultPropsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DefaultPropsProvider defaultProps={defaultProps}>
      {children}
    </DefaultPropsProvider>
  );
}
