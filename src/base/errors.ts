import { reasonPhrases } from '@/constants/reason-phrases'
import { statusCodes } from '@/constants/status-codes'

class ErrorResponse extends Error {
	constructor(message: string, status: number) {
		super(message)
		this.status = status
	}
}

class BadRequest extends ErrorResponse {
	constructor(
		message = reasonPhrases.BAD_REQUEST,
		status: number = statusCodes.BAD_REQUEST,
	) {
		super(message, status)
	}
}

class NotFound extends ErrorResponse {
	constructor(
		message = reasonPhrases.NOT_FOUND,
		status: number = statusCodes.NOT_FOUND,
	) {
		super(message, status)
	}
}

class UnAuthorized extends ErrorResponse {
	constructor(
		message = reasonPhrases.UNAUTHORIZED,
		status: number = statusCodes.UNAUTHORIZED,
	) {
		super(message, status)
	}
}

class Conflict extends ErrorResponse {
	constructor(
		message = reasonPhrases.CONFLICT,
		status: number = statusCodes.CONFLICT,
	) {
		super(message, status)
	}
}

export const Errors = { BadRequest, NotFound, UnAuthorized, Conflict }
