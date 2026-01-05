---
marp: true
theme: default
paginate: true
backgroundColor: #ffffff
header: 'RunFit - 러닝 매칭 서비스'
---

<style>
@font-face {
  font-family: 'Pretendard';
  font-weight: 400;
  font-display: swap;
  src: url(public/fonts/Pretendard-Regular.woff2) format('woff2');
}

@font-face {
  font-family: 'Pretendard';
  font-weight: 500;
  font-display: swap;
  src: url(public/fonts/Pretendard-Medium.woff2) format('woff2');
}

@font-face {
  font-family: 'Pretendard';
  font-weight: 600;
  font-display: swap;
  src: url(public/fonts/Pretendard-SemiBold.woff2) format('woff2');
}

@font-face {
  font-family: 'Pretendard';
  font-weight: 700;
  font-display: swap;
  src: url(public/fonts/Pretendard-Bold.woff2) format('woff2');
}

section {
  font-family: 'Pretendard', sans-serif;
}

h1 {
  color: oklch(35.3% 0.094275 279.4); /* color-brand-800 */
  border-bottom: 3px solid oklch(39.5% 0.123308 278.1); /* color-brand-700 */
  padding-bottom: 10px;
  font-weight: 700
}
h2 {
  color: oklch(47.3% 0.197796 277.1); /* color-brand-600 */
}
strong {
  color: oklch(66.1% 0.149225 281.1); /* color-brand-300 */
}

section pre, section code {
  font-size: 0.75em;
}
</style>

<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# RunFit 🏃‍♂️

## 내 러닝 조건에 꼭 맞는 모임을 한 번에 찾는 러닝 매칭 서비스

---

# 목차

1. 프로젝트 개요
2. 팀 구성
3. 프로젝트 구성
4. 시연
5. 고민한 점, 트러블 슈팅
6. 회고
7. QnA

---

<!-- _class: lead -->

# 1. 프로젝트 개요

---

## 프로젝트 소개

**RunFit**은 함께 달릴 사람을 쉽고 빠르게 찾을 수 있는 러닝 모임 플랫폼입니다.

---

## 주요 기능

| 기능              | 설명                                                        |
| ----------------- | ----------------------------------------------------------- |
| 🔍 **세션 탐색**  | 지역·날짜·페이스 기반 필터링, 단발성 러닝 모임 생성 및 참여 |
| 👥 **크루 운영**  | 지속형 러닝 그룹 관리                                       |
| ✍️ **리뷰**       | 세션 참여 후 리뷰 작성 및 평가                              |
| 💙 **찜하기**     | 관심있는 세션 북마크                                        |
| 📊 **마이페이지** | 내 세션·리뷰·크루 관리                                      |

---

<!-- _class: lead -->

# 2. 팀 구성

---

- 석준:
  - 테스트 환경 설정
  - 기능: 지도 및 주소 보기/설정, 세션 상세 보기, 세션 생성/수정, 세션 찜하기
  - 컴포넌트: Header, Button, UserAvatar, Tabs, Textarea, Modal
- 서영:
  - React Query, Suspense, 무한스크롤, URL/Context 상태 관리를 활용해 비동기 데이터와 화면 상태 흐름 설계
  - 초기 로딩과 사용자 인터랙션 기반 로딩을 분리해 로딩과 UX의 책임을 구조적으로 개선
  - CI/CD 파이프라인, ESLint 규칙, PR 템플릿 기반 협업 환경 개선

---

- 진우:
  - Husky로 협업 환경 구축
  - Tanstack Query 전반 구조 설계 및 초기 세팅
  - Proxy 기반 로그인 상태에 따른 페이지 접근 제어
  - 마이페이지 기능 구현
- 준영:
  - Tanstack Query 연동을 고려한 API 및 인증 전반적 구조 설계
  - 무한 스크롤과 페이지네이션을 이용한 크루 상세 페이지 구현

---

<!-- _class: lead -->

