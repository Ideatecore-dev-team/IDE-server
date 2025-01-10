const supertest = require("supertest");
const app = require("../../src/api/app");
const user = require("../utilities/user.util");
const teamCategory = require("../utilities/teamCategory.util");

describe("POST /teamCategory", () => {
  beforeEach(async () => {
    await user.createTestUser();
  });

  afterEach(async () => {
    await teamCategory.deleteTestTeamCategory();
    await user.deleteTestUser();
  });

  it("should can create new teamCategory", async () => {
    const token = await user.getToken();
    const result = await supertest(app)
      .post("/teamCategory")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        name: teamCategory.teamCategoryData.name,
      });

    expect(result.status).toBe(201);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.name).toBe(teamCategory.teamCategoryData.name);
    expect(result.body.data).toHaveProperty("createdAt");
    expect(result.body.data).toHaveProperty("updatedAt");

    expect(result.body.error).toBe(false);
    expect(result.body.message).toBe("success create team category");
    expect(result.body.status).toBe("success");
    expect(result.body.statusCode).toBe(201);
    expect(result.body.success).toBe(true);
  });

  it("should reject if name is empty", async () => {
    const token = await user.getToken();
    const result = await supertest(app)
      .post("/teamCategory")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        name: "",
      });

    expect(result.status).toBe(403);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("error validation");
    expect(result.body.message).toContain("name");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(403);
    expect(result.body.success).toBe(false);
  });
});

describe("GET /teamCategory", () => {
  beforeEach(async () => {
    await user.createTestUser();
    await teamCategory.createTestTeamCategory();
  });

  afterEach(async () => {
    await teamCategory.deleteTestTeamCategory();
    await user.deleteTestUser();
  });

  it("should can get all teamCategory", async () => {
    const token = await user.getToken();
    const result = await supertest(app)
      .get("/teamCategory")
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
    expect(result.body.data[0].id).toBeDefined();
    expect(result.body.data[0].name).toBe(teamCategory.teamCategoryData.name);
    expect(result.body.data[0]).toHaveProperty("createdAt");
    expect(result.body.data[0]).toHaveProperty("updatedAt");

    expect(result.body.error).toBe(false);
    expect(result.body.message).toBe("success get all team category");
    expect(result.body.status).toBe("success");
    expect(result.body.statusCode).toBe(200);
    expect(result.body.success).toBe(true);
  });

  it("should reject if teamCategory is empty", async () => {
    await teamCategory.deleteTestTeamCategory();
    const token = await user.getToken();
    const result = await supertest(app)
      .get("/teamCategory")
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(404);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("team category not found");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(404);
    expect(result.body.success).toBe(false);
  });
});

describe("GET /teamCategory/:id", () => {
  beforeEach(async () => {
    await user.createTestUser();
    await teamCategory.createTestTeamCategory();
  });

  afterEach(async () => {
    await teamCategory.deleteTestTeamCategory();
    await user.deleteTestUser();
  });

  it("should can get teamCategory by id", async () => {
    const token = await user.getToken();
    const dataTeamCategory = await teamCategory.getTestTeamCategory();
    const result = await supertest(app)
      .get(`/teamCategory/${dataTeamCategory.id}`)
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.name).toBe(teamCategory.teamCategoryData.name);
    expect(result.body.data).toHaveProperty("createdAt");
    expect(result.body.data).toHaveProperty("updatedAt");

    expect(result.body.error).toBe(false);
    expect(result.body.message).toBe("success get team category by id");
    expect(result.body.status).toBe("success");
    expect(result.body.statusCode).toBe(200);
    expect(result.body.success).toBe(true);
  });

  it("should reject if teamCategory not found", async () => {
    const token = await user.getToken();
    await teamCategory.deleteTestTeamCategory();
    const result = await supertest(app)
      .get("/teamCategory/wrongid")
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(404);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("team category not found");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(404);
    expect(result.body.success).toBe(false);
  });
});

describe("PUT /teamCategory/:id", () => {
  beforeEach(async () => {
    await user.createTestUser();
    await teamCategory.createTestTeamCategory();
  });

  afterEach(async () => {
    await teamCategory.deleteTestTeamCategory();
    await user.deleteTestUser();
  });

  it("should can update teamCategory", async () => {
    const token = await user.getToken();
    const dataTeamCategory = await teamCategory.getTestTeamCategory();
    const result = await supertest(app)
      .put(`/teamCategory/${dataTeamCategory.id}`)
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        name: "teamCategory updated",
      });

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.name).toBe("teamCategory updated");
    expect(result.body.data).toHaveProperty("createdAt");
    expect(result.body.data).toHaveProperty("updatedAt");

    expect(result.body.error).toBe(false);
    expect(result.body.message).toBe("success update team category");
    expect(result.body.status).toBe("success");
    expect(result.body.statusCode).toBe(200);
    expect(result.body.success).toBe(true);
  });

  it("should reject if teamCategory not found", async () => {
    const token = await user.getToken();
    await teamCategory.deleteTestTeamCategory();
    const result = await supertest(app)
      .put("/teamCategory/wrongid")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        name: "teamCategory updated",
      });

    expect(result.status).toBe(404);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("team category not found");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(404);
    expect(result.body.success).toBe(false);
  });
});

describe("DELETE /teamCategory/:id", () => {
  beforeEach(async () => {
    await user.createTestUser();
    await teamCategory.createTestTeamCategory();
  });

  afterEach(async () => {
    await teamCategory.deleteTestTeamCategory();
    await user.deleteTestUser();
  });

  it("should can delete teamCategory", async () => {
    const token = await user.getToken();
    const dataTeamCategory = await teamCategory.getTestTeamCategory();
    const result = await supertest(app)
      .delete(`/teamCategory/${dataTeamCategory.id}`)
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.name).toBe(teamCategory.teamCategoryData.name);
    expect(result.body.data).toHaveProperty("createdAt");
    expect(result.body.data).toHaveProperty("updatedAt");

    expect(result.body.error).toBe(false);
    expect(result.body.message).toBe("success delete team category");
    expect(result.body.status).toBe("success");
    expect(result.body.statusCode).toBe(200);
    expect(result.body.success).toBe(true);
  });

  it("should reject if teamCategory not found", async () => {
    const token = await user.getToken();
    await teamCategory.deleteTestTeamCategory();
    const result = await supertest(app)
      .delete("/teamCategory/wrongid")
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(404);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("team category not found");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(404);
    expect(result.body.success).toBe(false);
  });
});
