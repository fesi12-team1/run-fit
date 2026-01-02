import { base, en, Faker, ko } from '@faker-js/faker';
import z from 'zod';
import { SIDO_LIST, SIGUNGU_MAP } from '@/types/region';

const SEED_NUMBER = 1234;

export const faker = new Faker({
  locale: [ko, en, base],
});

faker.seed(SEED_NUMBER);

/* ------------------------------------------------------------------ */
/* Schemas                                                            */
/* ------------------------------------------------------------------ */

const baseSchema = {
  createdAt: z.iso.datetime(),
};

const _userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.email(),
  image: z.string().nullable().optional(),
  introduction: z.string().max(500).nullable().optional(),
  city: z.string().nullable().optional(),
  pace: z.number().int().nullable().optional(),
  styles: z.array(z.string()).default([]),
  ...baseSchema,
});

const _crewSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  ...baseSchema,
});

const _membershipSchema = z.object({
  id: z.number(),
  userId: z.number(),
  crewId: z.number(),
  role: z.enum(['LEADER', 'STAFF', 'MEMBER']),
  joinedAt: z.iso.datetime(),
  ...baseSchema,
});

const _sessionSchema = z.object({
  id: z.number(),
  crewId: z.number(),
  hostUserId: z.number(),
  name: z.string(),
  description: z.string(),
  image: z.string().nullable().optional(),
  location: z.string(),
  city: z.string(),
  district: z.string(),
  coords: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  sessionAt: z.iso.datetime(),
  registerBy: z.iso.datetime(),
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  status: z.enum(['OPEN', 'CLOSED']),
  pace: z.number().int().nullable(),
  maxParticipantCount: z.number().int(),
  ...baseSchema,
});

const _sessionLikeSchema = z.object({
  id: z.number(),
  sessionId: z.number(),
  userId: z.number(),
  likedAt: z.iso.datetime(),
  ...baseSchema,
});

const _sessionParticipantSchema = z.object({
  id: z.number(),
  sessionId: z.number(),
  userId: z.number(),
  joinedAt: z.iso.datetime(),
  ...baseSchema,
});

const _reviewSchema = z.object({
  id: z.number(),
  sessionId: z.number(),
  userId: z.number(),
  description: z.string(),
  ranks: z.number().int(),
  image: z.string().nullable().optional(),
  ...baseSchema,
});

const mockUser1 = {
  id: 1,
  name: '홍길동',
  email: 'admin@example.com',
  image: null,
  introduction: null,
  city: null,
  pace: null,
  styles: [],
  createdAt: faker.date.past().toISOString(),
  updatedAt: new Date().toISOString(),
};

const mockUser2 = {
  id: 2,
  name: '관리자2',
  email: 'admin2@example.com',
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
};

type User = z.infer<typeof _userSchema>;
export const users: User[] = [
  mockUser1,
  mockUser2,
  ...Array.from({ length: 28 }, (_, i) => ({
    id: i + 3,
    name: faker.person.fullName(),
    email: `user${i + 3}@example.com`,
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
  })),
];

type Crew = z.infer<typeof _crewSchema>;
export const crews: Crew[] = Array.from({ length: 95 }, (_, i) => ({
  id: i + 1,
  name: `${faker.company.name()}`,
  description: faker.lorem.paragraph(),
  city: faker.helpers.arrayElement(SIDO_LIST),
  image: faker.image.urlPicsumPhotos({ width: 640, height: 480 }),
  createdAt: faker.date.past().toISOString(),
  updatedAt: new Date().toISOString(),
}));

