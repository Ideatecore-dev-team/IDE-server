const supertest = require("supertest");
const app = require("../../src/api/app");
const user = require("../utilities/user.util");
const teamCategory = require("../utilities/teamCategory.util");
const team = require("../utilities/team.util");

describe("POST /team", () => {
  beforeEach(async () => {
    await user.createTestUser();
    await teamCategory.createTestTeamCategory();
  });

  afterEach(async () => {
    await team.removeTestTeam();
    await teamCategory.deleteTestTeamCategory();
    await user.deleteTestUser();
  });

  it("should can create new team", async () => {
    const token = await user.getToken();
    const dataTeamCategory = await teamCategory.getTestTeamCategory();
    const result = await supertest(app)
      .post("/team")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        name: team.teamData.name,
        position: team.teamData.position,
        image: team.teamData.image,
        link: team.teamData.link,
        categoryTeamId: dataTeamCategory.id,
      });

    expect(result.status).toBe(201);
    expect(result.body.data.name).toBe(team.teamData.name);
    expect(result.body.data.position).toBe(team.teamData.position);
    expect(result.body.data.image).toBe(team.teamData.image);
    expect(result.body.data.link).toBe(team.teamData.link);
    expect(result.body.data.categoryTeamId).toBe(dataTeamCategory.id);
    expect(result.body.data.CategoryTeam.name).toBe(dataTeamCategory.name);

    expect(result.body.data).toHaveProperty("createdAt");
    expect(result.body.data).toHaveProperty("updatedAt");
    expect(result.body.error).toBe(false);
    expect(result.body.message).toBe("success create a team");
    expect(result.body.status).toBe("success");
    expect(result.body.statusCode).toBe(201);
    expect(result.body.success).toBe(true);
  });

  it("should reject if name is empty", async () => {
    const token = await user.getToken();
    const dataTeamCategory = await teamCategory.getTestTeamCategory();
    const result = await supertest(app)
      .post("/team")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        name: "",
        position: team.teamData.position,
        image: team.teamData.image,
        link: team.teamData.link,
        categoryTeamId: dataTeamCategory.id,
      });

    expect(result.status).toBe(403);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("error validation");
    expect(result.body.message).toContain("name");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(403);
    expect(result.body.success).toBe(false);
  });

  it("should reject if categoryTeamId is not exist", async () => {
    const token = await user.getToken();
    const result = await supertest(app)
      .post("/team")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        name: team.teamData.name,
        position: team.teamData.position,
        image: team.teamData.image,
        link: team.teamData.link,
        categoryTeamId: "wrongCategoryTeamId",
      });

    expect(result.status).toBe(404);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("category not found");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(404);
    expect(result.body.success).toBe(false);
  });
});

describe("GET /team", () => {
  beforeEach(async () => {
    await user.createTestUser();
    await teamCategory.createTestTeamCategory();
    await team.createTestTeam();
  });

  afterEach(async () => {
    await team.removeTestTeam();
    await teamCategory.deleteTestTeamCategory();
    await user.deleteTestUser();
  });

  it("should can get all team", async () => {
    const token = await user.getToken();
    const result = await supertest(app)
      .get("/team")
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(200);
    expect(result.body.data[0].name).toBe(team.teamData.name);
    expect(result.body.data[0].position).toBe(team.teamData.position);
    expect(result.body.data[0].image).toBe(team.teamData.image);
    expect(result.body.data[0].link).toBe(team.teamData.link);
    expect(result.body.data[0].categoryTeamId).toBeDefined();
    expect(result.body.data[0].CategoryTeam.name).toBe(
      teamCategory.teamCategoryData.name,
    );

    expect(result.body.data[0]).toHaveProperty("createdAt");
    expect(result.body.data[0]).toHaveProperty("updatedAt");
    expect(result.body.error).toBe(false);
    expect(result.body.message).toBe("success get all team");
    expect(result.body.status).toBe("success");
    expect(result.body.statusCode).toBe(200);
    expect(result.body.success).toBe(true);
  });

  it("should reject if team is empty", async () => {
    await team.removeTestTeam();
    const token = await user.getToken();
    const result = await supertest(app)
      .get("/team")
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(404);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("team not found");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(404);
    expect(result.body.success).toBe(false);
  });
});

