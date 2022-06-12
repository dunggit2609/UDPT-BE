const db = require('../db');
const CustomerModel = db.Customer;
const jwt = require('jsonwebtoken');
var apiResponse = require('../../../helpers/apiResponse');
const cloneDeep = require('../../../utils/cloneDeep');
const auth = require('../../../middlewares/jwt');
const { customerRepo } = require('../repopsitory/customerRepo');

exports.create = [
	async function(req, res) {
		try {
			const customer = await customerRepo.create(req.body);
			return apiResponse.successResponseWithData(res, 'Success', customer);
		} catch (err) {
			return apiResponse.ErrorResponse(res, 'Cannot create user');
		}
	}
];

exports.find = [
	async function(req, res) {
		try {
			const customer = await customerRepo.findById(req.body.id);
			return apiResponse.successResponseWithData(res, 'success', customer);
		} catch (err) {
			return apiResponse.ErrorResponse(res, 'Cannot find user');
		}
	}
];
