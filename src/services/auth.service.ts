import { Errors } from '@/base/errors'
import type { LoginPayload } from '@/controllers/auth/login/login.dto'
import type { SignupPayload } from '@/controllers/auth/signup/signup.dto'
import type { Shop } from '@/models/shop.model'
import { generateKeyPair } from '@/utils/generate-key-pair'
import { generateTokenPair } from '@/utils/generate-token-pair'
import bcrypt from 'bcrypt'
import _ from 'lodash'
import type ShopService from './shop.service'
import type TokenService from './token.service'

type InjectableDependencies = {
	tokenService: TokenService
	shopService: ShopService
}

export default class AuthService {
	static resolutionKey = 'authService'
	private readonly tokenService: TokenService
	private readonly shopService: ShopService

	constructor(container: InjectableDependencies) {
		this.tokenService = container.tokenService
		this.shopService = container.shopService
	}

	async signup(signUpPayload: SignupPayload): Promise<{
		shop: Partial<Shop>
		accessToken: string
		refreshToken: string
	}> {
		const { name, email, password } = signUpPayload
		const shopFound = await this.shopService.findOne({ email })

		if (shopFound) {
			throw new Errors.Conflict('Shop already exists')
		}

		const passwordHash = await bcrypt.hash(password, 10)
		const shop = await this.shopService.createShop({
			name,
			email,
			password: passwordHash,
		})

		if (!shop) {
			throw new Errors.BadRequest('Shop could not be created')
		}

		const { publicKey, privateKey } = await generateKeyPair()
		const { accessToken, refreshToken } = await generateTokenPair({
			secretKey: privateKey,
			payload: {
				shopId: shop._id,
			},
		})
		await this.tokenService.createToken({
			shop: shop._id,
			publicKey,
			refreshToken,
		})

		return {
			shop: _.pick<Shop>(shop, ['_id', 'email', 'name']),
			accessToken,
			refreshToken,
		}
	}

	async login({ email, password }: LoginPayload) {
		const shopFound = await this.shopService.findOne(
			{ email },
			{ password: true, verify: true },
		)

		if (!shopFound) {
			throw new Errors.NotFound('Shop not found')
		}

		if (!shopFound.verify) {
			throw new Errors.UnAuthorized('Shop not verified')
		}

		const passwordMatch = await bcrypt.compare(
			password,
			shopFound.password as string,
		)

		if (!passwordMatch) {
			throw new Errors.UnAuthorized('Invalid credentials')
		}

		const { publicKey, privateKey } = await generateKeyPair()
		const { accessToken, refreshToken } = await generateTokenPair({
			secretKey: privateKey,
			payload: {
				shopId: shopFound._id,
			},
		})
		await this.tokenService.createToken({
			shop: shopFound._id,
			refreshToken,
			publicKey,
		})

		const shop = await this.shopService.findById(shopFound._id)

		return {
			shop,
			accessToken,
			refreshToken,
		}
	}
}
