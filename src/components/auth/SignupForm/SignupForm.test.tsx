import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/provider/renderWithProviders';
import SignupForm from '.';

describe('SignupForm', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // it('이미 존재하는 이메일이면 에러 메시지를 표시한다', async () => {
  //   const user = userEvent.setup();
  //   jest.spyOn(global, 'fetch').mockResolvedValueOnce({
  //     ok: false,
  //     json: async () => ({
  //       success: false,
  //       data: null,
  //       error: {
  //         code: 'ALREADY_EXISTS_EMAIL',
  //         message: '이미 사용중인 이메일입니다.',
  //       },
  //     }),
  //   } as Response);

  //   renderWithProviders(<SignupForm />);

  //   await user.type(screen.getByLabelText('이메일'), 'test@test.com');
  //   await user.type(screen.getByLabelText('비밀번호'), 'password123');
  //   await user.type(screen.getByLabelText('비밀번호 확인'), 'password123');
  //   await user.type(screen.getByLabelText('이름'), '홍길동');
  //   await user.click(screen.getByRole('button', { name: '회원가입' }));

  //   expect(
  //     await screen.findByText('이미 사용중인 이메일입니다.')
  //   ).toBeInTheDocument();
  // });

  // it('서버 VALIDATION_ERROR 발생 시 루트 에러 메시지를 표시한다', async () => {
  //   const user = userEvent.setup();
  //   jest.spyOn(global, 'fetch').mockResolvedValueOnce({
  //     ok: false,
  //     json: async () => ({
  //       success: false,
  //       data: null,
  //       error: {
  //         code: 'VALIDATION_ERROR',
  //         message: '요청 데이터가 유효하지 않습니다.',
  //       },
  //     }),
  //   } as Response);

  //   renderWithProviders(<SignupForm />);

  //   await user.type(screen.getByLabelText('이메일'), 'test@test.com');
  //   await user.type(screen.getByLabelText('비밀번호'), 'password123');
  //   await user.type(screen.getByLabelText('비밀번호 확인'), 'password123');
  //   await user.type(screen.getByLabelText('이름'), '홍길동');
  //   await user.click(screen.getByRole('button', { name: '회원가입' }));

  //   expect(
  //     await screen.findByText('요청 데이터가 유효하지 않습니다.')
  //   ).toBeInTheDocument();
  // });

  it('비밀번호와 비밀번호 확인이 다르면 API 요청을 보내지 않는다', async () => {
    const user = userEvent.setup();
    const fetchSpy = jest.spyOn(global, 'fetch');

    renderWithProviders(<SignupForm />);

    await user.type(screen.getByLabelText('이메일'), 'test@test.com');
    await user.type(screen.getByLabelText('비밀번호'), 'password123');
    await user.type(screen.getByLabelText('비밀번호 확인'), 'password456');
    await user.type(screen.getByLabelText('이름'), '홍길동');
    await user.click(screen.getByRole('button', { name: '회원가입' }));

    expect(
      await screen.findByText('비밀번호가 일치하지 않습니다.')
    ).toBeInTheDocument();

    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
