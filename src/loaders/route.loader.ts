import { logger } from '@/configs/logger'
import routes from '@/routes'
import type { Express } from 'express'

type RouteLoaderType = {
	app: Express
}

export const loadRoute = async ({ app }: RouteLoaderType): Promise<void> => {
	logger.info('Start route loader')

	app.use(routes(app))

	logger.info('Route loader success')
}
