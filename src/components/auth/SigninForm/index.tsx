'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useSigninForm } from '@/hooks/auth/useSigninForm';

export default function SigninForm() {
  const { form, submit, isPending } = useSigninForm();
  const {
    register,
    formState: { errors, isValid },
  } = form;

  const [show, setShow] = useState(false);

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <Input
        label="이메일"
        {...register('email')}
        errorMessage={errors.email?.message}
      />
      <Input
        label="비밀번호"
        type={show ? 'text' : 'password'}
        {...register('password')}
        errorMessage={errors.password?.message}
        RightElement={
          <button type="button" onClick={() => setShow(!show)}>
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        }
      />
      {errors.root && (
        <p className="text-sm text-red-500">{errors.root.message}</p>
      )}
      <Button type="submit" disabled={isPending || !isValid}>
        로그인
      </Button>
    </form>
  );
}
