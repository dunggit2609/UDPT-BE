
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

exports.find = [async function (req, res) {
    const {id} = req.body
    try {
        const shipper = await shipperRepo.findById(id)
        return apiResponse.successResponseWithData(res, "Success", shipper) 
    }
    catch (err) {
        console.log("err", err)
        return apiResponse.ErrorResponse(res, "Cannot create user")
    }
}]

exports.updateHealth = [async function (req, res) {
    const token = req.headers['authorization']
    const { user_id } = jwt.decode(token)
    const shipper = await shipperRepo.findById(user_id)

    try {
        let newShipper = await shipperRepo.updateHealthInfo(shipper._id, req.body)
        return apiResponse.successResponse(res, "Success")
    }
    catch (err) {
        console.log("err", err)
        return apiResponse.ErrorResponse(res, "Cannot update health")
    }
}]