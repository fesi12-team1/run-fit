import { z } from 'zod';
import { SIDO_LIST, SIGUNGU_MAP } from '@/types/region';

// 빈 문자열 허용 후 검증 (폼 초기값 대응)
const requiredEnum = <T extends readonly [string, ...string[]]>(
  values: T,
  message: string
) =>
  z
    .enum(['', ...values] as [string, ...string[]])
    .refine((val) => val !== '', { message });

export const citySchema = requiredEnum(SIDO_LIST, '시/도를 선택해주세요');
export type City = z.infer<typeof citySchema>; // == Sido

// 중복 제거 및 정렬
const ALL_SIGUNGU = [...new Set(Object.values(SIGUNGU_MAP).flat())].sort() as [
  string,
  ...string[],
];

export const districtSchema = requiredEnum(ALL_SIGUNGU, '구/군을 선택해주세요');
export type District = z.infer<typeof districtSchema>;

export const LEVELS = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] as const;
export type Level = (typeof LEVELS)[number];
export const levelSchema = z.enum(LEVELS);

// 한국 좌표 범위 검증
const koreanCoordsSchema = z.object({
  lat: z.number().min(33).max(43, '유효한 위도를 입력해주세요'),
  lng: z.number().min(124).max(132, '유효한 경도를 입력해주세요'),
});

// 재사용 가능한 날짜 스키마
const dateStringSchema = z.string().refine((val) => !isNaN(Date.parse(val)), {
  message: '유효한 날짜를 입력해주세요',
});

export const formSchema = z
  .object({
    crewId: z.number().int(),
    name: z
      .string()
      .min(1, '세션 이름을 입력해주세요')
      .max(50, '세션 이름은 최대 50자입니다'),
    description: z
      .string()
      .min(1, '세션 설명을 입력해주세요')
      .max(500, '세션 설명은 최대 500자입니다'),
    image: z
      .url('유효한 이미지 URL을 입력해주세요')
      .min(1, '이미지를 업로드해주세요'),
    location: z.string().min(1, '주소를 입력해주세요'),
    district: districtSchema,
    city: citySchema,
    coords: koreanCoordsSchema,
    sessionAt: dateStringSchema,
    registerBy: dateStringSchema,
    level: levelSchema,
    maxParticipantCount: z
      .number()
      .int('정수를 입력해주세요')
      .min(1, '최소 1명 이상의 참가자가 필요합니다')
      .optional()
      .refine((val) => val !== undefined, {
        message: '모집 정원을 입력해주세요',
      }),
    pace: z.number().int().min(1, '유효한 페이스를 입력해주세요'),
  })
  .refine((data) => new Date(data.sessionAt) > new Date(), {
    message: '세션 시작일은 현재 시간 이후여야 합니다',
    path: ['sessionAt'],
  })
  .refine((data) => new Date(data.registerBy) < new Date(data.sessionAt), {
    message: '신청 마감일은 세션 시작일보다 이전이어야 합니다',
    path: ['registerBy'],
  });

export type SessionCreateFormValues = z.infer<typeof formSchema>;
