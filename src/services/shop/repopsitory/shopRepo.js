const shopSchema = require('../models/shop');
const { ObjectID } = require('bson');

module.exports.shopRepo = {
	async create(newShop) {
		try {
			const curDate = new Date();
			let shop = new shopSchema({
				name: newShop.name,
				description: newShop.description,
				business_cert: newShop.business_cert,
				bank_account: newShop.bank_account,
				email: newShop.email,
				phone: newShop.phone,
				user_id: newShop.user_id,
				location: newShop.location,
				review: [],
				//created_at: curDate,
				//updated_at: curDate,
				_id: new ObjectID()
			});
			shop = shop.save();
			return shop;
		} catch (err) {
			return;
		}
	},

	async findById(id) {
		return await shopSchema.findOne({ _id: id });
	},

	async update(newShop) {
		let shop = await shopSchema.findOne({ _id: newShop._id }).lean();
		console.log(shop);
		let updateShop = {
			...shop,
			...newShop
		};

		let result = await shopSchema.findOneAndUpdate({ _id: newShop._id }, updateShop);

		return result;
	},

	async findByName(name) {
		return await shopSchema.findOne({ name: name });
	},

	async findByEmail(email) {
		return await shopSchema.findOne({ email: email });
	},

	async findByUser_id(user_id) {
		return await shopSchema.findOne({ user_id: user_id });
	}
};
