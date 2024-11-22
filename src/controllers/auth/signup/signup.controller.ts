import AuthService from '@/services/auth.service'
import { validator } from '@/utils/validator'
import type { Request, Response } from 'express'
import { type SignupPayload, signupPayloadSchema } from './signup.dto'

export default async (req: Request, res: Response) => {
	const authService: AuthService = req.scope.resolve(AuthService.resolutionKey)
	const validated = await validator<SignupPayload>(
		signupPayloadSchema,
		req.body,
	)
	const response = await authService.signup(validated)

	res.status(200).json(response)
}
