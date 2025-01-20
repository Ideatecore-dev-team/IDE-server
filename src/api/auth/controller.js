const service = require("./service");

// login
const login = async (req, res, next) => {
  try {
    const request = {
      email: req.body.email,
      password: req.body.password,
    };

    const response = await service.login(request);

    res
      .status(200)
      .cookie("authorization", `Bearer ${response.token}`, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({
        data: response,
        error: false,
        message: "success login user",
        status: "success",
        statusCode: 200,
        success: true,
      });
  } catch (error) {
    next(error);
  }
};

// logout
const logout = async (req, res, next) => {
  try {
    res.status(200).clearCookie("authorization").json({
      data: null,
      error: false,
      message: "success logout user",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// changepassword
const changePassword = async (req, res, next) => {
  try {
    const request = {
      id: req.user.id,
      oldPassword: req.body.oldPassword,
      newPassword: req.body.newPassword,
    };

    const response = await service.changePassword(request);

    res.status(200).json({
      data: response,
      error: false,
      message: "success change password",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// getuser
const getUser = async (req, res, next) => {
  try {
    const request = {
      id: req.user.id,
    };

    const response = await service.getUser(request);

    res.status(200).json({
      data: response,
      error: false,
      message: "success get user",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, logout, changePassword, getUser };
