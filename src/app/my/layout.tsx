import MyLayoutClient from './MyLayoutClient';

export const dynamic = 'force-dynamic';

export default function MyLayout({ children }: { children: React.ReactNode }) {
  return <MyLayoutClient>{children}</MyLayoutClient>;
}
