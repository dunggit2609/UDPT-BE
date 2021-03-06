const Shipper = require('../models/shipper')
const { ObjectID } = require('bson');

module.exports.shipperRepo = {
    async create(newShipper) {
        try {
            const curDate = new Date()
            let shipper = new Shipper({
                full_name: newShipper.full_name,
                address: newShipper.address,
                identity: newShipper.identity,
                bank_account: newShipper.bank_account,
                work_zone: newShipper.work_zone,
                email: newShipper.email,
                phone: newShipper.phone,
                user_id: newShipper.user_id,
                working_info: [],
                checking_result: [],
                canReceiveOrder: true,
                created_at: curDate,
                updated_at: curDate,
                _id: new ObjectID()
            });
            shipper = shipper.save();
            return shipper;
        } catch (err) {
            return
        }

    },

    async findById(id) {
        return await Shipper.findOne({$or: [{ _id: id }, {user_id: id}]});
    },

    async update(id, payload) {
        let shipper = await Shipper.findOne({ _id: id })

        if (!shipper) {
            return;
        }
        const curDate = new Date()

        shipper = {
            ...shipper, ...{
                full_name: payload.full_name,
                address: payload.address,
                identity: payload.identity,
                bank_account: payload.bank_account,
                work_zone: payload.work_zone,
                email: payload.email,
                phone: payload.phone,
                updated_at: curDate
            }
        }

        shipper = await shipper.save();

        return shipper;

    },

    async updateHealthInfo(id, payload) {
        let shipper = await Shipper.findOne({ _id: id })

        if (!shipper) {
            return;
        }

        shipper.working_info.push(payload)

        let result = await Shipper.updateOne({_id: id}, shipper);
        return result;

    }

}