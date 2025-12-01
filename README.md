# RunFit

내 러닝 조건(지역·날짜·페이스)에 꼭 맞는 모임을 한 번에 찾는 러닝 매칭 서비스

## 프로젝트 개요

RunFit은 함께 달릴 사람을 쉽고 빠르게 찾을 수 있는 러닝 모임 플랫폼입니다. <br/>
지역 기반 필터링, 페이스·난이도 기반 탐색, 신뢰 기반 리뷰 시스템을 통해 <br/>
초보 러너부터 크루 리더까지 모두가 만족할 수 있는 러닝 환경을 제공합니다.

## 기술 스택

| Category      | Tech                                    |
| ------------- | --------------------------------------- |
| Framework     | Next.js (App Router)                    |
| Language      | TypeScript                              |
| Styling       | Tailwind CSS, Shadcn UI                 |
| State Mgmt    | Zustand                                 |
| Data Fetching | Tanstack Query, Axios                   |
| UI System     | Storybook                               |
| Testing       | Jest, React Testing Library, Playwright |
| CI/CD         | GitHub Actions                          |
| Hosting       | Vercel                                  |

## 아키텍처

- Next.js(App Router) 기반의 클라이언트 중심 구조
- Tanstack Query로 서버 상태 관리 + Zustand로 UI/로컬 상태 관리
- JWT 기반 인증 + 역할별 UI 제어(RBAC)
- App Router 중심의 domain-based 폴더 구조 사용
- 디자인 시스템은 Shadcn + Storybook 기반 UI 컴포넌트 구축

## 폴더 구조

```text
run-fit
├── src
│   ├── app               # Next.js App Router pages
│   │   ├── api/          # Route Handlers
│   │   ├── crews/        # 크루 목록/상세
│   │   ├── sessions/     # 세션 목록/상세/생성
│   │   ├── my/           # 마이페이지
│   │   ├── signin/       # 로그인
│   │   └── signup/       # 회원가입
│   │
│   ├── assets/           # 정적 파일
│   ├── components/       # 공통 UI 컴포넌트 (Shadcn UI + 커스텀)
│   ├── hooks/            # React Query hooks
│   ├── lib/              # constants, utils 등
│   ├── mocks/            # MSW handlers
│   ├── provider/         # Providers (ex: QueryProvider)
│   ├── stores/           # Zustand store
│   └── types/            # 타입 정의
│
├── e2e/                  # Playwright E2E tests
├── .github/              # GitHub workflows
├── .husky/               # Git hooks
├── node_modules/
└── 기타 설정 파일들      # eslint, jest, tsconfig, next.config 등
```

## 주요 기능

- 지역·날짜·페이스 기반 세션 탐색
- 단발성 세션(번개) + 지속형 크루 운영
- 세션 생성·수정·관리
- 리뷰 기반 신뢰도 시스템
- 찜한 세션(북마크)
- 마이페이지(내 세션·리뷰·크루)
- 역할 기반 권한 (크루장 / 운영진 / 일반 멤버)

## 기여도와 역할

## 결과 및 성과
