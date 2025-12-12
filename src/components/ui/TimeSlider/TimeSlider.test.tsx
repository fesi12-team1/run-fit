import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import TimeSlider from '.';

afterEach(() => cleanup());

// ResizeObserver Mock
beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe('TimeSlider', () => {
  const defaultProps = {
    value: [360, 1080] as [number, number],
    onValueChange: jest.fn(),
  };
  test('초기 렌더링: 초기 시간 텍스트와 min/max 라벨이 표시된다', () => {
    render(<TimeSlider {...defaultProps} />);

    expect(screen.getByText('오전 06:00')).toBeInTheDocument();
    expect(screen.getByText('오후 06:00')).toBeInTheDocument();
    expect(screen.getByText('~')).toBeInTheDocument();
    expect(screen.getByText('0시')).toBeInTheDocument();
    expect(screen.getByText('24시')).toBeInTheDocument();
  });

  test('slider thumb가 2개 렌더링된다', () => {
    render(<TimeSlider {...defaultProps} />);

    const thumbs = screen.getAllByRole('slider');
    expect(thumbs).toHaveLength(2);
  });

  test('전체 시간 선택(하루 종일)일 때 "하루 종일" 텍스트가 나타난다', () => {
    render(<TimeSlider value={[0, 1440]} onValueChange={jest.fn()} />);

    expect(screen.getByText('하루 종일')).toBeInTheDocument();
  });

  test('ArrowRight/ArrowLeft 입력 시 step(10분) 간격으로 onValueChange 호출된다', () => {
    const handleChange = jest.fn();
    render(<TimeSlider value={[360, 1080]} onValueChange={handleChange} />);

    const [startThumb, endThumb] = screen.getAllByRole('slider');

    startThumb.focus();
    fireEvent.keyDown(startThumb, { key: 'ArrowRight' });
    expect(handleChange).toHaveBeenNthCalledWith(1, [370, 1080]);

    endThumb.focus();
    fireEvent.keyDown(endThumb, { key: 'ArrowLeft' });
    expect(handleChange).toHaveBeenNthCalledWith(2, [360, 1070]);
  });

  test('min(0시) 아래로 내려가지 않고 max(24시) 위로 올라가지 않는다', () => {
    const handleChange = jest.fn();
    render(<TimeSlider value={[0, 1440]} onValueChange={handleChange} />);

    const [thumbMin, thumbMax] = screen.getAllByRole('slider');

    thumbMin.focus();
    fireEvent.keyDown(thumbMin, { key: 'ArrowLeft' });
    expect(handleChange).not.toHaveBeenCalled();

    thumbMax.focus();
    fireEvent.keyDown(thumbMax, { key: 'ArrowRight' });
    expect(handleChange).not.toHaveBeenCalled();
  });
});
