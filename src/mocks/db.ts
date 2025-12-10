import { Collection } from '@msw/data';
import z from 'zod';

/* ------------------------------------------------------------------ */
/* Schemas                                                            */
/* ------------------------------------------------------------------ */

const baseSchema = {
  createdAt: z.date(),
  updatedAt: z.date(),
};

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.email(),
  password: z.string(),
  image: z.string().nullable().optional(),
  introduction: z.string().max(500).nullable().optional(),
  city: z.string().nullable().optional(),
  pace: z.number().int().nullable().optional(),
  styles: z.array(z.string()).default([]),
  ...baseSchema,
});

const crewSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  ...baseSchema,
});

const membershipSchema = z.object({
  id: z.number(),
  get user() {
    return userSchema;
  },
  get crew() {
    return crewSchema;
  },
  role: z.enum(['LEADER', 'STAFF', 'MEMBER']),
  joinedAt: z.date(),
  ...baseSchema,
});

const sessionSchema = z.object({
  id: z.number(),
  get crew() {
    return crewSchema;
  },
  get hostUser() {
    return userSchema;
  },

  name: z.string(),
  description: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  sessionAt: z.date(),
  registerBy: z.date(),
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  status: z.enum(['OPEN', 'CLOSED']),
  pace: z.number().int().nullable().optional(),
  maxParticipantCount: z.number().int(),
  ...baseSchema,
});

const sessionLikeSchema = z.object({
  id: z.number(),
  session: z.unknown(),
  user: z.unknown(),
  likedAt: z.date(),
  ...baseSchema,
});

const sessionParticipantSchema = z.object({
  id: z.number(),
  session: z.unknown(),
  user: z.unknown(),
  joinedAt: z.date(),
  ...baseSchema,
});

const reviewSchema = z.object({
  id: z.number(),
  session: z.unknown(),
  user: z.unknown(),
  description: z.string(),
  ranks: z.number().int(),
  image: z.string().nullable().optional(),
  ...baseSchema,
});

/* ------------------------------------------------------------------ */
/* Collections                                                        */
/* ------------------------------------------------------------------ */

export const users = new Collection({ schema: userSchema });
export const crews = new Collection({ schema: crewSchema });
export const memberships = new Collection({ schema: membershipSchema });
export const sessions = new Collection({ schema: sessionSchema });
export const sessionLikes = new Collection({ schema: sessionLikeSchema });
export const sessionParticipants = new Collection({
  schema: sessionParticipantSchema,
});
export const reviews = new Collection({ schema: reviewSchema });

/* ------------------------------------------------------------------ */
/* Relations                                                          */
/* ------------------------------------------------------------------ */

memberships.defineRelations(({ one }) => ({
  user: one(users),
  crew: one(crews),
}));

sessions.defineRelations(({ one, many }) => ({
  crew: one(crews),
  hostUser: one(users, { role: 'host' }),
  likes: many(sessionLikes),
  participants: many(sessionParticipants),
  reviews: many(reviews),
}));

sessionLikes.defineRelations(({ one }) => ({
  session: one(sessions),
  user: one(users),
}));

sessionParticipants.defineRelations(({ one }) => ({
  session: one(sessions),
  user: one(users),
}));

reviews.defineRelations(({ one }) => ({
  session: one(sessions),
  user: one(users),
}));

/* ------------------------------------------------------------------ */
/* Seed function                                                      */
/* ------------------------------------------------------------------ */

