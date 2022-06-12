const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderStatus = new Schema(
	{
		_id: { type: Schema.Types.ObjectId },
		OrderId: {
			type: Schema.Types.ObjectId,
			ref: 'order',
			require: true
		},
		description: { type: String },
		statusName: { type: String },
		created_at: { type: Date },
		updated_at: { type: Date }
	},
	{ timestamps: true }
);

const OrderStatus = mongoose.model('OrderStatus', orderStatus, 'OrderStatus');
module.exports = Order;
