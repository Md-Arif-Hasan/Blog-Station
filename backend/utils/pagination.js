exports.paginate = (req) => {
  let { page, size } = req.query;

  if (!page) page = 0;
  if (!size) size = 3;

  let limit = parseInt(size);

  if (limit <= 0 || limit > 3) {
    limit = 3;
  }
  if (page <= 0) {
    page = 1;
  }

  let skip = limit * (parseInt(page) - 1);
  return { skip, limit };
};
