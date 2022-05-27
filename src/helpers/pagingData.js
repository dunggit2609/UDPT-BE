const getPagingData = (data, limit, offset) => {

    const response = data.slice(offset, limit + offset)
    const totalItems = data.length
    return {totalItems, response};
  };

  module.exports = getPagingData;