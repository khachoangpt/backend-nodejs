import { Schema, model } from 'mongoose'

export type ApiKey = {
	key: string
	status: boolean
	permissions: string[]
}

const DOCUMENT_NAME = 'ApiKey'
const COLLECTION_NAME = 'ApiKeys'

const apiKeySchema: Schema<ApiKey> = new Schema(
	{
		key: {
			type: Schema.Types.String,
			required: true,
			unique: true,
		},
		status: {
			type: Schema.Types.Boolean,
			default: true,
		},
		permissions: {
			type: [Schema.Types.String],
			default: [],
		},
	},
	{ timestamps: true, collection: COLLECTION_NAME },
)

export default model(DOCUMENT_NAME, apiKeySchema)
