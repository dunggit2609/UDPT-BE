const db = require('../db');
const axios = require("axios");
const jwt = require('jsonwebtoken')
const { check, validationResult, sanitize } = require('express-validator/check');
var bcrypt = require('bcrypt')
var apiResponse = require('../../../helpers/apiResponse')
var { access_token_secret, access_token_life } = require('../../../configs/authConfig');
const { userRepo } = require('../repopsitory/userRepo');
const { hash } = require('../../../helpers/hash');
const { USER_ROLE_CUSTOMER, USER_ROLE_SHIPPER, USER_ROLE_SHOP } = require('../../../constant/user');

exports.signUp = async function (req, res) {

	const { username, password, email, phone, role, full_name,
		address,
		identity,
		bank_account,
		area_zone,
		work_zone,
		name,
		location,
		business_cert,
		description
	} = req.body
	try {

		const existedUsername = await userRepo.findByUsername(username);
		if (existedUsername) {
			return apiResponse.conflictResponse(res, "Username is already exist")
		}

		const existedEmail = await userRepo.findByEmail(email)

		if (existedEmail) {
			return apiResponse.conflictResponse(res, "Email is already exist")
		}

		let newUser = {
			username: username,
			password: password,
			mail: email,
			phone_number: phone,
			role: role
		}

		const hashData = await hash.hash(password, 10)
		const user = await userRepo.create({ ...newUser, ...{ password: hashData } })

		if (!user) {
			return apiResponse.ErrorResponse(res, 'Create failed!')
		}

		let serviceEndpointTemplate = `@endpoint:@port/api/@role/create`
		serviceEndpointTemplate = serviceEndpointTemplate.replace('@endpoint', process.env.ENDPOINT)

		switch (user.role) {
			case USER_ROLE_CUSTOMER:
				const newCustomer = {
					full_name,
					address,
					identity,
					bank_account,
					area_zone,
					email,
					phone,
					user_id: user._id
				}
				const customerServiceUrl = serviceEndpointTemplate.replace('@port', process.env.CUSTOMER_SERVICE_PORT).replace('@role', user.role)
				const customer = await axios.post(customerServiceUrl, newCustomer)
				break;
			case USER_ROLE_SHIPPER:
				const newShipper = {
					full_name,
					address,
					identity,
					bank_account,
					work_zone,
					email,
					phone,
					user_id: user._id
				}
				const shipperServiceUrl = serviceEndpointTemplate.replace('@port', process.env.SHIPPER_SERVICE_PORT).replace('@role', user.role)
				const shipper = await axios.post(shipperServiceUrl, newShipper)
				break;

			case USER_ROLE_SHOP:
				const newShop = {
					bank_account,
					email,
					phone,
					name,
					location,
					business_cert,
					description,
					user_id: user._id
				}
				const shopServiceUrl = serviceEndpointTemplate.replace('@port', process.env.SHOP_SERVICE_PORT).replace('@role', user.role)
				const shop = await axios.post(shopServiceUrl, newShop)
		}

		let userData = {
			user_id: user._id,
			role: user.role
		}
		const jwtPayload = userData;
		const jwtData = { expiresIn: access_token_life };
		const secret = access_token_secret;
		userData.token = jwt.sign(jwtPayload, secret, jwtData);
		userData.expire_time = ((new Date()).getTime() + access_token_life * 60 * 60 * 1000).toLocaleString();
		userData.user_id = user._id;
		apiResponse.successResponseWithData(res, "success", userData);
	} catch (ex) {
		console.log("ex", ex.message)
		return apiResponse.ErrorResponse(res, ex)
	}
}

exports.login = [
	check('username', 'Username must be specified').exists().isLength({ min: 1 }),
	check("password", 'Password must be specified').exists().isLength({ min: 1 }),
	(req, res) => {
		var requsername = req.body.username ? req.body.username : null;
		var reqmail = req.body.email ? req.body.email : null
		var condition = ""
		if (requsername) {

			condition = { username: requsername };
		} else {
			condition = { mail: reqmail };
		}
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty) {
				return apiResponse.validationErrorWithData(res, "validation Error", errors.array());
			}
			else {

				userRepo.findByUsername(requsername)
					.then(user => {
						if (user) {
							bcrypt.compare(req.body.password, user.password, (err, same) => {
								if (same) {
									if (!user.isBlocked) {
										let userData = {
											user_id: user._id,
											role: user.role
										}
										const jwtPayload = userData;
										const jwtData = { expiresIn: access_token_life };
										const secret = access_token_secret;
										userData.token = jwt.sign(jwtPayload, secret, jwtData);
										return apiResponse.successResponseWithData(res, "Success", userData);
									}
									else {
										return apiResponse.unauthorizedResponse(res, "Account is blocked. Please contact admin");
									}
								} else {
									return apiResponse.unauthorizedResponse(res, "User or password wrong")
								}
							})
						}
						else {
							return apiResponse.unauthorizedResponse(res, "User or password wrong")
						}
					})
			}
		} catch (err) {
			console.log("err", err)
			return apiResponse.ErrorResponse(res, err);
		}
	}]
