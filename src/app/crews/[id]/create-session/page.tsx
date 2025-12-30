import BackButton from './_components/BackButton';
import SessionCreateForm from './_components/SessionCreateForm';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="h-main laptop:my-[50px] laptop:py-0 laptop:px-8 mx-auto flex max-w-[1120px] flex-col items-center p-6">
      <div className="mb-6 flex w-full items-center gap-2">
        <BackButton />
        <h1 className="text-body1-semibold laptop:text-title2-semibold">
          세션 생성하기
        </h1>
      </div>
      <SessionCreateForm crewId={Number(id)} />
    </main>
  );
}
