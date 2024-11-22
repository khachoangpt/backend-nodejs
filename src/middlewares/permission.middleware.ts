import { Errors } from '@/base/errors'
import type { NextFunction, Request, Response } from 'express'

export const permissionMiddleware = (
	permissions: string[],
): ((req: Request, _: Response, next: NextFunction) => void) => {
	return (req: Request, _: Response, next: NextFunction): void => {
		const apiKey = req.apiKey

		if (!apiKey) {
			throw new Errors.UnAuthorized('API key not found')
		}

		const validPermission = permissions.every((permission) =>
			apiKey.permissions.includes(permission),
		)

		if (!validPermission) {
			throw new Errors.UnAuthorized('API key does not have permission')
		}

		next()
	}
}
