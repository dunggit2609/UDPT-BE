const db = require('../db');
const jwt = require('jsonwebtoken');
var apiResponse = require('../../../helpers/apiResponse');
const { productRepo } = require('../repopsitory/productRepo');
const { USER_ROLE_SHOP } = require('constant/user');
const { productTypeRepo } = require('../repopsitory/productTypeRepo');
const { captureRejections } = require('nodemailer/lib/xoauth2');

exports.create = async function(req, res) {
	const { name, qty, price, productType } = req.body;
	const token = req.headers['authorization'];
	const { user_id, role } = jwt.decode(token);

	let shop_id;
	let serviceEndpointTemplate = `@endpoint:@port/api/@role/find`;
	serviceEndpointTemplate = serviceEndpointTemplate.replace('@endpoint', process.env.ENDPOINT);

	switch (role) {
		case USER_ROLE_SHOP:
			const shopServiceUrl = serviceEndpointTemplate
				.replace('@port', process.env.SHOP_SERVICE_PORT)
				.replace('@role', USER_ROLE_SHOP);
			const { data } = await axios.get(shopServiceUrl, { id: user_id });
			shop_id = data.data._id;
	}

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
		const product = await productRepo.create(req.body);
		return apiResponse.successResponseWithData(res, 'Success', product);
	} catch (err) {
		console.log('err', err);
		return apiResponse.ErrorResponse(res, 'Cannot create product');
	}
};
exports.update = async function(req, res) {};
exports.delete = async function(req, res) {};
exports.getShopProduct = async function(req, res) {};
exports.getAllShopProducts = async function(req, res) {};
exports.getAllCategories = async function(req, res) {
	try {
		const productTypes = await productTypeRepo.getAllCategories();
		return apiResponse.successResponseWithData(res, 'Success', productTypes);
	} catch (err) {
		console.log('err', err);
		return apiResponse.ErrorResponse(res, 'Cannot create product');
	}
};
exports.getProductType = async function(req, res) {
	try {
		const productType = await productTypeRepo.getProductType(req.body.productTypeId);
		return apiResponse.successResponseWithData(res, 'success', productType);
	} catch (err) {
		console.log('err', err);
		return apiResponse.ErrorResponse(res, 'Cannot create product');
	}
};
