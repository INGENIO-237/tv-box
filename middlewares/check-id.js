const checkId = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (typeof id != "number") {
    res
      .status(400)
      .json({ message: "`id` must be provided and must be an integer" });
  } else {
    next();
  }
};

module.exports = checkId;
