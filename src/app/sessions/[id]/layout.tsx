import { KakaoMapProvider } from '@/provider/KakaoMapProvider';

export default function SessionDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <KakaoMapProvider>{children}</KakaoMapProvider>;
}
