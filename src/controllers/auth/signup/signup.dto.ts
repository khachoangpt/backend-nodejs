import z from 'zod'

export const signupPayloadSchema = z.object({
	name: z
		.string({ required_error: 'Shop name is required' })
		.min(1, 'Shop name is required'),
	email: z.string({ required_error: 'Email is required' }).email(),
	password: z
		.string({ required_error: 'Password is required' })
		.min(1, 'Password is required')
		.max(26, 'Password is too long'),
})

export type SignupPayload = z.infer<typeof signupPayloadSchema>
