'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useSignupForm } from '@/hooks/auth/useSignupForm';

export default function SignupForm() {
  const { form, submit, isPending } = useSignupForm();
  const {
    register,
    formState: { errors, isValid },
  } = form;

  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <Input
        label="이름"
        aria-invalid={!!errors.name}
        {...register('name')}
        errorMessage={errors.name?.message}
      />
      <Input
        label="이메일"
        aria-invalid={!!errors.email}
        {...register('email')}
        errorMessage={errors.email?.message}
      />
      <Input
        label="비밀번호"
        aria-invalid={!!errors.password}
        type={show ? 'text' : 'password'}
        {...register('password')}
        errorMessage={errors.password?.message}
        RightElement={
          <button type="button" onClick={() => setShow(!show)}>
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        }
      />
      <Input
        label="비밀번호 확인"
        aria-invalid={!!errors.passwordConfirm}
        type={showConfirm ? 'text' : 'password'}
        {...register('passwordConfirm')}
        errorMessage={errors.passwordConfirm?.message}
        RightElement={
          <button type="button" onClick={() => setShowConfirm(!showConfirm)}>
            {showConfirm ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        }
      />

      <Button type="submit" disabled={isPending || !isValid}>
        회원가입
      </Button>
      {errors.root && (
        <p role="alert" className="text-sm text-red-500">
          {errors.root.message}
        </p>
      )}
    </form>
  );
}
