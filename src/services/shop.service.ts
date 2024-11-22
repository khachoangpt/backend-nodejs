import shopModel, { type Shop } from '@/models/shop.model'
import type { FilterQuery, ProjectionType, Require_id, Types } from 'mongoose'

export default class ShopService {
	static resolutionKey = 'shopService'

	async findOne(
		filter: FilterQuery<Shop>,
		projection?: ProjectionType<Shop>,
	): Promise<Require_id<Shop> | null> {
		const shop = await shopModel.findOne(filter, projection).lean()

		return shop
	}

	async findById(id: Types.ObjectId): Promise<Require_id<Shop> | null> {
		const shop = await shopModel.findById(id).lean()

		return shop
	}

	async createShop(createShopPayload: Shop): Promise<Require_id<Shop>> {
		const shop = await shopModel.create(createShopPayload)
		return shop
	}

	async verifyShop() {}
}
