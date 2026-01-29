import { render, screen } from '@testing-library/react';
import FixedBottomBar, { FIXED_BOTTOM_BAR_CONTAINER_ID } from './index';

describe('FixedBottomBar', () => {
  let container: HTMLDivElement;
  let originalResizeObserver: typeof ResizeObserver | undefined;

  beforeEach(() => {
    originalResizeObserver = global.ResizeObserver;

    // 1. 포탈을 위한 컨테이너 생성
    container = document.createElement('div');
    container.id = FIXED_BOTTOM_BAR_CONTAINER_ID;
    document.body.appendChild(container);

    // 2. ResizeObserver Mock
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));

    // 3. getBoundingClientRect Mock (높이 테스트를 위해)
    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      height: 60,
      width: 0,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    });
  });

  afterEach(() => {
    document.body.removeChild(container);
    jest.restoreAllMocks();
    if (originalResizeObserver) {
      global.ResizeObserver = originalResizeObserver;
    } else {
      delete (global as { ResizeObserver: unknown }).ResizeObserver;
    }
  });

  it('올바르게 마운트되고 children을 렌더링한다.', () => {
    render(
      <FixedBottomBar>
        <button>테스트 버튼</button>
      </FixedBottomBar>
    );

    // children이 나타나는지 확인
    expect(
      screen.getByRole('button', { name: '테스트 버튼' })
    ).toBeInTheDocument();
  });

  it('body 내부의 지정된 컨테이너(Portal)에서 렌더링된다.', () => {
    render(
      <FixedBottomBar>
        <div data-testid="portal-content">포탈 내용</div>
      </FixedBottomBar>
    );

    const portalContent = screen.getByTestId('portal-content');
    const portalContainer = document.getElementById(
      FIXED_BOTTOM_BAR_CONTAINER_ID
    );

    expect(document.body).toContainElement(portalContainer);
    expect(portalContainer).toContainElement(portalContent);
  });

  it('컴포넌트가 반환하는 위치(local)에 배경 spacer(div)가 생성된다.', () => {
    const { container: componentContainer } = render(
      <FixedBottomBar>
        <div data-testid="bar-content">내용</div>
      </FixedBottomBar>
    );

    // spacer는 컴포넌트가 직접 반환하는 컨테이너(local) 내부에 존재해야 함
    const spacer = componentContainer.querySelector(
      'div[aria-hidden="true"]'
    ) as HTMLElement;
    expect(componentContainer).toContainElement(spacer);

    // 실제 내용은 포탈로 빠져나갔으므로 로컬 컨테이너 내부에는 없어야 함
    const content = screen.getByTestId('bar-content');
    expect(componentContainer).not.toContainElement(content);
  });

  it('바의 높이만큼 배경 spacer(div)의 높이가 설정된다.', () => {
    const mockHeight = 120;
    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      height: mockHeight,
      width: 0,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    const { container: componentContainer } = render(
      <FixedBottomBar>
        <div>내용</div>
      </FixedBottomBar>
    );

    const spacer = componentContainer.querySelector('div[aria-hidden="true"]');

    expect(spacer).toBeInTheDocument();
    expect(spacer).toHaveStyle({ height: `${mockHeight}px` });
  });
});
