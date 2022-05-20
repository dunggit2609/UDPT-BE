const orderSchema = require('../models/order')
const { ObjectID } = require('bson');

module.exports.orderRepo = {
    async create(newOrder) {
        try {
            const curDate = new Date()
            let order = new orderSchema({
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
            return
        }

    },

    async findById(id) {
        return await orderSchema.findOne({ _id: id });
    },

    async update(id, payload) {
        let order = orderSchema.findOne({ _id: id })

        if (!order) {
            return;
        }
        const curDate = new Date()

        order = {
            ...order, ...payload,
            updated_at: curDate
        }

        order = await order.save();

        return order;

    },

    async updateStatus(id, status) {
        let order = orderSchema.findOne({ _id: id })

        if (!order) {
            return;
        }
        const curDate = new Date()

        order = {...order, status: status}

        order = await order.save();

        return order;

    }


}