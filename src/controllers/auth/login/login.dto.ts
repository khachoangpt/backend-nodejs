import { z } from 'zod'

export const loginPayloadSchema = z.object({
	email: z.string({ required_error: 'Email is required' }).email(),
	password: z
		.string({ required_error: 'Password is required' })
		.min(1, 'Password is required')
		.max(26, 'Password is too long'),
})

export type LoginPayload = z.infer<typeof loginPayloadSchema>
