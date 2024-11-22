import { reasonPhrases } from '@/constants/reason-phrases'
import { statusCodes } from '@/constants/status-codes'
import type { Response } from 'express'

type SuccessResponseType<T> = {
	message: string
	code: number
	reason?: string
	data: T
}

class SuccessResponse<T> {
	private message: string
	private code: number
	private reason?: string
	private data: T

	constructor({ message, code, reason, data }: SuccessResponseType<T>) {
		this.message = message
		this.code = code
		this.reason = reason
		this.data = data
	}

	send(res: Response, headers?: Record<string, string>) {
		if (headers) {
			res.set(headers)
		}

		return res.status(this.code).json(this)
	}
}

class OK<T> extends SuccessResponse<T> {
	constructor({
		code = statusCodes.OK,
		data,
		message,
		reason = reasonPhrases.OK,
	}: SuccessResponseType<T>) {
		super({
			message: message || reason,
			code,
			data,
			reason,
		})
	}
}

export { OK }
