const QUERY_KEY = {
  crews: 'crews',
  sessions: 'sessions',
  members: 'members',
};

export const QUERY_KEYS = {
  crews: {
    all: [QUERY_KEY.crews], // get /crews & post /crews (invalidate)
    byId: (crewId: number) => [QUERY_KEY.crews, crewId], // get /crews/:crewId
    sessions: {
      all: (crewId: number) => [QUERY_KEY.crews, crewId, QUERY_KEY.sessions], // get /crews/sessions
      byId: (crewId: number, sessionId: number) => [
        QUERY_KEY.crews,
        crewId,
        QUERY_KEY.sessions,
        sessionId,
      ],
    },
    members: {
      leader: (crewId: number) => [
        QUERY_KEY.crews,
        crewId,
        QUERY_KEY.members,
        'leader',
      ],
      staff: (crewId: number) => [
        QUERY_KEY.crews,
        crewId,
        QUERY_KEY.members,
        'staff',
      ],
      general: (crewId: number) => [
        QUERY_KEY.crews,
        crewId,
        QUERY_KEY.members,
        'general',
      ],
    },
  },
  sessions: {
    all: [QUERY_KEY.sessions], // get /sessions & post, delete /sessions (invalidate)
    byId: (sessionId: number) => [QUERY_KEY.sessions, sessionId],
    participants: (sessionId: number) => [
      QUERY_KEY.sessions,
      sessionId,
      'participants',
    ],
  },
};
