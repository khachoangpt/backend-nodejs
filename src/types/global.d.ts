import type { ApiKey } from '@/models/apiKey.model'
import type { AwilixContainer } from 'awilix'

declare global {
	namespace Express {
		interface Request {
			scope: AwilixContainer
			apiKey: ApiKey
		}
	}

	namespace NodeJS {
		interface ProcessEnv {
			PORT: number
			DB_CONNECTION: string
			DB_TYPE: DatabaseType
			NODE_ENV: NodeEnv
		}
	}

	interface Error {
		status: number
	}
}
