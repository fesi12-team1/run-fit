import { Suspense } from 'react';
import Spinner from '@/components/ui/Spinner';
import SigninClient from './SigninClient';

export default function SigninPage() {
  return (
    <Suspense fallback={<Spinner.Page />}>
      <SigninClient />
    </Suspense>
  );
}
