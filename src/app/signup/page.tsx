import SignupForm from '@/components/auth/SignupForm';
import AuthLayout from '@/components/layout/AuthLayout';

export default function SignupPage() {
  return (
    <AuthLayout
      title="회원가입"
      form={<SignupForm />}
      footerText="이미 회원이신가요?"
      footerLinkText="로그인"
      footerLinkHref="/signin"
    />
  );
}
