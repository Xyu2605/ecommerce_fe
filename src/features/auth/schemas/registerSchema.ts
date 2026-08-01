import { z } from 'zod'

export const registerSchema = z.object({
    firstName: z.string().min(1, 'Vui lòng nhập họ !'),
    lastName: z.string().min(1, 'Vui lòng nhập tên !'),
    email: z.string().email('Email không hợp lệ !'),
    password: z.string().min(8, 'Mật khẩu tối thiểu 8 kí tự !'),
    confirmPassword: z.string()
}).refine(
    (data) => data.password === data.confirmPassword,
    {
        message: 'Mật khẩu không khớp !',
        path: ['confirmPassword']  //lỗi hiện ở field confirmPassword
    }
)

export type RegisterForm = z.infer<typeof registerSchema>