const Order = require('../models/order');
const { ObjectID } = require('bson');
const { getWithFilters } = require('../controllers/orderController');
const getPagination = require('../../../helpers/pagination');
const getPagingData = require('../../../helpers/pagingData');

module.exports.orderRepo = {
	async create(newOrder) {
		try {
			const curDate = new Date();
			let order = new Order({
				payment: newOrder.payment,
				review: [],
				customer_id: newOrder.customer_id,
				shipper_id: newOrder.shipper_id,
				total_cost: newOrder.total_cost,
				total_product: newOrder.total_product,
				status: 0,
				note: newOrder.note,
				product: newOrder.product,
				created_at: curDate,
				updated_at: curDate,
				_id: new ObjectID()
			});
			order = order.save();
			return order;
		} catch (err) {
			return;
		}
	},

	async findById(id) {
		return await Order.findOne({ _id: id });
	},

	async update(id, payload) {
		let order = Order.findOne({ _id: id });

		if (!order) {
			return;
		}

		order = {
			...order,
			...payload,
			updated_at: curDate
		};

		order = await order.save();

		return order;
	},

	async updateStatus(id, status) {
		let order = await Order.findOne({ _id: id });
		if (!order) {
			return;
		}

		// order = {...order, status: status}
		order.status = status;
		let result = await Order.updateOne({ _id: id }, order);
		return result;
	},

	async getWithFilters(filters) {
		const { page, size, shipper_id } = filters;
		const { limit, offset } = getPagination(page, size);

		const orders = await Order.find({ shipper_id: shipper_id });
		return { ...getPagingData(orders, limit, offset), page };
	}
};
