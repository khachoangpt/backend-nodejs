import { ShopStatus } from '@/constants/enums'
import { Schema, model } from 'mongoose'

const DOCUMENT_NAME = 'Shop'
const COLLECTION_NAME = 'Shops'

export type Shop = {
	name: string
	email: string
	password: string
	status?: ShopStatus
	verify?: boolean
	roles?: string[]
}

const shopSchema: Schema<Shop> = new Schema(
	{
		name: {
			type: Schema.Types.String,
			trim: true,
			maxLength: 150,
		},
		email: {
			type: Schema.Types.String,
			unique: true,
			trim: true,
			required: true,
		},
		password: {
			type: Schema.Types.String,
			required: true,
			trim: true,
			select: false,
		},
		status: {
			type: Schema.Types.String,
			enum: [ShopStatus.ACTIVE, ShopStatus.INACTIVE],
			default: ShopStatus.INACTIVE,
		},
		verify: {
			type: Schema.Types.Boolean,
			default: false,
		},
		roles: {
			type: [Schema.Types.String],
			default: [],
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

export default model(DOCUMENT_NAME, shopSchema)
