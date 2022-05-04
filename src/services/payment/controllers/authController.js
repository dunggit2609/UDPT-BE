const db = require('../db');
const UserModel = db.User;
const jwt = require('jsonwebtoken')
const { check, validationResult, sanitize } = require('express-validator/check');
var bcrypt = require('bcrypt')
var apiResponse = require('../../../helpers/apiResponse')
var { access_token_secret, access_token_life } = require('../../../configs/authConfig');
const { userRepo } = require('../repopsitory/userRepo');
const { hash } = require('../../../helpers/hash');


exports.signUp = async function (req, res) {

	const { username, password, email, phone, role } = req.body
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

		const user = await userRepo.create({...newUser, ...{password: hashData}})

		if (!user) {
			return apiResponse.ErrorResponse(res, 'Create failed!')
		}

		let userData = {
			user_id: user._id
		}
		const jwtPayload = userData;
		const jwtData = { expiresIn: access_token_life };
		const secret = access_token_secret;
		userData.token = jwt.sign(jwtPayload, secret, jwtData);
		userData.expire_time = ((new Date()).getTime() + access_token_life * 60 * 60 * 1000).toLocaleString();
		userData.user_id = user._id;
		apiResponse.successResponseWithData(res, "success", userData);
	} catch (ex) {
		console.log("ex", ex)
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
				UserModel.findOne({
					where: condition
				})
					.then(user => {
						if (user) {
							bcrypt.compare(req.body.password, user.password, (err, same) => {
								if (same) {
									if (!user.isBlocked) {
										let userData = {
											user_id: user.user_id
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
			return apiResponse.ErrorResponse(res, err);
		}
	}]
