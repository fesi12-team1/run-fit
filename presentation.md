---
marp: true
theme: default
paginate: true
backgroundColor: #fff
backgroundImage: url('https://marp.app/assets/hero-background.svg')
header: 'RunFit - 러닝 매칭 서비스'
footer: '2026년 1월'
---

<style>
section {
  font-family: 'Pretendard', 'Segoe UI', sans-serif;
}
h1 {
  color: #2563eb;
  border-bottom: 3px solid #2563eb;
  padding-bottom: 10px;
}
h2 {
  color: #1e40af;
}
strong {
  color: #dc2626;
}
</style>

<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# RunFit 🏃‍♂️

### 내 러닝 조건에 꼭 맞는 모임을 한 번에 찾는 러닝 매칭 서비스

---

# 목차

API,
Mutation Hook
Modal
useSuspenseQuery, suspense, errorboundary
form validation with RHF
infinite scroll
responsive design

회고

- 협업하면서 다른 직군과 소통 중 좋았던 점: 디코로 얘기했을 때 대응된 점. 피그마 코멘트.
- 컨벤션 사전에 잡은 건 좋았다: 코드 리뷰 시 중요한 부분에만 집중할 수 있었다. 맥락 이해하기 쉬웠다. 필수 정보를 담은 양식을 담아서, 이해가 빠르게 되었음. 시간 줄일 수 있었음. 커뮤니케이션 비용 감소
- 커뮤니케이션 어려움: 다른 사람이 이해할 수 있는, 다른 사람을 설득할 수 있는 말로 표현하는 게 어려움.
- 내가 부족한 점을 알게 됨:
  준영: 웹 브라우저 이상 단계에 대한 기초가 지식이 부족하다.
  서영: 브라우저보다 낮은 추상화 단계의 지식이 부족하다고 느낌.

1. 프로젝트 개요 간단하게
2. 팀원별로 맡은 역할 (주요 내용만 O, 세세하게는 X) / 기술 스택 / 폴더 구조 X /
3. 프로젝트 수행 절차 및 구조 / 프로세스 간단하게 언급 / 구현한 요구사항
4. 수행 결과 데모 - 플로우 정하기
5. 고민한 점, 트러블 슈팅
6. 회고
7. QnA

- 다 보여주기 - 반응형, 크루의 권한에 따라 ~~ 영상 찍어야함
- 핵심 보여주기 - CRUD - 즉석, 가능한 건 언급만.

- 코드 몇개 고치고
- 데모 연습(플로우 정해서 그에 맞게 보여주기)
- 5,6번 작성 후 정리
- 발표자료 전체 작성

---

<!-- _class: lead -->

# 1. 프로젝트 개요

---

## 프로젝트 소개

**RunFit**은 함께 달릴 사람을 쉽고 빠르게 찾을 수 있는 러닝 모임 플랫폼입니다.

### 핵심 가치

- 🗺️ **지역 기반 필터링** - 내 주변 러닝 모임을 쉽게 찾기
- ⚡ **페이스·난이도 기반 탐색** - 나에게 맞는 수준의 세션 매칭
- ⭐ **신뢰 기반 리뷰 시스템** - 투명한 리뷰로 안전한 모임 문화

### 타겟 사용자

- 초보 러너부터 크루 리더까지 모두가 만족할 수 있는 러닝 환경 제공

---

## 주요 기능

| 기능               | 설명                           |
| ------------------ | ------------------------------ |
| 🔍 **세션 탐색**   | 지역·날짜·페이스 기반 필터링   |
| ⚡ **번개 세션**   | 단발성 러닝 모임 생성 및 참여  |
| 👥 **크루 운영**   | 지속형 러닝 그룹 관리          |
| ✍️ **리뷰 시스템** | 세션 참여 후 리뷰 작성 및 평가 |
| 💙 **찜하기**      | 관심있는 세션 북마크           |
| 📊 **마이페이지**  | 내 세션·리뷰·크루 관리         |

---

<!-- _class: lead -->

# 2. 팀 구성 및 역할

---

## 팀 구성

### 프론트엔드 개발팀

- **역할 분담**
  - UI/UX 구현
  - 상태 관리 및 데이터 페칭
  - 컴포넌트 아키텍처 설계
  - 테스트 코드 작성

- **기술 스택**
  - Next.js, TypeScript, React
  - Tanstack Query, Zustand
  - Tailwind CSS, Shadcn UI

---

<!-- _class: lead -->

# 3. 프로젝트 수행 절차 및 구조

---

## 기술 스택

| Category             | Technology                              |
| -------------------- | --------------------------------------- |
| **Framework**        | Next.js (App Router)                    |
| **Language**         | TypeScript                              |
| **Styling**          | Tailwind CSS, Shadcn UI                 |
| **State Management** | Zustand                                 |
| **Data Fetching**    | Tanstack Query, Axios                   |
| **UI System**        | Storybook                               |
| **Testing**          | Jest, React Testing Library, Playwright |
| **CI/CD**            | GitHub Actions                          |
| **Hosting**          | Vercel                                  |

---

## 아키텍처 설계

### 핵심 아키텍처

- **Next.js App Router** 기반 클라이언트 중심 구조
- **Tanstack Query** - 서버 상태 관리
- **Zustand** - UI/로컬 상태 관리
- **JWT 기반 인증** + 역할별 UI 제어 (RBAC)

### 폴더 구조 전략

- Domain-based 폴더 구조
- App Router 중심의 페이지 라우팅
- 컴포넌트 재사용성 극대화

---

## 폴더 구조

