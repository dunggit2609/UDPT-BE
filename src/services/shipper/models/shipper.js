
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shipper = new Schema(
    {
        _id: { type: Schema.Types.ObjectId },
        full_name: { type: String },
        address: { type: String },
        identity: { type: String },
        bank_account: { type: String },
        work_zone: { type: String },
        email: { type: String },
        phone: { type: String },
        user_id: { type: Schema.Types.ObjectId },
        created_at: { type: Date },
        updated_at: { type: Date },
        register_at: { type: Date },
        working_info: {type: Array},
        checking_result: { type: Array },
        canReceiveOrder: {type: Boolean}
    },
    { timestamps: true },
);

const Shipper = mongoose.model('Shipper', shipper, 'Shipper');
module.exports = Shipper;