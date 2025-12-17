import { KakaoMapProvider } from '@/provider/KakaoMapProvider';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <KakaoMapProvider>{children}</KakaoMapProvider>;
}
