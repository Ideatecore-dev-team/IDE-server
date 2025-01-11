const prisma = require("../../src/utilities/database");

const teamCategoryData = async () => {
  const result = await prisma.categoryTeam.findFirst();
  return result;
};

const teamData = {
  name: "testTeam",
  position: "testPosition",
  image: "testImage",
  link: "testLink",
};

const createTestTeam = async () => {
  const teamCategory = await teamCategoryData();
  const result = await prisma.team.create({
    data: {
      name: teamData.name,
      position: teamData.position,
      image: teamData.image,
      link: teamData.link,
      categoryTeamId: teamCategory.id,
    },
  });

  return result;
};

const removeTestTeam = async () => {
  await prisma.team.deleteMany();
};

const getTestTeam = async () => {
  const result = await prisma.team.findFirst();
  return result;
};
module.exports = {
  teamCategoryData,
  teamData,
  createTestTeam,
  removeTestTeam,
  getTestTeam,
};
