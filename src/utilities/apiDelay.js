const apiDelay = async (req, res, next) => {
  await new Promise((resolve) => setTimeout(resolve, 30));
  next();
};

module.exports = apiDelay;
