const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productType = new Schema(
	{
		_id: { type: Schema.Types.ObjectId },
		name: { type: String }
	},
	{ timestamps: true }
);

const ProductType = mongoose.model('ProductType', productType, 'ProductType');
module.exports = ProductType;
