const db = require('../db');
var apiResponse = require('../../../helpers/apiResponse');
const { productRepo } = require('../repopsitory/productRepo');
exports.create = async function(req, res) {
	const { name, qty, price, productType } = req.body;
	try {
		const existedName = await productRepo.findByName(name);
		if (existedName) {
			return apiResponse.conflictResponse(res, 'Product name already exist');
		}
		if (qty < 0) {
			return apiResponse.conflictResponse(res, 'Quantity error');
		}
		if (price < 0) {
			return apiResponse.conflictResponse(res, 'Price error');
		}
	} catch (err) {
		console.log('err', err);
		return apiResponse.ErrorResponse(res, 'Cannot create product');
	}
};
exports.update = async function(req, res) {};
exports.delete = async function(req, res) {};
exports.getShopProduct = async function(req, res) {};
exports.getAllShopProducts = async function(req, res) {};
