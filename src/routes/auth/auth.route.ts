import loginController from '@/controllers/auth/login/login.controller'
import signupController from '@/controllers/auth/signup/signup.controller'
import { asyncHandler } from '@/utils/async-handler'
import express, { type Router } from 'express'

export default async (app: Router): Promise<Router> => {
	const router = express.Router()

	app.use('/auth', router)

	router.post('/signup', asyncHandler(signupController))

	router.post('/login', asyncHandler(loginController))

	return router
}
