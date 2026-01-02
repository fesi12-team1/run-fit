import z from 'zod';

export const crewFormSchema = z.object({
  name: z
    .string()
    .min(1, '크루 이름을 입력해주세요.')
    .min(2, '크루 이름은 최소 2자 이상이어야 합니다.'),

  description: z
    .string()
    .min(1, '크루 소개를 입력해주세요.')
    .min(2, '크루 소개는 최소 2자 이상이어야 합니다.')
    .max(300, '크루 소개는 300자 이하로 작성해주세요.'),

  city: z.string().min(1, '활동 지역을 선택해주세요.'),

  image: z.union([z.instanceof(File), z.string()]).optional(),
});

export type CrewFormValues = z.infer<typeof crewFormSchema>;