# 3. 프로젝트 구성

---

## 기술 스택

| Category       | Technology                                             |
| -------------- | ------------------------------------------------------ |
| **프레임워크** | Next.js 16 (App Router, React 19)                      |
| **스타일링**   | Tailwind CSS, Shadcn UI, Radix UI                      |
| **상태 관리**  | Tanstack Query                                         |
| **기타**       | React Hook Form, zod, Suspensive, sonner               |
| **UI System**  | Storybook                                              |
| **Testing**    | Jest, React Testing Library, Playwright, MSW, Faker-js |
| **CI/CD**      | GitHub Actions                                         |
| **Hosting**    | Vercel                                                 |

---

## 아키텍처 설계

- **Next.js App Router** 기반 클라이언트 중심 구조
- **Tanstack Query** - 서버 상태 관리
- **JWT 기반 인증** + 역할별 UI 제어 (RBAC)

---

<!-- _class: lead -->

# 4. 수행 결과

---

## 구현 완료 기능

### ✅ 핵심 기능

- ✅ 회원가입 및 로그인
- ✅ 세션 목록 조회, 세션 상세 정보 및 참가 신청
- ✅ 크루 목록 조회, 크루 생성 및 관리
- ✅ 리뷰 작성 및 조회
- ✅ 찜하기
- ✅ 마이페이지 (내 세션/크루/리뷰)

### ✅ 부가 기능

- ✅ 반응형 디자인 (모바일/태블릿/데스크톱)
- ✅ 무한 스크롤 구현

---

## 시연 영상

**주요 시연 항목**

1. 회원가입 및 로그인 플로우
2. 세션 필터링
3. 세션 상세 페이지 및 참가 신청
4. 크루 생성 및 관리
5. 리뷰 시스템
6. 마이페이지 기능

---

<!-- _class: lead -->

# 5. 고민한 점, 트러블 슈팅

---

## SignIn Modal 개선기

프로젝트에서 사용자 인증이 필요한 동작(찜하기, 리뷰 보기 등) 시
로그인이 되지 않았을 경우 로그인을 유도하는 모달을 보여줍니다.

---

### 🤔 기존 방식의 문제점

- 📌 코드의 **흐름을 따라가기 어려움**
  - 훅과 UI가 분리되어 있어 동작 흐름 파악 어려움
- 📌 **코드 응집도 낮음**
  - `useLikeButton` 훅에 모달 로직, `LikeButton` 컴포넌트에 UI 리턴
  - 하나의 기능이 여러 곳에 분산됨

```tsx
// 모달의 동작을 관리하는 곳
const { open, close, ... } = useSigninModal();
signInModal.open();

// UI를 리턴하는 곳
return <SigninModal open={open} ... />
```

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

## Suspense + ErrorBoundary 사용

---

### 🤔 기존 방식의 문제점

**로딩, 에러 처리가 컴포넌트에 섞여 있음**

```tsx
export default function SessionDetail({ sessionId }: SessionDetailProps) {
  // 로딩, 에러 상태 관리
  const {
    data: session,
    isLoading,
    error,
  } = useQuery(sessionQueries.detail(sessionId));

  if (isLoading) return <Spinner />;
  if (error) return <ErrorFallback error={error} />;

  // 로직과 UI를 모두 처리
  return <div>{/* 세션 상세 정보 렌더링 */}</div>;
}
```

---

## 문제점

- 📌 **컴포넌트의 책임이 명확하지 않음**
  - 데이터 페칭 + 로딩 UI + 에러 UI 모두 처리
- 📌 **조건부 렌더링으로 인한 복잡성**

---

## Suspense + ErrorBoundary

### ✨ 개선된 방식

```tsx
// Container: 초기 로딩만 Suspense로 처리
export default function SessionListContainer() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Suspense fallback={<Spinner />} clientOnly>
        <SessionList />
      </Suspense>
    </ErrorBoundary>
  );
}
```

---

## Suspense + ErrorBoundary

