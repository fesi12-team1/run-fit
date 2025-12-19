import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/sessions');
  return (
    <main className="h-main flex items-center justify-center">
      <p className="text-title1-semibold bg-brand-500 tablet:bg-brand-600 laptop:bg-brand-700 desktop:bg-gray-200 p-5">
        Hello, world!
      </p>
    </main>
  );
}
