import crypto from 'node:crypto'

export const generateKeyPair = async () => {
	const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
		modulusLength: 4096,
		publicKeyEncoding: {
			type: 'pkcs1',
			format: 'pem',
		},
		privateKeyEncoding: {
			type: 'pkcs1',
			format: 'pem',
		},
	})

	return { publicKey, privateKey }
}
