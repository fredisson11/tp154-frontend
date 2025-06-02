import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Некоректна пошта'),
  password: z
    .string()
    .min(8, 'Пароль має бути не менше 8 символів')
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Пароль має містити хоча б один спеціальний символ. Наприклад: "!,@,$,#"'
    ),
})

export const registerSchema = loginSchema.extend({
  role: z.enum(['student', 'teacher'], { required_error: 'Оберіть роль' }),
})

export const teacherProfileSchema = z.object({
  first_name: z.string().min(1, 'Імʼя обовʼязкове'),
  last_name: z.string().min(1, 'Прізвище обовʼязкове'),

  languages: z
    .array(z.string(), {
      required_error: 'Оберіть хоча б одну мову',
    })
    .min(1, 'Оберіть хоча б одну мову'),

  categories: z
    .array(z.string(), {
      required_error: 'Оберіть хоча б одну категорію',
    })
    .min(1, 'Оберіть хоча б одну категорію'),

  subjects: z
    .array(z.string(), {
      required_error: 'Оберіть хоча б один предмет',
    })
    .min(1, 'Оберіть хоча б один предмет'),

  age: z
    .string()
    .min(1, 'Вік обовʼязковий')
    .refine((val) => parseInt(val) > 0, 'Вік має бути додатнім'),

  city: z.string().min(1, 'Місто обовʼязкове'),

  // Optional
  phone: z.string().optional(),
  photo: z
    .string()
    .nullable()
    .optional()
    .refine(
      (val) => val === null || val?.startsWith('data:image/'),
      'Недійсний формат фото'
    ),

  teaching_experience: z
    .string()
    .nullable()
    .optional()
    .refine(
      (val) => val === null || (val && parseInt(val) > 0),
      'Вік має бути додатнім'
    ),

  about_me: z.string().optional(),
  hobbies: z.string().optional(),
  education: z.string().optional(),
  lesson_flow: z.string().optional(),
  lesson_price: z.string().nullable().optional(),
  telegram: z.string().optional(),
  whatsapp: z.string().optional(),
  viber: z.string().optional(),
  instagram: z.string().optional(),
})

export type TeacherProfileData = z.infer<typeof teacherProfileSchema>
export type TeacherProfileRequest = Omit<
  TeacherProfileData,
  'languages' | 'categories' | 'subjects'
> & {
  languages: number[]
  categories: number[]
  subjects: number[]
}
