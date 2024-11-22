import { Errors } from '@/base/errors'
import { Header } from '@/constants/enums'
import ApiKeyService from '@/services/apiKey.service'
import type { NextFunction, Request, Response } from 'express'

export const apiKeyMiddleware = async (
	req: Request,
	_: Response,
	next: NextFunction,
): Promise<void> => {
	const apiKeyService: ApiKeyService = req.scope.resolve(
		ApiKeyService.resolutionKey,
	)
	const apiKey = req.headers[Header.API_KEY]

	if (!apiKey) {
		throw new Errors.UnAuthorized(`${Header.API_KEY} not found`)
	}

	if (typeof apiKey !== 'string') {
		throw new Errors.BadRequest(`${Header.API_KEY} must be a string`)
	}

	const apiKeyFound = await apiKeyService.findByKey(apiKey)

	if (!apiKeyFound) {
		throw new Errors.UnAuthorized('Invalid API key')
	}

	req.apiKey = apiKeyFound

	next()
}
