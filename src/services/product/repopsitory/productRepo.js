const productSchema = require('../models/product');
const { ObjectID } = require('bson');
const { shopRepo } = require('services/shop/repopsitory/shopRepo');

module.exports.productRepo = {
	async create(newProduct) {
		try {
			let product = new productSchema(newProduct);
			product = product.save();
			return product;
		} catch (err) {
			return;
		}
	},

	async update(upProduct) {
		try {
		} catch (error) {}
	},

	async findByName(name) {
		return await productSchema.findOne({ name: name });
	},

	async findById(id) {
		return await productSchema.findOne({ _id: id });
	}
};
