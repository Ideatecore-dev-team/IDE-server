const apiDelay = async (req, res, next) => {
  await new Promise((resolve) => setTimeout(resolve, 10000));
  next();
};

module.exports = apiDelay;
