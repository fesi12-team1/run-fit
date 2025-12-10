import { http, HttpResponse } from 'msw';
import { crews, sessions, users } from '../db';
import { path } from '../utils';

export const sessionHandlers = [
  // 세션 생성
  http.post(path('/api/sessions'), async ({ request }) => {
    const headers = request.headers;
    const authHeader = headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const userId = authHeader.replace('Bearer ', '');

    const user = users.findFirst((q) => q.where({ id: Number(userId) }));

    if (!user) {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const body = (await request.json()) as {
      crewId: number;
      name: string;
      description: string;
      image: string | null;
      location: string;
      sessionAt: string;
      registerBy: string;
      level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
      maxParticipantCount: number;
      pace: number;
    };

    const crew = crews.findFirst((q) => q.where({ id: body.crewId }));

    if (!crew) {
      return HttpResponse.json({ message: 'Crew not found' }, { status: 404 });
    }

    const newSession = await sessions.create({
      id: 12,
      crew: crew,
      hostUser: user,
      name: body.name,
      description: body.description,
      image: body.image,
      location: body.location,
      sessionAt: body.sessionAt,
      registerBy: body.registerBy,
      level: body.level,
      status: 'OPEN',
      pace: body.pace,
      maxParticipantCount: body.maxParticipantCount,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const responseBody = {
      id: newSession.id,
      crewId: newSession.crew.id,
      hostUserId: newSession.hostUser.id,
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

    return HttpResponse.json(responseBody, { status: 201 });
  }),

  // 세션 목록 조회
  http.get(path('/api/sessions'), () => {
    const allSessions = sessions.all();

    const responseBody = allSessions.map((session) => ({
      id: session.id,
      crewId: session.crew.id,
      hostUserId: session.hostUser.id,
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
    }));

    return HttpResponse.json(responseBody, { status: 201 });
  }),

  // 세션 상세 조회
  http.get(path('/api/sessions/:id'), ({ params }) => {
    const sessionId = Number(params.id);
    const session = sessions.findFirst((q) => q.where({ id: sessionId }));

    if (!session) {
      return HttpResponse.json(
        { message: 'Session not found' },
        { status: 404 }
      );
    }
    const responseBody = {
      id: session.id,
      crewId: session.crew.id,
      hostUserId: session.hostUser.id,
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

    return HttpResponse.json(responseBody, { status: 200 });
  }),

  // 세션 참가 신청
  http.post(path('/api/sessions/:id/join'), ({ params }) => {
    const sessionId = Number(params.id);
    const session = sessions.findFirst((q) => q.where({ id: sessionId }));

    if (!session) {
      return HttpResponse.json(
        { message: 'Session not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json(
      { message: `Successfully joined session with ID: ${sessionId}` },
      { status: 200 }
    );
  }),

  // 세션 참가 취소
  http.delete(path('/api/sessions/:id/leave'), ({ params }) => {
    const sessionId = Number(params.id);
    const session = sessions.findFirst((q) => q.where({ id: sessionId }));

    if (!session) {
      return HttpResponse.json(
        { message: 'Session not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json(
      { message: `Successfully left session with ID: ${sessionId}` },
      { status: 200 }
    );
  }),

  // 세션 찜(좋아요) 추가
  http.post(path('/api/sessions/:id/like'), ({ params }) => {
    const sessionId = Number(params.id);
    const session = sessions.findFirst((q) => q.where({ id: sessionId }));

    if (!session) {
      return HttpResponse.json(
        { message: 'Session not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json(
      { message: `Successfully liked session with ID: ${sessionId}` },
      { status: 200 }
    );
  }),

  // 세션 찜(좋아요) 취소
  http.delete(path('/api/sessions/:id/unlike'), ({ params }) => {
    const sessionId = Number(params.id);
    const session = sessions.findFirst((q) => q.where({ id: sessionId }));

    if (!session) {
      return HttpResponse.json(
        { message: 'Session not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json(
      { message: `Successfully unliked session with ID: ${sessionId}` },
      { status: 200 }
    );
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

    // For simplicity, returning an empty list
    return HttpResponse.json({ participants: [] }, { status: 200 });
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
      crewId: updatedSession!.crew.id,
      hostUserId: updatedSession!.hostUser.id,
      name: updatedSession!.name,
      description: updatedSession!.description,
      image: updatedSession!.image,
    };

    return HttpResponse.json(responseBody, { status: 200 });
  }),
];
