import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import PaceSlider from './PaceSlider';

afterEach(() => cleanup());

// ResizeObserver Mock
beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe('PaceSlider', () => {
  test('초기 렌더링: 기본값(420초)과 min/max 라벨이 표시된다', () => {
    render(<PaceSlider value={420} onValueChange={() => {}} />);

    expect(screen.getByText('7분/km')).toBeInTheDocument();
    expect(screen.getByText('4분')).toBeInTheDocument();
    expect(screen.getByText('10분')).toBeInTheDocument();
  });

  test('ArrowRight/ArrowLeft 입력 시 step(10초) 간격으로 onValueChange 호출된다', () => {
    const handleChange = jest.fn();

    render(<PaceSlider value={420} onValueChange={handleChange} />);

    const sliderThumb = screen.getByRole('slider');

    fireEvent.keyDown(sliderThumb, { key: 'ArrowRight' });
    expect(handleChange).toHaveBeenNthCalledWith(1, 430);

    fireEvent.keyDown(sliderThumb, { key: 'ArrowLeft' });
    expect(handleChange).toHaveBeenNthCalledWith(2, 410);
  });

  test('min(240초) 아래로 내려가지 않고 max(600초) 위로 올라가지 않는다', () => {
    const handleChange = jest.fn();

    render(<PaceSlider value={240} onValueChange={handleChange} />);
    const thumbMin = screen.getByRole('slider');

    fireEvent.keyDown(thumbMin, { key: 'ArrowLeft' });
    expect(handleChange).not.toHaveBeenCalled();

    cleanup();

    render(<PaceSlider value={600} onValueChange={handleChange} />);
    const thumbMax = screen.getByRole('slider');

    fireEvent.keyDown(thumbMax, { key: 'ArrowRight' });
    expect(handleChange).not.toHaveBeenCalled();
  });
});
