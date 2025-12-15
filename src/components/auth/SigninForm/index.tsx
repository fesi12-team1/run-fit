'use client';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useSigninForm } from '@/hooks/auth/useSigninForm';

export default function SigninForm() {
  const { form, submit, isPending } = useSigninForm();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <Input
        label="이메일"
        {...register('email')}
        errorMessage={errors.email?.message}
      />
      <Input
        label="비밀번호"
        type="password"
        {...register('password')}
        errorMessage={errors.password?.message}
      />
      {errors.root && (
        <p className="text-sm text-red-500">{errors.root.message}</p>
      )}
      <Button type="submit" disabled={isPending}>
        로그인
      </Button>
    </form>
  );
}
