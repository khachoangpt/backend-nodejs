import apiKeyModel, { type ApiKey } from '@/models/apiKey.model'
import type { Require_id } from 'mongoose'

export default class ApiKeyService {
	static resolutionKey = 'apiKeyService'

	async findByKey(key: string): Promise<Require_id<ApiKey> | null> {
		return await apiKeyModel.findOne({ key }).lean()
	}
}