```
run-fit/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── api/          # Route Handlers (API)
│   │   ├── crews/        # 크루 목록/상세
│   │   ├── sessions/     # 세션 목록/상세/생성
│   │   ├── my/           # 마이페이지
│   │   ├── signin/       # 로그인
│   │   └── signup/       # 회원가입
│   ├── components/       # 재사용 가능한 UI 컴포넌트
│   ├── hooks/            # Custom Hooks (React Query 포함)
│   ├── stores/           # Zustand 전역 상태 관리
│   └── types/            # TypeScript 타입 정의
└── e2e/                  # Playwright E2E 테스트
```

---

## 개발 프로세스

### 1️⃣ 기획 및 설계

- 사용자 요구사항 분석
- 와이어프레임 및 디자인 시스템 구축
- API 명세 정의

### 2️⃣ 개발

- 컴포넌트 기반 개발
- Storybook을 통한 UI 컴포넌트 문서화
- MSW를 활용한 API 모킹

### 3️⃣ 테스트

- Unit Test (Jest + React Testing Library)
- E2E Test (Playwright)

---

## CI/CD 파이프라인

### GitHub Actions 기반 자동화

```yaml
✅ 코드 푸시
↓
✅ ESLint + TypeScript 체크
↓
✅ Unit Test 실행
↓
✅ Build 검증
↓
✅ Vercel 자동 배포
```

- **Pre-commit Hook**: Husky + lint-staged로 코드 품질 보장
- **자동 배포**: Vercel을 통한 무중단 배포

---

<!-- _class: lead -->

# 4. 수행 결과

---

## 구현 완료 기능

### ✅ 핵심 기능

- [x] 회원가입 및 로그인 (JWT 인증)
- [x] 세션 목록 조회 (지역/날짜/페이스 필터링)
- [x] 세션 상세 정보 및 참가 신청
- [x] 크루 생성 및 관리
- [x] 리뷰 작성 및 조회
- [x] 찜하기 기능
- [x] 마이페이지 (내 세션/크루/리뷰)

### ✅ 부가 기능

- [x] 반응형 디자인 (모바일/태블릿/데스크톱)
- [x] 무한 스크롤 구현
- [x] Toast 알림 시스템

---

## 성과 및 개선점

### 📈 성과

- **컴포넌트 재사용성**: Shadcn UI 기반 디자인 시스템 구축
- **타입 안전성**: TypeScript로 런타임 에러 최소화
- **테스트 커버리지**: 주요 기능 Unit Test 및 E2E Test 작성
- **개발 생산성**: Storybook으로 컴포넌트 독립적 개발

### 🔧 개선 사항

- 서버 사이드 렌더링 최적화
- 이미지 최적화 및 lazy loading 확대
- 접근성(a11y) 개선
- 성능 모니터링 도구 도입

---

## 시연 영상

<!-- 실제 시연 영상 링크나 스크린샷을 여기에 추가하세요 -->

**주요 시연 항목**

1. 회원가입 및 로그인 플로우
2. 세션 검색 및 필터링
3. 세션 상세 페이지 및 참가 신청
4. 크루 생성 및 관리
5. 리뷰 시스템
6. 마이페이지 기능

---

## 실제 배포 사이트

### 🌐 서비스 URL

<!-- 실제 배포된 URL을 여기에 추가하세요 -->

**<https://your-runfit-app.vercel.app>**

### 📱 주요 페이지

- 메인 페이지 - 세션 탐색
- 크루 목록 - 러닝 크루 찾기
- 마이페이지 - 개인 대시보드
- 세션 생성 - 새로운 모임 만들기

---

<!-- _class: lead -->

# 5. 고민한 점, 트러블 슈팅

---

## SignIn Modal 개선기

프로젝트에서 사용자 인증이 필요한 동작(찜하기, 리뷰 보기 등) 시
로그인이 되지 않았을 경우 로그인을 유도하는 모달을 보여줍니다.

---

### 🤔 기존 방식의 문제점

```tsx
// 모달의 동작을 관리하는 곳
const { open, close, ... } = useSigninModal();
signInModal.open();

// UI를 리턴하는 곳
return <SigninModal open={open} ... />
```

- 📌 코드의 **흐름을 따라가기 어려움**
  - 훅과 UI가 분리되어 있어 동작 흐름 파악 어려움
- 📌 **코드 응집도 낮음**
  - `useLikeButton` 훅에 모달 로직, `LikeButton` 컴포넌트에 UI 리턴
  - 하나의 기능이 여러 곳에 분산됨

---

## ✨ 개선안

### sonner toast 사용 예시

```tsx
import { toast } from 'sonner';

// Provider 설정 (Root layout)
<Toaster />;

// 어디서든 호출
toast.success('성공했어요!');
```

### 사용 방식 (함수 호출만으로 해결)

```tsx
// 어디서든 이렇게만 호출
signInModal.open();
signInModal.close();
```

---

## 구현 코드

```tsx
// 스토어 생성
// src/store/signinModal.ts
type Listener = (isOpen: boolean) => void;
let isOpen = false;
const listeners = new Set<Listener>();

export const signInModal = {
  // 상태 구독 (Provider에서 사용)
  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
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
```

---

## Provider에서 구독

```tsx
// src/provider/SigninModalProvider.tsx
export default function SigninModalProvider() {
  const isOpen = useSyncExternalStore(
    signInModal.subscribe, // 구독 함수
    signInModal.getState, // 스냅샷 가져오기
    () => false // SSR 기본값
  );

  return (
    <Modal open={isOpen} onOpenChange={(open) => !open && signInModal.close()}>
      {/* Modal Content */}
    </Modal>
  );
}
```

---

<!-- _class: lead -->

# Q&A

### 질문해주세요! 🙋‍♂️

---

<!-- _class: lead -->
<!-- _paginate: false -->

# 감사합니다! 🎉

**RunFit** - 함께 달리면 더 즐겁습니다

---
