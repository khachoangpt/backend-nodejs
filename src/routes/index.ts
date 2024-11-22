import { ApiKeyPermission } from '@/constants/enums'
import { apiKeyMiddleware } from '@/middlewares/apiKey.middleware'
import { permissionMiddleware } from '@/middlewares/permission.middleware'
import { asyncHandler } from '@/utils/async-handler'
import { handleError } from '@/utils/handle-error'
import express, { type Router, type Express } from 'express'
import authRoute from './auth/auth.route'

export default (app: Express): Router => {
	const router = express.Router()
	app.use('/v1/api', router)

	// API key
	router.use(asyncHandler(apiKeyMiddleware))
	// Permission
	router.use(permissionMiddleware([ApiKeyPermission.READ]))

	authRoute(router)

	app.use(handleError)

	return router
}
