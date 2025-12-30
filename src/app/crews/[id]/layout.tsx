import { DaumPostcodeProvider } from '@/provider/DaumPostcodeProvider';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DaumPostcodeProvider>{children}</DaumPostcodeProvider>;
}
