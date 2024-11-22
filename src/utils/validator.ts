import { Errors } from '@/base/errors'
import { z } from 'zod'

export const validator = async <T>(
	schema:
		| z.AnyZodObject
		| z.ZodOptional<z.AnyZodObject>
		| z.ZodEffects<z.AnyZodObject>,
	requestBody: unknown,
): Promise<T> => {
	try {
		const parseData = (await schema.parseAsync(requestBody)) as T
		return parseData
	} catch (error) {
		let res = error
		if (error instanceof z.ZodError) {
			res = error.issues.map((e) => ({ path: e.path[0], message: e.message }))
		}
		throw new Errors.BadRequest(JSON.stringify(res))
	}
}