export async function seedMockDb() {
  // Users
  const alice = await users.create({
    id: 1,
    name: 'Alice Kim',
    email: 'alice@example.com',
    password: 'password1!',
    image: null,
    introduction: '초보지만 러닝을 꾸준히 해보고 싶어요.',
    city: 'Seoul',
    pace: 420, // 7'00"
    styles: ['조깅', '러닝크루'],
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const bob = await users.create({
    id: 2,
    name: 'Bob Lee',
    email: 'bob@example.com',
    password: 'password2!',
    image: null,
    introduction: '10km 대회 준비 중입니다.',
    city: 'Seoul',
    pace: 330, // 5'30"
    styles: ['인터벌', '장거리'],
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const charlie = await users.create({
    id: 3,
    name: 'Charlie Park',
    email: 'charlie@example.com',
    password: 'password3!',
    image: null,
    introduction: '마라톤 서브4 목표!',
    city: 'Busan',
    pace: 360, // 6'00"
    styles: ['마라톤', '조깅'],
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Crews
  const seoulCrew = await crews.create({
    id: 1,
    name: 'Seoul Night Runners',
    description: '서울 도심 야간 러닝을 즐기는 크루입니다.',
    city: 'Seoul',
    image: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const busanCrew = await crews.create({
    id: 2,
    name: 'Busan Beach Runners',
    description: '광안리·해운대 해변 러닝 크루.',
    city: 'Busan',
    image: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Memberships
  await memberships.create({
    id: 1,
    user: alice,
    crew: seoulCrew,
    role: 'LEADER',
    joinedAt: new Date('2024-01-10T20:00:00'),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await memberships.create({
    id: 2,
    user: bob,
    crew: seoulCrew,
    role: 'MEMBER',
    joinedAt: new Date('2024-02-01T20:00:00'),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await memberships.create({
    id: 3,
    user: charlie,
    crew: busanCrew,
    role: 'LEADER',
    joinedAt: new Date('2024-03-05T19:00:00'),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Sessions
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const inThreeDays = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

  const seoulEasyRun = await sessions.create({
    id: 1,
    crew: seoulCrew,
    hostUser: alice,
    name: '한강 이지 러닝 5K',
    description: '처음 오시는 분 환영! 천천히 5km 러닝합니다.',
    image: null,
    location: '서울 여의도 한강공원',
    sessionAt: new Date(
      tomorrow.getFullYear(),
      tomorrow.getMonth(),
      tomorrow.getDate(),
      20,
      0,
      0
    ),
    registerBy: new Date(
      tomorrow.getFullYear(),
      tomorrow.getMonth(),
      tomorrow.getDate(),
      18,
      0,
      0
    ),
    level: 'BEGINNER',
    status: 'OPEN',
    pace: 420,
    maxParticipantCount: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const seoulTempoRun = await sessions.create({
    id: 2,
    crew: seoulCrew,
    hostUser: bob,
    name: '10K 템포런',
    description: '10km 템포 주간입니다. 평소 10K 가능하신 분 추천.',
    image: null,
    location: '서울 잠실종합운동장',
    sessionAt: new Date(
      inThreeDays.getFullYear(),
      inThreeDays.getMonth(),
      inThreeDays.getDate(),
      7,
      0,
      0
    ),
    registerBy: new Date(
      inThreeDays.getFullYear(),
      inThreeDays.getMonth(),
      inThreeDays.getDate(),
      6,
      0,
      0
    ),
    level: 'INTERMEDIATE',
    status: 'OPEN',
    pace: 330,
    maxParticipantCount: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const busanLongRun = await sessions.create({
    id: 3,
    crew: busanCrew,
    hostUser: charlie,
    name: '해운대–광안리 롱런 15K',
    description: '마라톤 준비를 위한 장거리 러닝입니다.',
    image: null,
    location: '부산 해운대 해수욕장',
    sessionAt: new Date('2024-09-01T06:00:00'),
    registerBy: new Date('2024-08-31T22:00:00'),
    level: 'ADVANCED',
    status: 'OPEN',
    pace: 360,
    maxParticipantCount: 20,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Participants
  await sessionParticipants.create({
    id: 1,
    session: seoulEasyRun,
    user: alice,
    joinedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await sessionParticipants.create({
    id: 2,
    session: seoulEasyRun,
    user: bob,
    joinedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await sessionParticipants.create({
    id: 3,
    session: seoulTempoRun,
    user: bob,
    joinedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await sessionParticipants.create({
    id: 4,
    session: busanLongRun,
    user: charlie,
    joinedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Likes
  await sessionLikes.create({
    id: 1,
    session: seoulEasyRun,
    user: bob,
    likedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await sessionLikes.create({
    id: 2,
    session: seoulTempoRun,
    user: alice,
    likedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Reviews
  await reviews.create({
    id: 1,
    session: seoulEasyRun,
    user: bob,
    description: '분위기 좋고 페이스 완전 편안했어요!',
    ranks: 5,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await reviews.create({
    id: 2,
    session: busanLongRun,
    user: charlie,
    description: '코스가 예쁘고 힘들지만 뿌듯했습니다.',
    ranks: 4,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}
