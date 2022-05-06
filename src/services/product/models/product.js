const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema(
	{
		_id: { type: Schema.Types.ObjectId },
		name: { type: String },
		description: { type: String },
		qty: { type: Number },
		price: { type: Number },
		unit: { type: String },
		productType: {
			type: Schema.Types.ObjectId,
			ref: 'ProductType',
			require: true
		},
		shopOwner: {
			type: Schema.Types.ObjectId,
			ref: 'Shop',
			required: true
		}
	},
	{ timestamps: true }
);

const Product = mongoose.model('Product', product, 'Product');
module.exports = Product;
