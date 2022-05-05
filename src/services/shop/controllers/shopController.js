const db = require('../db');
const ShipperModel = db.Shipper;
const jwt = require('jsonwebtoken');
var apiResponse = require('../../../helpers/apiResponse');
const cloneDeep = require('../../../utils/cloneDeep');
const { shopRepo } = require('../repopsitory/shopRepo');
const { createTestAccount } = require('nodemailer');

exports.create = [
	async function(req, res) {
		const { name, email, user_id } = req.body;
		try {
			const existedName = await shopRepo.findByName(name);
			if (existedName) {
				return apiResponse.conflictResponse(res, 'Shop name already exist');
			}

			const existedEmail = await shopRepo.findByEmail(email);
			if (existedEmail) {
				return apiResponse.conflictResponse(res, 'Shop Email already exist');
			}

			const existedUser_id = await shopRepo.findByUser_id(user_id);
			if (existedUser_id) {
				return apiResponse.conflictResponse(res, 'Shop owner already has a shop');
			}

			const shop = await shopRepo.create(req.body);
			return apiResponse.successResponseWithData(res, 'Success', shop);
		} catch (err) {
			console.log('err', err);
			return apiResponse.ErrorResponse(res, 'Cannot create shop');
		}
	}
];

exports.update = [
	async function(req, res) {
		const { _id, name, email, user_id, description, business_cert, bank_account, phone, location } = req.body;
		try {
			const shop = await shopRepo.update(req.body);
			return apiResponse.successResponseWithData(res, 'Success', shop);
		} catch (err) {
			console.log('err', err);
			return apiResponse.ErrorResponse(res, 'Cannot update shop');
		}
	}
];
