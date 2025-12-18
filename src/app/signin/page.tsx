import SigninForm from '@/components/auth/SigninForm';
import AuthLayout from '@/components/layout/AuthLayout';

export default function SigninPage() {
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
