import { appConfig } from '@/configs/app-config'
import { createContainer } from 'awilix'
import type { Express, NextFunction, Request, Response } from 'express'
import { loadDatabase } from './database.loader'
import { loadRoute } from './route.loader'
import { loadService } from './service.loader'

type LoaderType = {
	app: Express
}

const loader = async ({ app }: LoaderType): Promise<void> => {
	const { dbType } = appConfig
	const container = createContainer()

	// Add the registered services to the request scope
	app.use((req: Request, _res: Response, next: NextFunction) => {
		req.scope = container.createScope()
		next()
	})

	await loadDatabase({ dbType })
	await loadRoute({ app })
	await loadService({ container })
}

export { loader }
