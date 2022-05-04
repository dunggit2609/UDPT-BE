
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customer = new Schema(
    {
        _id: { type: Schema.Types.ObjectId },
        full_name: { type: String },
        address: { type: String },
        identity: { type: String },
        bank_account: { type: String },
        area_zone: { type: String },
        email: { type: String },
        phone: { type: String },
        user_id: { type: Schema.Types.ObjectId },
        created_at: { type: Date },
        updated_at: { type: Date }
    },
    { timestamps: true },
);

const Customer = mongoose.model('Customer', customer, 'Customer');
module.exports = Customer;