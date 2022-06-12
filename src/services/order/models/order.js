const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const order = new Schema(
	{
		_id: { type: Schema.Types.ObjectId },
		payment: { type: Object },
		review: { type: Array },
		customer_id: { type: Schema.Types.ObjectId },
		shipper_id: { type: Schema.Types.ObjectId },
		total_cost: { type: Number },
		total_product: { type: Number },
		status: { type: String },
		note: { type: Array },
		product: { type: Array },
		created_at: { type: Date },
		updated_at: { type: Date }
	},
	{ timestamps: true }
);

const Order = mongoose.model('Order', order, 'Order');
module.exports = Order;
