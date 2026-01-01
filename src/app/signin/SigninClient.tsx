'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import SigninForm from '@/components/auth/SigninForm';
import AuthLayout from '@/components/layout/AuthLayout';

export default function SigninClient() {
  const searchParams = useSearchParams();
  const reason = searchParams.get('reason');

  useEffect(() => {
    if (reason === 'auth') {
      toast.info('로그인이 필요한 페이지예요', {
        id: 'auth-required',
      });
    }
  }, [reason]);

  return (
    <AuthLayout
      title="로그인"
      form={<SigninForm />}
      footerText="계정이 없으신가요?"
      footerLinkText="회원가입"
      footerLinkHref="/signup"
    />
  );
}
