// src/store/authModalStore.ts
type Listener = (isOpen: boolean) => void;
let isOpen = false;
const listeners = new Set<Listener>();

export const signInModal = {
  // 상태 구독 (Provider에서 사용)
  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  // 어디서든 호출 가능한 함수
  open: () => {
    isOpen = true;
    listeners.forEach((l) => l(isOpen));
  },
  close: () => {
    isOpen = false;
    listeners.forEach((l) => l(isOpen));
  },
  getState: () => isOpen,
};
