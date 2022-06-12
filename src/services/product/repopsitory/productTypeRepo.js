const productTypeSchema = require('../models/productType');
const { ObjectID } = require('bson');

module.exports.productTypeRepo = {
	async create(newProductType) {
		try {
			let productType = new productTypeSchema(productType);
		} catch (err) {
			return;
		}
	},
	async getAllCategories() {
		return await productTypeSchema.find({});
	},

	async getProductType(id) {
		return await productTypeSchema.find({ _id: id });
	}
};
