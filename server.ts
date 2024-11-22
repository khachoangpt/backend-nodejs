import type { Server } from 'node:http'
import { app } from '@/app'
import { appConfig } from '@/configs/app-config'
import { logger } from '@/configs/logger'
import { loader } from '@/loaders'

const bootstrap = async (): Promise<void> => {
	const { port } = appConfig

	await loader({ app })

	const server: Server = app.listen(port, () => {
		logger.info(`Server running on port ${port}`)
	})

	process.on('SIGINT', () => {
		if (!server.listening) return

		server.close(() => {
			logger.warn('Server stopped')
		})
	})
}

bootstrap()