```tsx
// 컴포넌트: 추가 로딩만 처리
export default function SessionList() {
  const { data, isFetchingNextPage, fetchNextPage } = useInfiniteQuery(
    sessionQueries.infinite(),
    {
      // select로 페이지별 응답을 리스트로 변환
      select: (data) => data.pages.flatMap((page) => page.data),
    }
  );

  // 쿼리 구조를 알 필요 없음 - 바로 리스트로 사용
  return (
    <div>
      {data.map((session) => (
        <SessionCard key={session.id} session={session} />
      ))}
      {isFetchingNextPage && <ScrollSpinner />}
    </div>
  );
}
```

---

## Suspense + ErrorBoundary 사용

### 개선의 이점

| 항목               | 기존 방식    | 개선 방식         |
| ------------------ | ------------ | ----------------- |
| **로딩 상태 관리** | 컴포넌트에서 | Suspense에서      |
| **에러 처리**      | 컴포넌트에서 | ErrorBoundary에서 |
| **컴포넌트 책임**  | 다중 책임    | 단일 책임         |
| **코드 가독성**    | 복잡함       | 명확함            |
| **조건부 렌더링**  | 많음         | 거의 없음         |

---

## Suspense 심화: 초기 로딩과 추가 로딩 분리

### 🤔 초기 문제점

**컴포넌트에서 모든 로딩 상태를 직접 관리**

```tsx
export default function SessionList() {
  const { data, isLoading, isFetchingNextPage } = useInfiniteQuery(
    sessionQueries.infinite()
  );

  if (isLoading) return <Spinner />; // 초기 로딩
  // ...
```

---

## Suspense 심화: 초기 로딩과 추가 로딩 분리

### 🤔 초기 문제점

**컴포넌트에서 모든 로딩 상태를 직접 관리**

```tsx
export default function SessionList() {
  // ...
  return (
    <div>
      {data?.pages.map((page) =>
        page.data.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))
      )}
      {isFetchingNextPage && <ScrollSpinner />} // 추가 로딩
    </div>
  );
}
```

---

## Suspense 심화: 초기 로딩과 추가 로딩 분리

### 🤔 초기 문제점

**컴포넌트에서 모든 로딩 상태를 직접 관리**

- 📌 **초기 로딩과 추가 로딩 구분 필요**: 무한스크롤에서는 두 가지 로딩이 섞여 있음
- 📌 **쿼리 구조 노출**: 컴포넌트가 page 단위 응답 구조를 직접 처리

---

### ✨ 개선 방식: 로딩 상태 분리 + 데이터 변환

```tsx
// Container: 초기 로딩만 Suspense로 처리
export default function SessionListContainer() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Suspense fallback={<Spinner />} clientOnly>
        <SessionList />
      </Suspense>
    </ErrorBoundary>
  );
}
```

---

### ✨ 개선 방식: 로딩 상태 분리 + 데이터 변환

```tsx
// 컴포넌트: 추가 로딩만 처리
export default function SessionList() {
  const { data, isFetchingNextPage, fetchNextPage } = useInfiniteQuery(
    sessionQueries.infinite(),
    {
      // select로 페이지별 응답을 리스트로 변환
      select: (data) => data.pages.flatMap((page) => page.data),
    }
  );

  // 쿼리 구조를 알 필요 없음 - 바로 리스트로 사용
  return (
    <div>
      {data.map((session) => (
        <SessionCard key={session.id} session={session} />
      ))}
      {isFetchingNextPage && <ScrollSpinner />}
    </div>
  );
}
```

---

## Suspense 심화: 초기 로딩과 추가 로딩 분리

### 개선의 이점

| 항목               | 기존 방식           | 개선 방식                      |
| ------------------ | ------------------- | ------------------------------ |
| **초기 로딩 처리** | 컴포넌트에서        | Suspense boundary에서          |
| **추가 로딩 처리** | 같은 상태로 관리    | 별도의 isFetchingNextPage 사용 |
| **쿼리 구조 노출** | page 단위 직접 처리 | select로 변환                  |
| **코드 복잡도**    | 높음                | 낮음                           |
| **컴포넌트 책임**  | 다중                | 데이터 렌더링만                |

