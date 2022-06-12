const OrderStatusSchema = require('../models/orderStatus');

module.exports.OrderStatusRepo = {
	async create(newOrderStatus) {
		try {
			let orderStatus = new OrderStatusSchema({
				OrderId: newOrderStatus.OrderId,
				description: newOrderStatus.description,
				statusName: newOrderStatus.statusName
			});
			orderStatus = orderStatus.save();
			return orderStatus;
		} catch (err) {
			console.log(err);
		}
	},

	async getOrderStatusById(orderId) {
		try {
			return await OrderStatusSchema.find({ OrderId: orderId });
		} catch (err) {
			console.log(err);
		}
	}
};
