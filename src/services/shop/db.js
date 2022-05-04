// const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const mongoose = require('mongoose');
const debug = require('debug')('myw-api:db');

const uri = "mongodb+srv://admin1:123@cluster0.msdkr.mongodb.net/Shop?retryWrites=true&w=majority";



async function connect() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('connect Shop database successfully!')
    } catch (error) {
        console.log(`connect Shop database failed cause ${error}!`)

    }
}

module.exports = { connect };
