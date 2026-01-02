import BottomBar from './_components/BottomBar';
import SessionDetailView from './_components/SessionDetailView';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const sessionId = Number((await params).id);

  return (
    <>
      <main className="h-main laptop:bg-gray-900 bg-gray-800">
        <SessionDetailView sessionId={sessionId} />
      </main>
      <BottomBar sessionId={sessionId} />
    </>
  );
}
