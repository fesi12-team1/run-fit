'use client';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useSignupForm } from '@/hooks/auth/useSignupForm';

export default function SignupForm() {
  const { form, submit, isPending } = useSignupForm();
  const {
    register,
    formState: { errors },
  } = form;

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
        type="password"
        {...register('password')}
        errorMessage={errors.password?.message}
      />
      <Input
        label="비밀번호 확인"
        aria-invalid={!!errors.passwordConfirm}
        type="password"
        {...register('passwordConfirm')}
        errorMessage={errors.passwordConfirm?.message}
      />

      <Button type="submit" disabled={isPending}>
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
