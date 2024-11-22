import 'winston-daily-rotate-file'

import chalk from 'chalk'
import winston, { type Logger } from 'winston'

export const logger: Logger = winston.createLogger({
	transports: [
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.prettyPrint(),
				winston.format.printf((info) => {
					switch (info.level) {
						case 'info':
							return `[${chalk.green(info.level.toUpperCase())}] ${info.timestamp} :: ${chalk.green(info.message)}`
						case 'warn':
							return `[${chalk.yellow(info.level.toUpperCase())}] ${info.timestamp} :: ${chalk.yellow(info.message)}`
						case 'error':
							return `[${chalk.red(info.level.toUpperCase())}] ${info.timestamp} :: ${chalk.red(info.message)}`
						default:
							return `[${chalk.green(info.level.toUpperCase())}] ${info.timestamp} :: ${info.message}`
					}
				}),
			),
		}),
		new winston.transports.DailyRotateFile({
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.prettyPrint(),
				winston.format.printf((info) => {
					return `[${info.level.toUpperCase()}] ${info.timestamp} :: ${info.message}`
				}),
			),
			filename: 'logs/logger-%DATE%.log',
			datePattern: 'YYYY-MM-DD-HH',
			zippedArchive: true,
			maxSize: '5m',
		}),
	],
})
