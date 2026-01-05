import { DaumPostcodeProvider } from '@/provider/DaumPostcodeProvider';
import { KakaoMapProvider } from '@/provider/KakaoMapProvider';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <KakaoMapProvider>
      <DaumPostcodeProvider>{children}</DaumPostcodeProvider>
    </KakaoMapProvider>
  );
}
