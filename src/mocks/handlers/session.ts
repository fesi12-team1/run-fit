import { http, HttpResponse } from 'msw';
import {
  CreateSessionRequestBody,
  UpdateSessionDetailRequestBody,
} from '@/api/fetch/sessions';
import { AuthMode, requireAuth } from '../core/auth';
import { type PathFn } from '../core/path';
import { faker, sessions } from '../data';
import { parseIdParam, successResponse } from '../utils';

export function createSessionHandlers(p: PathFn, authMode: AuthMode) {
  return [
    // 세션 생성
    http.post(
      p('/api/sessions'),
      requireAuth(authMode, async ({ request }) => {
        const {
          crewId,
          name,
          description,
          image,
          city,
          location,
          district,
          coords,
          sessionAt,
          registerBy,
          level,
          pace,
          maxParticipantCount,
        } = (await request.json()) as CreateSessionRequestBody;

        const data = {
          crewId: crewId,
          name: name,
          description: description,
          image: image || null,
          city: city,
          district: district,
          location: location,
          coords: coords,
          sessionAt: sessionAt,
          registerBy: registerBy,
          level: level,
          maxParticipantCount: maxParticipantCount,
          pace: pace,
        };

        return HttpResponse.json(successResponse(data), { status: 201 });
      })
    ),

    // 세션 목록 조회
    http.get(p('/api/sessions'), ({ request }) => {
      const url = new URL(request.url);
      const page = parseInt(url.searchParams.get('page') || '0', 10);
      const size = parseInt(url.searchParams.get('size') || '20', 10);
      const city = url.searchParams.get('city'); // 복수 선택 가능
      const district = url.searchParams.get('district'); // 복수 선택 가능
      const crewId = parseInt(url.searchParams.get('crewId') || '', 10);
      const level = url.searchParams.get('level'); // BEGINNER, INTERMEDIATE, ADVANCED
      const dateFrom = url.searchParams.get('dateFrom'); // 2025-12-01
      const dateTo = url.searchParams.get('dateTo'); // 2025-12-08
      const timeFrom = url.searchParams.get('timeFrom'); // 12:00
      const timeTo = url.searchParams.get('timeTo'); // 14:30
      const sort = url.searchParams.get('sort') || 'createdAtDesc'; // createdAtDesc, sessionAtAsc, registerByAsc

      let filteredSessions = [...sessions];

      if (city) {
        filteredSessions = filteredSessions.filter((s) => s.city === city);
      }

      if (district) {
        filteredSessions = filteredSessions.filter(
          (s) => s.district === district
        );
      }

      if (crewId) {
        filteredSessions = filteredSessions.filter((s) => s.crewId === crewId);
      }

      if (level) {
        filteredSessions = filteredSessions.filter((s) => s.level === level);
      }

      if (dateFrom) {
        filteredSessions = filteredSessions.filter((s) => {
          const sessionDate = s.sessionAt.split('T')[0];
          return sessionDate >= dateFrom;
        });
      }

      if (dateTo) {
        filteredSessions = filteredSessions.filter((s) => {
          const sessionDate = s.sessionAt.split('T')[0];
          return sessionDate <= dateTo;
        });
      }

      if (timeFrom) {
        filteredSessions = filteredSessions.filter((s) => {
          const sessionTime = s.sessionAt.split('T')[1].slice(0, 5); // "HH:MM"
          return sessionTime >= timeFrom;
        });
      }

      if (timeTo) {
        filteredSessions = filteredSessions.filter((s) => {
          const sessionTime = s.sessionAt.split('T')[1].slice(0, 5); // "HH:MM"
          return sessionTime <= timeTo;
        });
      }

      // 정렬
      if (sort === 'createdAtDesc') {
        filteredSessions.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (sort === 'sessionAtAsc') {
        filteredSessions.sort(
          (a, b) =>
            new Date(a.sessionAt).getTime() - new Date(b.sessionAt).getTime()
        );
      } else if (sort === 'registerByAsc') {
        // 마감 임박순 (registerBy 오름차순)
        filteredSessions.sort(
          (a, b) =>
            new Date(a.registerBy).getTime() - new Date(b.registerBy).getTime()
        );
      }

      // 무한스크롤
      const startIndex = page * size;
      const endIndex = startIndex + size;
      const paginatedSessions = filteredSessions.slice(startIndex, endIndex);
      const hasNext = endIndex < filteredSessions.length;

      const content = paginatedSessions.map(
        ({ maxParticipantCount, ...rest }) => ({
          ...rest,
          liked: faker.datatype.boolean(),
          maxParticipantCount,
          currentParticipantCount: faker.number.int({
            min: 0,
            max: maxParticipantCount,
          }),
          participants: [
            {
              userId: 0,
              name: faker.person.fullName(),
              profileImage: faker.image.avatar(),
              role: 'LEADER',
              joinedAt: '2025-12-17T03:11:18.981Z',
            },
            {
              userId: 0,
              name: faker.person.fullName(),
              profileImage: faker.image.avatar(),
              role: 'STAFF',
              joinedAt: '2025-12-17T03:11:18.981Z',
            },
            {
              userId: 0,
              name: faker.person.fullName(),
              profileImage: faker.image.avatar(),
              role: 'MEMBER',
              joinedAt: '2025-12-17T03:11:18.981Z',
            },
          ],
        })
      );

      const data = {
        content: content,
        hasNext: hasNext,
      };
      return HttpResponse.json(successResponse(data), { status: 200 });
    }),

    // 세션 상세 조회
    http.get(p('/api/sessions/:id'), ({ params }) => {
      const sessionId = parseIdParam(params.id);

      const data = {
        id: sessionId,
        crewId: 1,
        hostUserId: 1,
        name: faker.lorem.words(3),
        description: faker.lorem.sentence(),
        image: faker.image.urlPicsumPhotos(),
        city: '서울',
        district: '영등포구',
        location: '서울특별시 영등포구 여의동로 330',
        coords: {
          lat: 37.566826,
          lng: 126.9786567,
        },
        sessionAt: '2025-12-20T02:41:38.192Z',
        registerBy: '2025-12-19T02:41:38.192Z',
        level: 'BEGINNER',
        status: 'OPEN',
        pace: 300,
        maxParticipantCount: 10,
        currentParticipantCount: 2,
        liked: true,
        createdAt: '2025-12-17T02:41:38.192Z',
      };

      return HttpResponse.json(successResponse(data), { status: 200 });
    }),

    // 세션 참가 신청
    http.post(
      p('/api/sessions/:id/join'),
      requireAuth(authMode, () => {
        const data = {
          message: '참가 신청 성공',
          currentParticipantCount: 3,
          maxParticipantCount: 10,
        };

        return HttpResponse.json(successResponse(data), { status: 200 });
      })
    ),

    // 세션 참가 취소
    http.delete(
      p('/api/sessions/:id/leave'),
      requireAuth(authMode, () => {
        const data = {
          message: '참가 취소 성공',
          currentParticipantCount: 2,
          maxParticipantCount: 10,
        };

        return HttpResponse.json(successResponse(data), { status: 200 });
      })
    ),

    // 세션 찜(좋아요) 추가
    http.post(
      p('/api/sessions/:id/like'),
      requireAuth(authMode, () => {
        const data = {
          message: '찜 등록 성공',
        };
        return HttpResponse.json(successResponse(data), { status: 200 });
      })
    ),

    // 세션 찜(좋아요) 취소
    http.delete(
      p('/api/sessions/:id/like'),
      requireAuth(authMode, () => {
        const data = {
          message: '찜 취소 성공',
        };
        return HttpResponse.json(successResponse(data), { status: 200 });
      })
    ),

    // 세션 참가자 목록 조회
    http.get(p('/api/sessions/:id/participants'), () => {
      const data = {
        participants: [
          {
            userId: 1,
            name: faker.person.fullName(),
            profileImage: faker.image.avatar(),
            role: 'LEADER',
            introduction: faker.lorem.sentence(),
            joinedAt: '2025-12-11T02:49:35.793Z',
          },
          {
            userId: 2,
            name: faker.person.fullName(),
            profileImage: faker.image.avatar(),
            role: 'STAFF',
            introduction: faker.lorem.sentence(),
            joinedAt: '2025-12-12T02:49:35.793Z',
          },
          {
            userId: 3,
            name: faker.person.fullName(),
            profileImage: faker.image.avatar(),
            role: 'MEMBER',
            introduction: faker.lorem.sentence(),
            joinedAt: '2025-12-13T02:49:35.793Z',
          },
        ],
        totalCount: 3,
      };
      return HttpResponse.json(successResponse(data), { status: 200 });
    }),

    // 세션 정보 수정
    http.put(
      p('/api/sessions/:id'),
      requireAuth(authMode, async ({ request }) => {
        const { name, description, image } =
          (await request.json()) as UpdateSessionDetailRequestBody;

        const data = {
          id: 0,
          crewId: 0,
          hostUserId: 0,
          name: name,
          description: description,
          image: image || faker.image.urlPicsumPhotos(),
          city: '서울',
          district: '영등포구',
          location: '서울특별시 영등포구 여의동로 330',
          coords: {
            lat: 37.566826,
            lng: 126.9786567,
          },
          sessionAt: '2025-12-20T02:52:24.951Z',
          registerBy: '2025-12-19T02:52:24.951Z',
          level: 'BEGINNER',
          status: 'OPEN',
          pace: 400,
          maxParticipantCount: 10,
          currentParticipantCount: 2,
          createdAt: '2025-12-17T02:52:24.951Z',
        };

        return HttpResponse.json(successResponse(data), { status: 200 });
      })
    ),
  ];
}
