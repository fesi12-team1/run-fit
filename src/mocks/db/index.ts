import { base, en, Faker, ko } from '@faker-js/faker';
import { Collection } from '@msw/data';
import z from 'zod';
import { SIDO_LIST, SIGUNGU_MAP } from '@/types/region';

export const faker = new Faker({
  locale: [ko, en, base],
});

/* ------------------------------------------------------------------ */
/* Schemas                                                            */
/* ------------------------------------------------------------------ */

const baseSchema = {
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
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
  userId: z.number(),
  crewId: z.number(),
  role: z.enum(['LEADER', 'STAFF', 'MEMBER']),
  joinedAt: z.iso.datetime(),
  ...baseSchema,
});

const sessionSchema = z.object({
  id: z.number(),
  crewId: z.number(),
  hostUserId: z.number(),
  name: z.string(),
  description: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  district: z.string().nullable().optional(),
  sessionAt: z.iso.datetime(),
  registerBy: z.iso.datetime(),
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  status: z.enum(['OPEN', 'CLOSED']),
  pace: z.number().int().nullable().optional(),
  maxParticipantCount: z.number().int(),
  ...baseSchema,
});

const sessionLikeSchema = z.object({
  id: z.number(),
  sessionId: z.number(),
  userId: z.number(),
  likedAt: z.iso.datetime(),
  ...baseSchema,
});

const sessionParticipantSchema = z.object({
  id: z.number(),
  sessionId: z.number(),
  userId: z.number(),
  joinedAt: z.iso.datetime(),
  ...baseSchema,
});

const reviewSchema = z.object({
  id: z.number(),
  sessionId: z.number(),
  userId: z.number(),
  description: z.string(),
  ranks: z.number().int(),
  image: z.string().nullable().optional(),
  ...baseSchema,
});

export type Session = z.infer<typeof sessionSchema>;

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
/* Seed function                                                      */
/* ------------------------------------------------------------------ */

export async function seedMockDb() {
  // Users
  const createdUsers = [];

  const admin1 = await users.create({
    id: 1,
    name: '관리자1',
    email: 'admin@example.com',
    password: 'admin1234!',
    image: null,
    introduction: null,
    city: null,
    pace: null,
    styles: [],
    createdAt: faker.date.past().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  createdUsers.push(admin1);

  const admin2 = await users.create({
    id: 2,
    name: '관리자2',
    email: 'admin2@example.com',
    password: 'admin1234!',
    image: faker.image.avatar(),
    introduction: faker.lorem.sentence(),
    city: faker.helpers.arrayElement(SIDO_LIST),
    pace: faker.number.int({ min: 300, max: 480 }),
    styles: faker.helpers.arrayElements(
      ['조깅', '러닝크루', '인터벌', '장거리', '마라톤'],
      { min: 0, max: 3 }
    ),
    createdAt: faker.date.past().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  createdUsers.push(admin2);

  for (let i = 3; i <= 30; i++) {
    const user = await users.create({
      id: i,
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      image: faker.image.avatar(),
      introduction: faker.lorem.sentence(),
      city: faker.helpers.arrayElement(SIDO_LIST),
      pace: faker.number.int({ min: 300, max: 480 }),
      styles: faker.helpers.arrayElements(
        ['조깅', '러닝크루', '인터벌', '장거리', '마라톤'],
        { min: 0, max: 3 }
      ),
      createdAt: faker.date.past().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    createdUsers.push(user);
  }

  // Crews
  const createdCrews = [];
  for (let i = 1; i <= 30; i++) {
    const crew = await crews.create({
      id: i,
      name: `${faker.company.name()}`,
      description: faker.lorem.paragraph(),
      city: faker.helpers.arrayElement(SIDO_LIST),
      image: faker.image.urlPicsumPhotos({ width: 640, height: 480 }),
      createdAt: faker.date.past().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    createdCrews.push(crew);
  }

  // Memberships
  let membershipId = 1;
  for (const crew of createdCrews) {
    // 각 크루마다 5~15명의 멤버 추가
    const memberCount = faker.number.int({ min: 5, max: 15 });
    const selectedUsers = faker.helpers.arrayElements(
      createdUsers,
      memberCount
    );

    for (let i = 0; i < selectedUsers.length; i++) {
      await memberships.create({
        id: membershipId++,
        userId: selectedUsers[i].id,
        crewId: crew.id,
        role:
          i === 0 ? 'LEADER' : faker.helpers.arrayElement(['STAFF', 'MEMBER']),
        joinedAt: faker.date.past().toISOString(),
        createdAt: faker.date.past().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  }

  // Sessions
  const createdSessions = [];
  for (let i = 1; i <= 101; i++) {
    const crew = faker.helpers.arrayElement(createdCrews);
    const hostUser = faker.helpers.arrayElement(createdUsers);

    const city = faker.helpers.arrayElement(SIDO_LIST);
    const districts = SIGUNGU_MAP[city] || [];
    const district =
      districts.length > 0 ? faker.helpers.arrayElement(districts) : null;

    const session = await sessions.create({
      id: i,
      crewId: crew.id,
      hostUserId: hostUser.id,
      name: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      image: faker.image.urlPicsumPhotos(),
      city: city,
      district: district,
      location: faker.location.streetAddress(),
      sessionAt: faker.date.future().toISOString(),
      registerBy: faker.date.soon().toISOString(),
      level: faker.helpers.arrayElement([
        'BEGINNER',
        'INTERMEDIATE',
        'ADVANCED',
      ]),
      status: faker.helpers.arrayElement(['OPEN', 'CLOSED']),
      pace: faker.number.int({ min: 300, max: 480 }),
      maxParticipantCount: faker.number.int({ min: 10, max: 30 }),
      createdAt: faker.date.past().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    createdSessions.push(session);
  }

  // Participants
  let participantId = 1;
  for (const session of createdSessions) {
    const participantCount = faker.number.int({ min: 3, max: 10 });
    const participants = faker.helpers.arrayElements(
      createdUsers,
      participantCount
    );

    for (const user of participants) {
      await sessionParticipants.create({
        id: participantId++,
        sessionId: session.id,
        userId: user.id,
        joinedAt: faker.date.recent().toISOString(),
        createdAt: faker.date.past().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  }

  // Likes
  let likeId = 1;
  for (const session of createdSessions) {
    // 각 세션마다 0~20명이 좋아요
    const likeCount = faker.number.int({ min: 0, max: 20 });
    const likedUsers = faker.helpers.arrayElements(createdUsers, likeCount);

    for (const user of likedUsers) {
      await sessionLikes.create({
        id: likeId++,
        sessionId: session.id,
        userId: user.id,
        likedAt: faker.date.recent().toISOString(),
        createdAt: faker.date.past().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  }

  // Reviews
  let reviewId = 1;
  for (const session of createdSessions) {
    // 각 세션마다 0~5개의 리뷰 (모든 세션에 리뷰가 있지는 않음)
    const reviewCount = faker.number.int({ min: 0, max: 5 });
    const reviewers = faker.helpers.arrayElements(createdUsers, reviewCount);

    for (const user of reviewers) {
      await reviews.create({
        id: reviewId++,
        sessionId: session.id,
        userId: user.id,
        description: faker.lorem.paragraph(),
        ranks: faker.number.int({ min: 1, max: 5 }),
        image: faker.helpers.maybe(() => faker.image.urlPicsumPhotos(), {
          probability: 0.3,
        }),
        createdAt: faker.date.past().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  }
}
