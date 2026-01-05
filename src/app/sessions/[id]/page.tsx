import { notFound } from 'next/navigation';
import BottomBar from './_components/BottomBar';
import SessionDetailContainer from './_components/SessionDetailContainer';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const sessionId = Number((await params).id);

  if (isNaN(sessionId)) {
    notFound();
  }

  return (
    <main className="h-main laptop:bg-gray-900 tablet:h-[calc(100vh-60px)] h-[calc(100vh-56px)] bg-gray-800">
      <SessionDetailContainer sessionId={sessionId} />
      <BottomBar sessionId={sessionId} />
    </main>
  );
}