describe("GET /team/:id", () => {
  beforeEach(async () => {
    await user.createTestUser();
    await teamCategory.createTestTeamCategory();
    await team.createTestTeam();
  });

  afterEach(async () => {
    await team.removeTestTeam();
    await teamCategory.deleteTestTeamCategory();
    await user.deleteTestUser();
  });

  it("should can get team by id", async () => {
    const token = await user.getToken();
    const dataTeam = await team.getTestTeam();
    const result = await supertest(app)
      .get(`/team/${dataTeam.id}`)
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(200);
    expect(result.body.data.name).toBe(team.teamData.name);
    expect(result.body.data.position).toBe(team.teamData.position);
    expect(result.body.data.image).toBe(team.teamData.image);
    expect(result.body.data.link).toBe(team.teamData.link);
    expect(result.body.data.categoryTeamId).toBeDefined();
    expect(result.body.data.CategoryTeam.name).toBe(
      teamCategory.teamCategoryData.name,
    );

    expect(result.body.data).toHaveProperty("createdAt");
    expect(result.body.data).toHaveProperty("updatedAt");
    expect(result.body.error).toBe(false);
    expect(result.body.message).toBe("success get team by id");
    expect(result.body.status).toBe("success");
    expect(result.body.statusCode).toBe(200);
    expect(result.body.success).toBe(true);
  });

  it("should reject if team is not exist", async () => {
    const token = await user.getToken();
    const result = await supertest(app)
      .get("/team/wrongTeamId")
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(404);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("team not found");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(404);
    expect(result.body.success).toBe(false);
  });
});
describe("PUT /team/:id", () => {
  beforeEach(async () => {
    await user.createTestUser();
    await teamCategory.createTestTeamCategory();
    await team.createTestTeam();
  });

  afterEach(async () => {
    await team.removeTestTeam();
    await teamCategory.deleteTestTeamCategory();
    await user.deleteTestUser();
  });

  it("should can update team", async () => {
    const token = await user.getToken();
    const dataTeam = await team.getTestTeam();
    const result = await supertest(app)
      .put(`/team/${dataTeam.id}`)
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        name: "new name",
        position: "new position",
        image: "new image",
        link: "new link",
        categoryTeamId: dataTeam.categoryTeamId,
      });

    expect(result.status).toBe(200);
    expect(result.body.data.name).toBe("new name");
    expect(result.body.data.position).toBe("new position");
    expect(result.body.data.image).toBe("new image");
    expect(result.body.data.link).toBe("new link");
    expect(result.body.data.categoryTeamId).toBe(dataTeam.categoryTeamId);
    expect(result.body.data.CategoryTeam.name).toBe(
      teamCategory.teamCategoryData.name,
    );

    expect(result.body.data).toHaveProperty("createdAt");
    expect(result.body.data).toHaveProperty("updatedAt");
    expect(result.body.error).toBe(false);
    expect(result.body.message).toBe("success update team");
    expect(result.body.status).toBe("success");
    expect(result.body.statusCode).toBe(200);
    expect(result.body.success).toBe(true);
  });

  it("should reject if team is not exist", async () => {
    const token = await user.getToken();
    const dataTeam = await team.getTestTeam();
    const result = await supertest(app)
      .put("/team/wrongTeamId")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        name: "new name",
        position: "new position",
        image: "new image",
        link: "new link",
        categoryTeamId: dataTeam.categoryTeamId,
      });

    expect(result.status).toBe(404);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("team not found");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(404);
    expect(result.body.success).toBe(false);
  });

  it("should reject if name is empty", async () => {
    const token = await user.getToken();
    const dataTeam = await team.getTestTeam();
    const result = await supertest(app)
      .put(`/team/${dataTeam.id}`)
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        name: "",
        position: "new position",
        image: "new image",
        link: "new link",
        categoryTeamId: dataTeam.categoryTeamId,
      });

    expect(result.status).toBe(403);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("error validation");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(403);
    expect(result.body.success).toBe(false);
  });
});
describe("DELETE /team/:id", () => {
  beforeEach(async () => {
    await user.createTestUser();
    await teamCategory.createTestTeamCategory();
    await team.createTestTeam();
  });

  afterEach(async () => {
    await team.removeTestTeam();
    await teamCategory.deleteTestTeamCategory();
    await user.deleteTestUser();
  });

  it("should can delete team", async () => {
    const token = await user.getToken();
    const dataTeam = await team.getTestTeam();
    const result = await supertest(app)
      .delete(`/team/${dataTeam.id}`)
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(200);
    expect(result.body.error).toBe(false);
    expect(result.body.message).toBe("success remove team");
    expect(result.body.status).toBe("success");
    expect(result.body.statusCode).toBe(200);
    expect(result.body.success).toBe(true);
  });

  it("should reject if team is not exist", async () => {
    const token = await user.getToken();
    await team.removeTestTeam();
    const result = await supertest(app)
      .delete("/team/wrongTeamId")
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(404);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("team not found");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(404);
    expect(result.body.success).toBe(false);
  });
});
