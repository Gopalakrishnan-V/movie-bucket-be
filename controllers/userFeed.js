const { getInternalServerError } = require("../utils/errorUtil");
const feedItems = require("../others/feed.json");

module.exports.list = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  try {
    const total_results = feedItems.length;
    const total_pages = Math.ceil(total_results / limit);
    const start = (page - 1) * limit;
    const end = page * limit;
    const results = feedItems.slice(start, end);

    const resBody = {
      page,
      total_results,
      total_pages,
      results
    };
    return res.send(resBody);
  } catch (err) {
    return res.status(500).send(getInternalServerError());
  }
};
