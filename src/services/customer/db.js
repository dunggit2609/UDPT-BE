// const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const mongoose = require('mongoose');
const debug = require('debug')('myw-api:db');

const uri = 'mongodb+srv://thangbach:123@cluster0.msdkr.mongodb.net/Customer?retryWrites=true&w=majority';

async function connect() {
	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});

		console.log('connect customer database successfully!');
	} catch (error) {
		console.log(`connect customer database failed cause ${error}!`);
	}
}

module.exports = { connect };