type Session = z.infer<typeof _sessionSchema>;
export const sessions: Session[] = [
  // Scenario 1: both soon for sessionAt and registerBy
  ...Array.from({ length: 100 }, (_, i) => {
    const city = faker.helpers.arrayElement(SIDO_LIST);
    const districts = SIGUNGU_MAP[city] || [];
    const district = faker.helpers.arrayElement(districts);
    const status = 'OPEN' as const;

    const sessionAt = faker.date.soon({ days: 10 });
    const registerBy = faker.date.soon({ days: 5, refDate: new Date() });

    // Ensure registerBy is always earlier than sessionAt
    const finalRegisterBy =
      registerBy >= sessionAt
        ? new Date(sessionAt.getTime() - 24 * 60 * 60 * 1000)
        : registerBy;

    return {
      id: i + 1,
      crewId: faker.number.int({ min: 1, max: crews.length }),
      hostUserId: faker.number.int({ min: 1, max: users.length }),
      name: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      image: faker.image.urlPicsumPhotos({ width: 640, height: 480 }),
      city: city,
      district: district,
      location: faker.location.streetAddress(),
      coords: {
        lat: faker.location.latitude(),
        lng: faker.location.longitude(),
      },
      sessionAt: sessionAt.toISOString(),
      registerBy: finalRegisterBy.toISOString(),
      level: faker.helpers.arrayElement([
        'BEGINNER',
        'INTERMEDIATE',
        'ADVANCED',
      ]),
      status: status,
      pace: faker.number.int({ min: 300, max: 480 }),
      maxParticipantCount: faker.number.int({ min: 10, max: 30 }),
      createdAt: faker.date.past().toISOString(),
    };
  }),
  // Scenario 2: soon for sessionAt, recent for registerBy
  ...Array.from({ length: 100 }, (_, i) => {
    const city = faker.helpers.arrayElement(SIDO_LIST);
    const districts = SIGUNGU_MAP[city] || [];
    const district = faker.helpers.arrayElement(districts);
    const status = 'CLOSED' as const;

    const sessionAt = faker.date.soon();
    const registerBy = faker.date.recent();

    return {
      id: i + 101,
      crewId: faker.number.int({ min: 1, max: crews.length }),
      hostUserId: faker.number.int({ min: 1, max: users.length }),
      name: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      image: faker.image.urlPicsumPhotos({ width: 640, height: 480 }),
      city: city,
      district: district,
      location: faker.location.streetAddress(),
      coords: {
        lat: faker.location.latitude(),
        lng: faker.location.longitude(),
      },
      sessionAt: sessionAt.toISOString(),
      registerBy: registerBy.toISOString(),
      level: faker.helpers.arrayElement([
        'BEGINNER',
        'INTERMEDIATE',
        'ADVANCED',
      ]),
      status: status,
      pace: faker.number.int({ min: 300, max: 480 }),
      maxParticipantCount: faker.number.int({ min: 10, max: 30 }),
      createdAt: faker.date.past().toISOString(),
    };
  }),
  // Scenario 3: both recent for sessionAt and registerBy
  ...Array.from({ length: 100 }, (_, i) => {
    const city = faker.helpers.arrayElement(SIDO_LIST);
    const districts = SIGUNGU_MAP[city] || [];
    const district = faker.helpers.arrayElement(districts);
    const status = 'CLOSED' as const;

    const sessionAt = faker.date.recent();
    const registerBy = faker.date.recent();

    // Ensure registerBy is always earlier than sessionAt
    const finalRegisterBy =
      registerBy >= sessionAt
        ? new Date(sessionAt.getTime() - 24 * 60 * 60 * 1000)
        : registerBy;

    return {
      id: i + 201,
      crewId: faker.number.int({ min: 1, max: crews.length }),
      hostUserId: faker.number.int({ min: 1, max: users.length }),
      name: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      image: faker.image.urlPicsumPhotos({ width: 640, height: 480 }),
      city: city,
      district: district,
      location: faker.location.streetAddress(),
      coords: {
        lat: faker.location.latitude(),
        lng: faker.location.longitude(),
      },
      sessionAt: sessionAt.toISOString(),
      registerBy: finalRegisterBy.toISOString(),
      level: faker.helpers.arrayElement([
        'BEGINNER',
        'INTERMEDIATE',
        'ADVANCED',
      ]),
      status: status,
      pace: faker.number.int({ min: 300, max: 480 }),
      maxParticipantCount: faker.number.int({ min: 10, max: 30 }),
      createdAt: faker.date.past().toISOString(),
    };
  }),
];

type Review = z.infer<typeof _reviewSchema>;
export const reviews: Review[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  sessionId: faker.number.int({ min: 1, max: sessions.length }),
  userId: faker.number.int({ min: 1, max: users.length }),
  description: faker.lorem.paragraph(),
  ranks: faker.number.int({ min: 1, max: 5 }),
  image: faker.datatype.boolean()
    ? faker.image.urlPicsumPhotos({ width: 640, height: 480 })
    : null,
  createdAt: faker.date.past().toISOString(),
}));

type Membership = z.infer<typeof _membershipSchema>;
export const memberships: Membership[] = [];

type SessionParticipant = z.infer<typeof _sessionParticipantSchema>;
export const sessionParticipants: SessionParticipant[] = [];

type SessionLike = z.infer<typeof _sessionLikeSchema>;
export const sessionLikes: SessionLike[] = [];
