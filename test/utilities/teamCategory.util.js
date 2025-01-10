const prisma = require("../../src/utilities/database");

const teamCategoryData = {
  name: "testTeamCategory",
};

const createTestTeamCategory = async () => {
  await prisma.categoryTeam.create({ data: teamCategoryData });
};

const deleteTestTeamCategory = async () => {
  await prisma.categoryTeam.deleteMany();
};

const getTestTeamCategory = async () => {
  const result = await prisma.categoryTeam.findFirst();
  return result;
};

module.exports = {
  teamCategoryData,
  createTestTeamCategory,
  deleteTestTeamCategory,
  getTestTeamCategory,
};
