import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { logger } from '@/configs/logger'
import { type AwilixContainer, Lifetime, asClass } from 'awilix'

type ServiceLoaderType = {
	container: AwilixContainer
}

export const loadService = async ({
	container,
}: ServiceLoaderType): Promise<void> => {
	logger.info('Start service loader')

	const __filename = fileURLToPath(import.meta.url)
	const __dirname = path.dirname(__filename)

	container.loadModules(
		[
			[
				path.join(__dirname, '..', 'services/**/*.{ts,js}'),
				{
					register: asClass,
					lifetime: Lifetime.SINGLETON,
				},
			],
		],
		{
			formatName: 'camelCase',
			resolverOptions: {
				lifetime: Lifetime.SINGLETON,
				register: asClass,
			},
		},
	)

	logger.info('Service loader success')
}
