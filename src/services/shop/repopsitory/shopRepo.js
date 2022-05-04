const shopSchema = require('../models/shop')
const { ObjectID } = require('bson');

module.exports.shopRepo = {
    async create(newShop) {
        try {
            const curDate = new Date()
            let shop = new shopSchema({
                name: newShop.name,
                description: newShop.description,
                business_cert: newShop.business_cert,
                bank_account: newShop.bank_account,
                email: newShop.email,
                phone: newShop.phone,
                user_id: newShop.user_id,
                location: newShop.location,
                review: [],
                created_at: curDate,
                updated_at: curDate,
                _id: new ObjectID()
            });
            shop = shop.save();
            return shop;
        } catch (err) {
            return
        }

    },

    async findById(id) {
        return await shopSchema.findOne({ _id: id });
    },

    async update(id, payload) {
        let shop = shopSchema.findOne({ _id: id })

        if (!shop) {
            return;
        }
        const curDate = new Date()

        shop = {
            ...shop, ...{
                name: newShop.name,
                description: newShop.description,
                business_cert: newShop.business_cert,
                bank_account: newShop.bank_account,
                email: newShop.email,
                phone: newShop.phone,
                user_id: newShop.user_id,
                location: newShop.location,
                review: [],
                updated_at: curDate
            }
        }

        shop = await shop.save();

        return shop;

    }

}