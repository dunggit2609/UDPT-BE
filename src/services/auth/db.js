// const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const mongoose = require('mongoose');
const debug = require('debug')('myw-api:db');

const uri = "mongodb+srv://admin1:123@cluster0.msdkr.mongodb.net/Auth?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function connect() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('connect auth database successfully!')
    } catch (error) {
        console.log(`connect auth database failed cause ${error}!`)

    }
}

module.exports = { connect };
