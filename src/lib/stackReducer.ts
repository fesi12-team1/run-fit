/**
 * 범용 스택 리듀서
 * PUSH: 아이템 추가
 * POP: 마지막 아이템 제거
 * CLEAR: 전체 제거
 */
export type StackAction<T> =
  | { type: 'PUSH'; item: T }
  | { type: 'POP' }
  | { type: 'CLEAR' }
  | { type: 'GET_TOP' };

export default function stackReducer<T>(
  state: T[],
  action: StackAction<T>
): T[] {
  switch (action.type) {
    case 'PUSH':
      return [...state, action.item];
    case 'POP':
      return state.length ? state.slice(0, -1) : state;
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}
