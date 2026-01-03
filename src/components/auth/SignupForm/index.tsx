'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { useSignup } from '@/api/mutations/authMutations';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useSignupForm } from '@/hooks/auth/useSignupForm';

export default function SignupForm() {
  const router = useRouter();

  const form = useSignupForm();
  const { mutate, isPending } = useSignup({
    onSuccess: () => {
      toast.success('회원가입 성공!');
      router.push('/signin');
    },
    onError: (error) => {
      toast.error(`회원가입 실패: ${error.message}`);
      form.setError('root', {});
    },
  });

  const submit = form.handleSubmit((values) => {
    mutate(values);
  });
  const {
    register,
    formState: { errors, isValid },
  } = form;

  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <form className="flex flex-col gap-4" onSubmit={submit}>
      <Input
        label="이름"
        {...register('name', { required: '이름을 입력해주세요.' })}
        errorMessage={errors.name?.message}
      />
      <Input
        label="이메일"
        {...register('email', { required: '이메일을 입력해주세요.' })}
        errorMessage={errors.email?.message}
      />
      <Input
        label="비밀번호"
        type={show ? 'text' : 'password'}
        {...register('password', { required: '비밀번호를 입력해주세요.' })}
        RightElement={
          <button type="button" onClick={() => setShow(!show)}>
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        }
        errorMessage={errors.password?.message}
      />
      <Input
        label="비밀번호 확인"
        type={showConfirm ? 'text' : 'password'}
        {...register('passwordConfirm', {
          required: '비밀번호 확인을 입력해주세요.',
        })}
        RightElement={
          <button type="button" onClick={() => setShowConfirm(!showConfirm)}>
            {showConfirm ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        }
        errorMessage={errors.passwordConfirm?.message}
      />
      <Button disabled={isPending || !isValid} type="submit">
        회원가입
      </Button>
    </form>
  );
}
