const userSchema = require('../models/user')
const { ObjectID } = require('bson');
const { USER_STATUS_NEW } = require('../../../constant/user');

module.exports.userRepo = {
    async create(newUser) {
        try {
            const curDate = new Date()
            let user = new userSchema({
                email: newUser.email,
                phone: newUser.phone,
                password: newUser.password,
                status: USER_STATUS_NEW,
                username: newUser.username,
                role: newUser.role,
                created_at: curDate,
                updated_at: curDate,
                _id: new ObjectID()
            });
            user = user.save();
            return user;
        } catch (err) {
            return
        }

    },

    async findById(id) {
        return await userSchema.findOne({ _id: id });
    },

    async findByEmail(email) {
        return await userSchema.findOne({ email: email });
    },

    async findByUsername(username) {
        try {
            return await userSchema.findOne({ username: username });

        } catch (ex) {
            console.log("error-userRepo", ex)
        }
    },

    async update(id, payload) {
        let user = userSchema.findOne({ _id: id })

        if (!user) {
            return;
        }
        const curDate = new Date()

        user = {
            ...user, ...{
                email: newUser.email,
                phone: newUser.phone,
                password: newUser.password,
                status: newUser.status,
                role: newUser.role,
                updated_at: curDate
            }
        }

        user = await user.save();

        return user;

    }

}