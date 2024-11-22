import type { Token } from '@/models/token.model'
import tokenModel from '@/models/token.model'

export default class TokenService {
	static resolutionKey = 'tokenService'

	async createToken({ shop, publicKey, refreshToken }: Token) {
		const token = await tokenModel.create({
			shop,
			publicKey,
			refreshToken,
		})

		return token
	}
}
