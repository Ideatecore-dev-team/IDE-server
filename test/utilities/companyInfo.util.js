const prisma = require("../../src/utilities/database");

const companyInfoData = {
  name: "Company Name",
  description: "Company Description",
  title: "Company Title",
  image: "Company Image",
  Phone: "Company Phone",
  Email: "Company Email",
  Address: "Company Address",
  Facebook: "Company Facebook",
  Instagram: "Company Instagram",
  Twitter: "Company Twitter",
  Linkedin: "Company Linkedin",
  Youtube: "Company Youtube",
  Tiktok: "Company Tiktok",
};

// Create Test Company Info
const createTestCompanyInfo = async () => {
  const companyInfo = await prisma.companyInfo.create({
    data: companyInfoData,
  });

  return companyInfo;
};

// Get Test Company Info
const getTestCompanyInfo = async () => {
  const result = await prisma.companyInfo.findFirst();
  return result;
};

//remove Test Company Info
const removeTestCompanyInfo = async () => {
  const result = await prisma.companyInfo.deleteMany();
  return result;
};

module.exports = {
  companyInfoData,
  createTestCompanyInfo,
  getTestCompanyInfo,
  removeTestCompanyInfo,
};
