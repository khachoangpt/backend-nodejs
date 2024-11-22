import signupController from '@/controllers/auth/signup/signup.controller'
import { asyncHandler } from '@/utils/async-handler'
import express, { type Router } from 'express'

export default async (app: Router): Promise<Router> => {
	const router = express.Router()

	app.use('/shop', router)

	router.post('/signup', asyncHandler(signupController))

	return router
}
