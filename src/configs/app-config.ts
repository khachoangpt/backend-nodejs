import { DatabaseType, NodeEnv } from '@/constants/enums'
import type { AppConfig } from '@/types/global.type'
import { isNumber } from '@/utils/is-number'
import dotenv from 'dotenv'

dotenv.config()

const defaultConfig: AppConfig = {
	port: 8000,
	dbConnection: 'mongodb://localhost:27017/backend-nodejs',
	nodeEnv: NodeEnv.DEVELOPMENT,
	dbType: DatabaseType.MONGO,
}

export const appConfig: AppConfig = {
	port: isNumber(process.env.PORT) ? process.env.PORT : defaultConfig.port,
	dbConnection: process.env.DB_CONNECTION || defaultConfig.dbConnection,
	nodeEnv: process.env.NODE_ENV,
	dbType: process.env.DB_TYPE || defaultConfig.dbType,
}
