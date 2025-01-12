const apiDelay = async (req, res, next) => {
  await new Promise((resolve) => setTimeout(resolve, 1));
  next();
};

module.exports = apiDelay;
