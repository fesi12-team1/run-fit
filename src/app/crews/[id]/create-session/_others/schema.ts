import { z } from 'zod';
import { SIDO_LIST, SIGUNGU_MAP } from '@/types/region';

const requiredEnum = <T extends readonly [string, ...string[]]>(
  values: T,
  message: string
) =>
  z.union([z.literal(''), z.enum(values)]).superRefine((val, ctx) => {
    if (val === '') {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message });
    }
  });
export const citySchema = requiredEnum(SIDO_LIST, '시/도를 선택해주세요');
export type City = z.infer<typeof citySchema>; // == Sido

const ALL_SIGUNGU = Array.from(new Set(Object.values(SIGUNGU_MAP).flat())) as [
  string,
  ...string[],
];

export const districtSchema = requiredEnum(ALL_SIGUNGU, '구/군을 선택해주세요');
export type District = z.infer<typeof districtSchema>;

export const LEVELS = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] as const;

export type Level = (typeof LEVELS)[number];

export const levelSchema = z.enum(LEVELS);

export const formSchema = z.object({
  crewId: z.number().int(),
  name: z
    .string()
    .min(1, '세션 이름을 입력해주세요')
    .max(50, '세션 이름은 최대 50자입니다'),
  description: z
    .string()
    .min(1, '세션 설명을 입력해주세요')
    .max(500, '세션 설명은 최대 500자입니다'),
  image: z.url('유효한 이미지 URL을 입력해주세요'),
  location: z.string().min(1, '주소를 입력해주세요'),
  district: districtSchema,
  city: citySchema,
  coords: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
  }),
  sessionAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: '유효한 날짜를 입력해주세요',
  }),
  registerBy: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: '유효한 날짜를 입력해주세요',
  }),
  level: levelSchema,
  maxParticipantCount: z
    .number()
    .int()
    .min(1, '최소 1명 이상의 참가자가 필요합니다'),
  pace: z.number().int().min(1, '유효한 페이스를 입력해주세요'),
});

export type SessionCreateFormValues = z.infer<typeof formSchema>;
