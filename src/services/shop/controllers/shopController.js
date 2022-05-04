
const db = require('../db');
const ShipperModel = db.Shipper;
const jwt = require('jsonwebtoken');
var apiResponse = require('../../../helpers/apiResponse')
const cloneDeep = require('../../../utils/cloneDeep')
const { shopRepo } = require('../repopsitory/shopRepo');



exports.create = [async function (req, res) {
    
    try {
        const shop = await shopRepo.create(req.body)
        return apiResponse.successResponseWithData(res, "Success", shop) 
    }
    catch (err) {
        console.log("err", err)
        return apiResponse.ErrorResponse(res, "Cannot create user")
    }
}]