---

<!-- _class: lead -->

## Next.js Proxy를 이용한 페이지 접근 제어

---

### 🤔 기존 방식의 문제점

**각 페이지에서 반복되는 조건 분기**
  
- 📌 **중복 코드**: 모든 보호 페이지마다 동일한 체크 반복
- 📌 **관심사 혼재**: 페이지의 책임이 명확하지 않음

```tsx
// src/app/my/page.tsx
export default async function MyPage() {
  const user = await getUser();

  if (!user) {
    redirect('/signin');
  }

  // 페이지 로직...
}
```

---

## ✨ 개선된 방식

### Middleware를 이용한 중앙 관리

```tsx
// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_ROUTES = ['/my', '/sessions/[id]'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;

  // 보호된 경로 접근 확인
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route.replace('[id]', ''))
  );

  // ...
```

---

## ✨ 개선된 방식

### Middleware를 이용한 중앙 관리

```tsx
// src/middleware.ts
  // ...
  if (isProtectedRoute && !token) {
    // 로그인 페이지로 리다이렉트하며 원래 경로 저장
    const signInUrl = new URL('/signin', request.url);
    signInUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = { matcher: ['/my/:path*', '/sessions/:path*'] };
```

---

## 로그인 후 원래 페이지로 복귀

```tsx
// src/app/signin/page.tsx
import { useSearchParams } from 'next/navigation';

export default function SignInPage() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');

  const handleSignInSuccess = async () => {
    // 로그인 성공
    toast.success('로그인했어요!');

    // 원래 가려던 경로로 이동, 없으면 홈으로
    router.push(redirect || '/');
  };

  return <div>{/* 로그인 폼 */}</div>;
}
```

---

## Next.js Proxy를 이용한 페이지 접근 제어

### 개선의 이점

| 항목            | 기존 방식        | 개선 방식               |
| --------------- | ---------------- | ----------------------- |
| **코드 중복**   | 모든 페이지 반복 | 중앙 관리 (1회만)       |
| **접근 제어**   | 분산 관리        | 한 곳에서 통제          |
| **관심사 분리** | 혼합             | 명확히 분리             |
| **UX**          | 경로 정보 손실   | 원래 페이지로 복귀 가능 |
| **유지보수**    | 어려움           | 간편함                  |

---

<!-- _class: lead -->

## Mutation 리팩토링: Hook → Factory 방식 전환

---

### 🤔 기존 방식의 문제점

**useQueryClient로 클라이언트를 주입받는 방식**
  
- 📌 **리팩토링의 걸림돌**: useQueryClient 호출로 인한 의존성
- 📌 **재사용성 제한**: Query Factory와 달리 일관된 관리 불가능

```tsx
// src/hooks/useLikeMutation.ts
export function useLikeMutation() {
  const queryClient = useQueryClient(); // 클라이언트 주입

  return useMutation({
    mutationFn: async (sessionId: string) => {
      return await likeSession(sessionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionQueries.list() });
    },
  });
}
```

---

## ✨ 개선된 방식

### Callback Context 활용

```tsx
// Mutation의 callback에서 제공되는 context의 client 사용
return useMutation({
  mutationFn: async (sessionId: string) => {
    return await likeSession(sessionId);
  },
  onSuccess: (data, variables, context) => {
    // context에서 제공되는 client 사용
    context.queryClient?.invalidateQueries({
      queryKey: sessionQueries.list(),
    });
  },
});
```

---

## Factory 패턴으로의 전환

### Query Factory와 유사한 구조

