import { Suspense } from 'react';
import Spinner from '@/components/ui/Spinner';
import SigninClient from './SigninClient';

export default function SigninPage() {
  return (
    <Suspense
      fallback={
        <div className="h-main flex items-center justify-center">
          <Spinner className="text-brand-500 size-8" />
        </div>
      }
    >
      <SigninClient />
    </Suspense>
  );
}
