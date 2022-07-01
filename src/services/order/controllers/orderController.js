const db = require('../db');
const jwt = require('jsonwebtoken');
var apiResponse = require('../../../helpers/apiResponse');
const cloneDeep = require('../../../utils/cloneDeep');
const auth = require('../../../middlewares/jwt');
const { orderRepo } = require('../repopsitory/orderRepo');
const { USER_ROLE_SHIPPER } = require('../../../constant/user');
const axios = require('axios');
const { ObjectID } = require('bson');
const { ObjectId } = require('mongodb');

exports.getWithFilters = [
  async function (req, res) {
    try {
      const { page, size } = req.body;
      const token = req.headers['authorization'];
      const { user_id, role } = jwt.decode(token);
      let shipper_id;
      let serviceEndpointTemplate = `@endpoint:@port/api/@role/find`;
      serviceEndpointTemplate = serviceEndpointTemplate.replace(
        '@endpoint',
        process.env.ENDPOINT
      );

      switch (role) {
        case USER_ROLE_SHIPPER:
          const shipperServiceUrl = serviceEndpointTemplate
            .replace('@port', process.env.SHIPPER_SERVICE_PORT)
            .replace('@role', USER_ROLE_SHIPPER);
          const { data } = await axios.post(shipperServiceUrl, { id: user_id });
          shipper_id = data.data._id;
      }
      const { response, totalItems } = await orderRepo.getWithFilters({
        ...req.body,
        shipper_id: shipper_id,
      });
      return apiResponse.successResponseWithPagingData(
        res,
        'Success',
        response,
        page,
        totalItems
      );
    } catch (err) {
      console.log('errrxx', err);
      return apiResponse.ErrorResponse(res, 'Cannot get order');
    }
  },
];

exports.updateStatus = [
  async function (req, res) {
    try {
      const { order_id, status } = req.body;
      const token = req.headers['authorization'];
      const { user_id, role } = jwt.decode(token);
      let shipper_id;
      let serviceEndpointTemplate = `@endpoint:@port/api/@role/find`;
      serviceEndpointTemplate = serviceEndpointTemplate.replace(
        '@endpoint',
        process.env.ENDPOINT
      );

      switch (role) {
        case USER_ROLE_SHIPPER:
          const shipperServiceUrl = serviceEndpointTemplate
            .replace('@port', process.env.SHIPPER_SERVICE_PORT)
            .replace('@role', USER_ROLE_SHIPPER);
          const { data } = await axios.post(shipperServiceUrl, { id: user_id });
          shipper_id = data.data._id;
      }

      const order = await orderRepo.findById(order_id);

      if (!order) {
        return apiResponse.badRequestResponse(res, 'Order not exists');
      }

      if (!order.shipper_id.equals(shipper_id)) {
        return apiResponse.forbiddenResponse(res);
      }

      const result = await orderRepo.updateStatus(order_id, status);

      if (!result) {
        return apiResponse.ErrorResponse(res, 'Update failed');
      }
      return apiResponse.successResponse(res, 'Success');
    } catch (err) {
      console.log('errrxx', err);
      return apiResponse.ErrorResponse(res, 'Cannot update order');
    }
  },
];

exports.createOrder = [
  async function (req, res) {
    try {
      const token = req.headers['authorization'];
      const { user_id } = jwt.decode(token);

      const order = await orderRepo.create({...req.body, customer_id});

      if (!order) {
        return apiResponse.ErrorResponse(res, 'Insert failed');
      }
      return apiResponse.successResponse(res, 'Success');
    } catch (err) {
      console.log('errrxx', err);
      return apiResponse.ErrorResponse(res, 'Cannot update order');
    }
  },
];
