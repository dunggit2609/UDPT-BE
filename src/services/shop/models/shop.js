
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shop = new Schema(
    {
        _id: { type: Schema.Types.ObjectId },
        name: { type: String },
        description: { type: String },
        business_cert: { type: String },
        bank_account: { type: String },
        work_zone: { type: String },
        email: { type: String },
        phone: { type: String },
        review: {type: Array},
        location: {type: Object},
        user_id: { type: Schema.Types.ObjectId },
        created_at: { type: Date },
        updated_at: { type: Date },
    },
    { timestamps: true },
);

const Shop = mongoose.model('Shop', shop, 'Shop');
module.exports = Shop;