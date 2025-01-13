const service = require("./service");

// const companyInfoData = {
//     name: "Company Name",
//     description: "Company Description",
//     title: "Company Title",
//     image: "Company Image",
//     Phone: "Company Phone",
//     Email: "Company Email",
//     Address: "Company Address",
//     Facebook: "Company Facebook",
//     Instagram: "Company Instagram",
//     Twitter: "Company Twitter",
//     Linkedin: "Company Linkedin",
//     Youtube: "Company Youtube",
//     Tiktok: "Company Tiktok",
//   };
// create
const create = async (req, res, next) => {
  try {
    const request = {
      name: req.body.name,
      description: req.body.description,
      title: req.body.title,
      image: req.body.image,
      Phone: req.body.Phone,
      Email: req.body.Email,
      Address: req.body.Address,
      Facebook: req.body.Facebook,
      Instagram: req.body.Instagram,
      Twitter: req.body.Twitter,
      Linkedin: req.body.Linkedin,
      Youtube: req.body.Youtube,
      Tiktok: req.body.Tiktok,
    };

    const response = await service.create(request);

    res.status(201).json({
      data: response,
      error: false,
      message: "success create company info",
      status: "success",
      statusCode: 201,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// get
const get = async (req, res, next) => {
  try {
    const response = await service.get();

    res.status(200).json({
      data: response,
      error: false,
      message: "success get company info",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// update
const update = async (req, res, next) => {
  try {
    const request = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      title: req.body.title,
      image: req.body.image,
      Phone: req.body.Phone,
      Email: req.body.Email,
      Address: req.body.Address,
      Facebook: req.body.Facebook,
      Instagram: req.body.Instagram,
      Twitter: req.body.Twitter,
      Linkedin: req.body.Linkedin,
      Youtube: req.body.Youtube,
      Tiktok: req.body.Tiktok,
    };

    const response = await service.update(request);

    res.status(200).json({
      data: response,
      error: false,
      message: "success update company info",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { create, get, update };
