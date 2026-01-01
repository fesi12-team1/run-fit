'use client';

import { Eye, EyeOff } from 'lucide-react';
import type { Route } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useSigninForm } from '@/hooks/auth/useSigninForm';

const isValidRedirectPath = (path: string): boolean => {
  if (!path.startsWith('/')) return false;
  if (path.startsWith('//')) return false;
  if (path.match(/^[\w]+:/)) return false;
  return true;
};

export default function SigninForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawRedirect = searchParams.get('redirect');

  let redirect = '/';
  if (rawRedirect) {
    const decoded = decodeURIComponent(rawRedirect);
    redirect = isValidRedirectPath(decoded) ? decoded : '/';
  }

  const { form, submit, isPending } = useSigninForm({
    onSuccess: () => {
      toast.success('로그인 성공!');
      router.replace(redirect as Route);
    },
    onError: (message) => {
      toast.error(`로그인 실패: ${message}`);
    },
  });

  const {
    register,
    formState: { errors, isValid },
  } = form;

  const [show, setShow] = useState(false);

  return (
    <form className="flex flex-col gap-4" onSubmit={submit}>
      <Input
        label="이메일"
        {...register('email')}
        errorMessage={errors.email?.message}
      />
      <Input
        label="비밀번호"
        type={show ? 'text' : 'password'}
        {...register('password')}
        RightElement={
          <button type="button" onClick={() => setShow(!show)}>
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        }
        errorMessage={errors.password?.message}
      />
      <Button disabled={isPending || !isValid} type="submit">
        로그인
      </Button>
    </form>
  );
}
