import { Schema, type Types, model } from 'mongoose'

const DOCUMENT_NAME = 'Token'
const COLLECTION_NAME = 'Tokens'

export type Token = {
	shop: Types.ObjectId
	refreshToken: string
	publicKey: string
}

const tokenSchema: Schema<Token> = new Schema(
	{
		shop: {
			type: Schema.Types.ObjectId,
			ref: 'Shop',
			required: true,
		},
		refreshToken: {
			type: Schema.Types.String,
			required: true,
			unique: true,
		},
		publicKey: {
			type: Schema.Types.String,
			required: true,
		},
	},
	{ timestamps: true, collection: COLLECTION_NAME },
)

export default model(DOCUMENT_NAME, tokenSchema)
