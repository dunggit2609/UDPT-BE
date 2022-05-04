// const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const mongoose = require('mongoose');
const debug = require('debug')('myw-api:db');

const uri = 'mongodb+srv://thangbach:123@cluster0.msdkr.mongodb.net/Order?retryWrites=true&w=majority';

async function connect() {
	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});

		console.log('connect Order database successfully!');
	} catch (error) {
		console.log(`connect Order database failed cause ${error}!`);
	}
}

module.exports = { connect };
