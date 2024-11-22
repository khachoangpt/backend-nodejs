import AuthService from '@/services/auth.service'
import { validator } from '@/utils/validator'
import type { Request, Response } from 'express'
import { type LoginPayload, loginPayloadSchema } from './login.dto'

export default async (req: Request, res: Response): Promise<void> => {
	const authService: AuthService = req.scope.resolve(AuthService.resolutionKey)
	const validated = await validator<LoginPayload>(loginPayloadSchema, req.body)
	const response = await authService.login(validated)

	res.status(200).json(response)
}
