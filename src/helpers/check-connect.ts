import os from 'node:os'
import process from 'node:process'
import { logger } from '@/configs/logger'
import mongoose from 'mongoose'

const MINI_SECONDS = 5000

const countConnection = (): void => {
	const numberOfConnections = mongoose.connections.length
	logger.info(`Number of connections: ${numberOfConnections}`)
}

const checkOverload = (): void => {
	setInterval(() => {
		const numberOfConnections = mongoose.connections.length
		const numCores = os.cpus().length
		const usedMemory = process.memoryUsage().rss
		const maxConnections = numCores * 5

		logger.info(`Number of connections: ${numberOfConnections}`)
		logger.info(`Used memory: ${usedMemory / 1024 / 1024} MB`)
		logger.info(`Max connections: ${maxConnections}`)

		if (numberOfConnections > maxConnections) {
			logger.error('Overload detected')
		}
	}, MINI_SECONDS)
}

export { countConnection, checkOverload }
