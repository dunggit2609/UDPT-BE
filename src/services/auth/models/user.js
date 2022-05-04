
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema(
    {
        _id: { type: Schema.Types.ObjectId },
        username: { type: String },
        password: { type: String },
        email: { type: String },
        phone: { type: String },
        role: { type: String },
        status: {
            type: String
        }
    },
    { timestamps: true },
);

const User = mongoose.model('User', user, 'User');
module.exports = User;