
const db = require('../db');
const ShipperModel = db.Shipper;
const jwt = require('jsonwebtoken');
var apiResponse = require('../../../helpers/apiResponse')
const cloneDeep = require('../../../utils/cloneDeep')
const { shipperRepo } = require('../repopsitory/shipperRepo');



exports.create = [async function (req, res) {
    
    try {
        const shipper = await shipperRepo.create(req.body)
        console.log("ship",shipper)
        return apiResponse.successResponseWithData(res, "Success", shipper) 
    }
    catch (err) {
        console.log("err", err)
        return apiResponse.ErrorResponse(res, "Cannot create user")
    }
}]