```tsx
// 추후 Factory 방식으로 관리 가능
export const sessionMutations = {
  like: () =>
    useMutation({
      mutationFn: likeSession,
      onSuccess: (data, variables, context) => {
        context?.invalidateQueries({ queryKey: sessionQueries.list() });
      },
    }),
  unlike: () =>
    useMutation({
      mutationFn: unlikeSession,
      onSuccess: (data, variables, context) => {
        context?.invalidateQueries({ queryKey: sessionQueries.list() });
      },
    }),
};
```

---

## 관심사 분리: UI 액션 처리

### 🤔 문제점

Mutation의 onSuccess/onError 내에서 UI 액션을 모두 처리

```tsx
export function useLikeMutation() {
  return useMutation({
    mutationFn: likeSession,
    onSuccess: () => {
      queryClient.invalidateQueries(...);
      toast.success('찜했어요!'); // UI 액션
      router.push('/...'); // 네비게이션
    },
  });
}
```

---

## ✨ 개선안: 사용처에서 UI 액션 처리

### 원칙

**Hook 파일**: Query Invalidation만 처리  
**사용처**: 비즈니스 로직에 맞는 UI 액션 처리

---

## ✨ 개선안: 사용처에서 UI 액션 처리

### 구현 예시 `src/components/LikeButton.tsx`

```tsx
export function LikeButton({ sessionId }: Props) {
  const { mutate: like } = sessionMutations.like();
    // 이 페이지/컴포넌트의 맥락에 맞는 UI 액션
    await like(
      { sessionId, liked },
      {
        onSuccess: () => {
          toast.success(liked ? '찜한 세션에서 제외되었습니다.' : '찜한 세션에 추가되었습니다.');
        },
        onError: () => { toast.error('찜하기에 실패했어요.') }
        // ...
}
```

---

## Mutation 리팩토링: Hook → Factory 방식 전환

### 개선의 이점

| 항목             | 기존 방식         | 개선 방식             |
| ---------------- | ----------------- | --------------------- |
| **관심사 분리**  | Hook 내 모두 처리 | Hook과 사용처 분리    |
| **UI 액션 통제** | 어려움            | 사용 시점에 주입 가능 |
| **코드 응집도**  | 낮음              | 높음                  |
| **재사용성**     | 제한적            | Factory 확장 용이     |
| **맥락 이해**    | 어려움            | 명확함                |

---

<!-- _class: lead -->

# 6. 회고

---

## **👍 협업하며 좋았던 점**

- Discord를 통한 **실시간 소통**으로 **이슈 대응 속도**가 빨랐다.
- Figma 코멘트를 활용해 **디자인 의도를 명확히 공유**할 수 있었다.
- 텍스트 설명보다 **시각적 맥락**을 함께 전달할 수 있어 오해가 줄었다.

---

## **👍 컨벤션을 사전에 정한 효과**

- 코드 리뷰 시 형식보다 **로직과 핵심 구현에 집중**할 수 있었다.
- PR 템플릿에 필수 정보를 구조화해 두어 변경 맥락을 빠르게 이해할 수 있었다.
- 리뷰 및 피드백에 소요되는 시간이 줄었고, 커뮤니케이션 비용이 감소했다.

---

## **⚠️ 협업 과정에서 느낀 어려움**

- 내가 이해한 내용을 **다른 직군도 이해할 수 있는 언어로 설명하는 것**이 쉽지 않았다.
- **기술적 선택**에 대해 상대를 설득할 때, 근거를 **구조적으로 전달**하는 데 어려움을 느꼈다.

---

## **🔍 스스로 인식한 부족한 점**

- **각 추상화 단계의 기초 지식이 부족함**을 인지했다.
  - 프레임워크 (React/Next.js) 사용에는 익숙했지만, **추상화된 실제 동작 원리**
  - 브라우저·네트워크·렌더링 단계를 포함한 **웹 브라우저 동작 원리**에 대한 이해

---

<!-- _class: lead -->

# 7. Q&A

---

<!-- _class: lead -->
<!-- _paginate: false -->

# 감사합니다! 🎉
