/* eslint-disable no-restricted-globals */
exports.paginate = (req) => {
    let { pageNo, limit } = req.query;

    pageNo = isNaN(pageNo) || pageNo < 1 ? 1 : parseInt(pageNo, 10);
    limit = isNaN(limit) || limit < 1 ? 5 : parseInt(limit, 10);
    const offset = limit * (pageNo - 1);
    return { offset, limit };
};
