import { http, HttpResponse } from 'msw';
import {
  crews,
  memberships,
  Session,
  sessionLikes,
  sessionParticipants,
  sessions,
  users,
} from '../db';
import {
  errorResponse,
  getAuthenticatedUser,
  path,
  successResponse,
} from '../utils';

// 세션 생성용 타입 (crew, hostUser, id, status 제외)
export type CreateSessionInput = Pick<
  Session,
  | 'name'
  | 'description'
  | 'image'
  | 'location'
  | 'sessionAt'
  | 'registerBy'
  | 'level'
  | 'pace'
  | 'maxParticipantCount'
> & {
  crewId: number;
};

export const sessionHandlers = [
  // 세션 생성
  http.post(path('/api/sessions'), async ({ request }) => {
    const user = getAuthenticatedUser(request);

    if (!user) {
      return HttpResponse.json(
        errorResponse({ code: 'UNAUTHORIZED', message: 'Unauthorized' }),
        { status: 401 }
      );
    }

    const reqBody = (await request.json()) as CreateSessionInput;

    const crew = crews.findFirst((q) => q.where({ id: reqBody.crewId }));

    if (!crew) {
      return HttpResponse.json(
        errorResponse({ code: 'NOT_FOUND', message: 'Crew not found' }),
        { status: 404 }
      );
    }

    const newSession = await sessions.create({
      id: 12,
      crewId: crew.id,
      hostUserId: user.id,
      name: reqBody.name,
      description: reqBody.description,
      image: reqBody.image,
      location: reqBody.location,
      sessionAt: reqBody.sessionAt,
      registerBy: reqBody.registerBy,
      level: reqBody.level,
      status: 'OPEN',
      pace: reqBody.pace,
      maxParticipantCount: reqBody.maxParticipantCount,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const data = {
      id: newSession.id,
      crewId: newSession.crewId,
      hostUserId: newSession.hostUserId,
      name: newSession.name,
      description: newSession.description,
      image: newSession.image,
      location: newSession.location,
      sessionAt: newSession.sessionAt,
      registerBy: newSession.registerBy,
      level: newSession.level,
      status: newSession.status,
      pace: newSession.pace,
      maxParticipantCount: newSession.maxParticipantCount,
      currentParticipantCount: 0,
      createdAt: newSession.createdAt,
      updatedAt: newSession.updatedAt,
    };

    return HttpResponse.json(successResponse(data), { status: 201 });
  }),

  // 세션 목록 조회
  http.get(path('/api/sessions'), ({ request }) => {
    const user = getAuthenticatedUser(request);
    const isLoggedIn = !!user;
    const url = new URL(request.url);

    const city = url.searchParams.get('city');
    const crewId = url.searchParams.get('crewId');
    const level = url.searchParams.get('level');
    const date = url.searchParams.get('date'); // 2025-12-01~2025-12-08
    const time = url.searchParams.get('time'); // 12:00~14:30
    const sort = url.searchParams.get('sort') || 'recent'; // recent, sessionAt, registerBy
    const page = parseInt(url.searchParams.get('page') || '0', 10);
    const size = parseInt(url.searchParams.get('size') || '10', 10);

    let filteredSessions = sessions.all();

    if (city) {
      filteredSessions = filteredSessions.filter((s) => {
        const crew = crews.findFirst((q) => q.where({ id: s.crewId }));
        return crew?.city === city;
      });
    }

    if (crewId) {
      filteredSessions = filteredSessions.filter(
        (s) => s.crewId === parseInt(crewId, 10)
      );
    }

    if (level) {
      filteredSessions = filteredSessions.filter((s) => s.level === level);
    }

    if (date) {
      // date: YYYY-MM-DD~YYYY-MM-DD 형식 (범위)
      const [startDate, endDate] = date.split('~');
      if (startDate && endDate) {
        filteredSessions = filteredSessions.filter((s) => {
          const sessionDate = s.sessionAt.split('T')[0];
          return sessionDate >= startDate && sessionDate <= endDate;
        });
      }
    }

    if (time) {
      // time: HH:MM~HH:MM 형식 (범위, 예: 12:00~14:30)
      const [startTime, endTime] = time.split('~');
      if (startTime && endTime) {
        filteredSessions = filteredSessions.filter((s) => {
          const sessionTime = s.sessionAt.split('T')[1]?.substring(0, 5);
          return (
            sessionTime && sessionTime >= startTime && sessionTime <= endTime
          );
        });
      }
    }

    // 정렬
    if (sort === 'recent') {
      // 최근 생성순 (createdAt 내림차순)
      filteredSessions.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sort === 'sessionAt') {
      // 모임 시작일순 (sessionAt 오름차순)
      filteredSessions.sort(
        (a, b) =>
          new Date(a.sessionAt).getTime() - new Date(b.sessionAt).getTime()
      );
    } else if (sort === 'registerBy') {
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

    const data = paginatedSessions.map((session) => ({
      id: session.id,
      crewId: session.crewId,
      hostUserId: session.hostUserId,
      name: session.name,
      description: session.description,
      image: session.image,
      location: session.location,
      sessionAt: session.sessionAt,
      registerBy: session.registerBy,
      level: session.level,
      status: session.status,
      pace: session.pace,
      maxParticipantCount: session.maxParticipantCount,
      currentParticipantCount: 0,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
      liked:
        isLoggedIn &&
        (sessionLikes.findFirst((q) =>
          q.where({ sessionId: session.id, userId: user.id })
        )
          ? true
          : false),
    }));

    return HttpResponse.json(
      successResponse({
        data: data,
        hasNext: hasNext,
      }),
      { status: 201 }
    );
  }),

  // 세션 상세 조회
  http.get(path('/api/sessions/:id'), ({ params }) => {
    const sessionId = Number(params.id);
    const session = sessions.findFirst((q) => q.where({ id: sessionId }));

    if (!session) {
      return HttpResponse.json(
        errorResponse({ code: 'NOT_FOUND', message: 'Session not found' }),
        { status: 404 }
      );
    }

    const data = {
      id: session.id,
      crewId: session.crewId,
      hostUserId: session.hostUserId,
      name: session.name,
      description: session.description,
      image: session.image,
      location: session.location,
      sessionAt: session.sessionAt,
      registerBy: session.registerBy,
      level: session.level,
      status: session.status,
      pace: session.pace,
      maxParticipantCount: session.maxParticipantCount,
      currentParticipantCount: 0,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
    };

    return HttpResponse.json(successResponse(data), { status: 200 });
  }),

  // 세션 참가 신청
  http.post(path('/api/sessions/:id/join'), async ({ request, params }) => {
    const user = getAuthenticatedUser(request);

    if (!user) {
      return HttpResponse.json(
        errorResponse({ code: 'UNAUTHORIZED', message: 'Unauthorized' }),
        { status: 401 }
      );
    }

    const sessionId = Number(params.id);
    const session = sessions.findFirst((q) => q.where({ id: sessionId }));

    if (!session) {
      return HttpResponse.json(
        errorResponse({ code: 'NOT_FOUND', message: 'Session not found' }),
        { status: 404 }
      );
    }

    const participants = sessionParticipants.findMany((q) =>
      q.where({ sessionId })
    );

    if (participants.length >= session.maxParticipantCount) {
      return HttpResponse.json(
        errorResponse({ code: 'SESSION_FULL', message: 'Session is full' }),
        { status: 400 }
      );
    }

    // 참가 신청
    await sessionParticipants.create({
      id: sessionParticipants.count() + 1,
      sessionId: session.id,
      userId: user.id,
      joinedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const data = {
      message: '세션에 참가 신청이 완료되었습니다.',
      currentParticipantCount: participants.length + 1,
      maxParticipantCount: session.maxParticipantCount,
    };

    return HttpResponse.json(successResponse(data), { status: 200 });
  }),

  // 세션 참가 취소
  http.delete(path('/api/sessions/:id/leave'), ({ request, params }) => {
    const user = getAuthenticatedUser(request);

    if (!user) {
      return HttpResponse.json(
        errorResponse({ code: 'UNAUTHORIZED', message: 'Unauthorized' }),
        { status: 401 }
      );
    }

    const sessionId = Number(params.id);
    const session = sessions.findFirst((q) => q.where({ id: sessionId }));

    if (!session) {
      return HttpResponse.json(
        errorResponse({ code: 'NOT_FOUND', message: 'Session not found' }),
        { status: 404 }
      );
    }

    sessionParticipants.delete((q) => q.where({ sessionId: session.id }));

    const sessionParticipantsLength = sessionParticipants.findMany((q) =>
      q.where({ sessionId: session.id })
    ).length;

    const data = {
      message: '세션 참여가 취소되었습니다.',
      currentParticipantCount: sessionParticipantsLength,
    };

    return HttpResponse.json(successResponse(data), { status: 200 });
  }),

  // 세션 찜(좋아요) 추가
  http.post(path('/api/sessions/:id/like'), async ({ request, params }) => {
    const user = getAuthenticatedUser(request);

    if (!user) {
      return HttpResponse.json(
        errorResponse({ code: 'UNAUTHORIZED', message: 'Unauthorized' }),
        { status: 401 }
      );
    }
    const sessionId = Number(params.id);
    const session = sessions.findFirst((q) => q.where({ id: sessionId }));

    if (!session) {
      return HttpResponse.json(
        errorResponse({ code: 'NOT_FOUND', message: 'Session not found' }),
        { status: 404 }
      );
    }

    try {
      await sessionLikes.create({
        id: sessionLikes.count() + 1,
        sessionId: session.id,
        userId: user.id,
        likedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } catch {
      return HttpResponse.json(
        errorResponse({
          code: 'ALREADY_LIKED',
          message: 'Session already liked',
        }),
        { status: 400 }
      );
    }

    const data = {
      message: '세션을 찜 목록에 추가했습니다.',
    };

    return HttpResponse.json(successResponse(data), { status: 200 });
  }),

  // 세션 찜(좋아요) 취소
  http.delete(path('/api/sessions/:id/like'), ({ request, params }) => {
    const user = getAuthenticatedUser(request);

    if (!user) {
      return HttpResponse.json(
        errorResponse({ code: 'UNAUTHORIZED', message: 'Unauthorized' }),
        { status: 401 }
      );
    }

    const sessionId = Number(params.id);
    const session = sessions.findFirst((q) => q.where({ id: sessionId }));

    if (!session) {
      return HttpResponse.json(
        errorResponse({ code: 'NOT_FOUND', message: 'Session not found' }),
        { status: 404 }
      );
    }

    sessionLikes.delete((q) =>
      q.where({ sessionId: session.id, userId: user.id })
    );

    const data = {
      message: '세션 찜을 취소했습니다.',
    };

    return HttpResponse.json(successResponse(data), { status: 200 });
  }),

  // 세션 참가자 목록 조회
  http.get(path('/api/sessions/:id/participants'), ({ params }) => {
    const sessionId = Number(params.id);
    const session = sessions.findFirst((q) => q.where({ id: sessionId }));

    if (!session) {
      return HttpResponse.json(
        { message: 'Session not found' },
        { status: 404 }
      );
    }

    const participants = sessionParticipants.findMany((q) =>
      q.where({ sessionId })
    );

    participants.sort((a, b) => {
      return new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime();
    });

    participants.map((participant) => {
      const user = users.findFirst((q) => q.where({ id: participant.userId }));
      const role = memberships.findFirst((q) =>
        q.where({ crewId: session.crewId, userId: participant.userId })
      )?.role;

      return {
        userId: participant.userId,
        name: user?.name,
        image: user?.image || null,
        role: role,
        joinedAt: participant.joinedAt,
      };
    });

    const data = {
      participants: participants,
      totalCount: participants.length,
    };

    return HttpResponse.json(successResponse(data), { status: 200 });
  }),

  // 세션 정보 수정
  http.put(path('/api/sessions/:id'), async ({ request, params }) => {
    const sessionId = Number(params.id);
    const session = sessions.findFirst((q) => q.where({ id: sessionId }));

    if (!session) {
      return HttpResponse.json(
        { message: 'Session not found' },
        { status: 404 }
      );
    }

    const body = (await request.json()) as {
      name?: string;
      description?: string;
      image?: string | null;
      location?: string;
      sessionAt?: string;
      registerBy?: string;
      level?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
      status?: 'OPEN' | 'CLOSED';
      pace?: number;
      maxParticipantCount?: number;
    };

    sessions.update((q) => q.where({ id: sessionId }), {
      data(session) {
        if (body.name !== undefined) session.name = body.name;
        if (body.description !== undefined)
          session.description = body.description;
        if (body.image !== undefined) session.image = body.image;
        if (body.location !== undefined) session.location = body.location;
        if (body.sessionAt !== undefined) session.sessionAt = body.sessionAt;
        if (body.registerBy !== undefined) session.registerBy = body.registerBy;
        if (body.level !== undefined) session.level = body.level;
        if (body.status !== undefined) session.status = body.status;
        if (body.pace !== undefined) session.pace = body.pace;
        if (body.maxParticipantCount !== undefined)
          session.maxParticipantCount = body.maxParticipantCount;
        session.updatedAt = new Date().toISOString();
      },
    });

    const updatedSession = sessions.findFirst((q) =>
      q.where({ id: sessionId })
    );

    const responseBody = {
      id: updatedSession!.id,
      crewId: updatedSession!.crewId,
      hostUserId: updatedSession!.hostUserId,
      name: updatedSession!.name,
      description: updatedSession!.description,
      image: updatedSession!.image,
    };

    return HttpResponse.json(responseBody, { status: 200 });
  }),

  // 세션 리뷰 목록 조회
  http.get(path('/api/sessions/:id/reviews'), ({ params }) => {
    const sessionId = Number(params.id);
    const session = sessions.findFirst((q) => q.where({ id: sessionId }));

    if (!session) {
      return HttpResponse.json(
        { message: 'Session not found' },
        { status: 404 }
      );
    }

    // For simplicity, returning an empty list
    return HttpResponse.json({ reviews: [] }, { status: 200 });
  }),

  // 세션 리뷰 작성
  http.post(path('/api/sessions/:id/reviews'), ({ params }) => {
    const sessionId = Number(params.id);
    const session = sessions.findFirst((q) => q.where({ id: sessionId }));

    if (!session) {
      return HttpResponse.json(
        { message: 'Session not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json(
      { message: `Successfully created review for session ID: ${sessionId}` },
      { status: 201 }
    );
  }),
];
