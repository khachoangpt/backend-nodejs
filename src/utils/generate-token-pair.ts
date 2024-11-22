import jwt from 'jsonwebtoken'

export const generateTokenPair = async ({
	payload,
	secretKey,
}: {
	payload: Record<string, unknown>
	secretKey: string
}) => {
	const accessToken = jwt.sign(payload, secretKey, {
		algorithm: 'RS256',
		expiresIn: '15m',
	})
	const refreshToken = jwt.sign(payload, secretKey, {
		algorithm: 'RS256',
		expiresIn: '1d',
	})

	return { accessToken, refreshToken }
}
