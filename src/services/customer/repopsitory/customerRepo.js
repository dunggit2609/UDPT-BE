const customerSchema = require('../models/customer')
const { ObjectID } = require('bson');

module.exports.customerRepo = {
    async create(newCustomer) {
        try {
            const curDate = new Date()
            let customer = new customerSchema({
                full_name: newCustomer.full_name,
                address: newCustomer.address,
                identity: newCustomer.identity,
                bank_account: newCustomer.bank_account,
                area_zone: newCustomer.area_zone,
                email: newCustomer.email,
                phone: newCustomer.phone,
                user_id: newCustomer.user_id,
                created_at: curDate,
                updated_at: curDate,
                _id: new ObjectID()
            });
            customer = customer.save();
            return customer;
        } catch (err) {
            return
        }

    },

    async findById(id) {
        return await customerSchema.findOne({ _id: id });
    },

    async update(id, payload) {
        let customer = customerSchema.findOne({ _id: id })

        if (!customer) {
            return;
        }
        const curDate = new Date()

        customer = {
            ...customer, ...{
                full_name: payload.fullName,
                address: payload.address,
                identity: payload.identity,
                bank_account: payload.bankAccount,
                area_zone: payload.areaZone,
                email: payload.email,
                phone: payload.phone,
                updated_at: curDate
            }
        }

        customer = await customer.save();

        return customer;

    }

}