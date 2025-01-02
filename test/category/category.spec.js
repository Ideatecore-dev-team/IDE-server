const supertest = require("supertest");
const app = require("../../src/api/app");
const user = require("../utilities/user.util");
const category = require("../utilities/category.util");

describe("POST /category/create", () => {
  beforeEach(async () => {
    await user.createTestUser();
  });

  afterEach(async () => {
    await user.deleteTestUser();
    await category.deleteTestCategory();
  });

  it("should can create new category", async () => {
    const token = await user.getToken();
    const result = await supertest(app)
      .post("/category")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        category: category.categoryData.category,
      });

    expect(result.status).toBe(201);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.category).toBe(category.categoryData.category);
    expect(result.body.data).toHaveProperty("createdAt");
    expect(result.body.data).toHaveProperty("updatedAt");

    expect(result.body.error).toBe(false);
    expect(result.body.message).toContain("success create category");
    expect(result.body.status).toContain("success");
    expect(result.body.statusCode).toBe(201);
    expect(result.body.success).toBe(true);
  });

  it("should reject if category is empty", async () => {
    const token = await user.getToken();
    const result = await supertest(app)
      .post("/category")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        category: "",
      });

    expect(result.status).toBe(403);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("error validation");
    expect(result.body.message).toContain("category");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(403);
    expect(result.body.success).toBe(false);
  });

  it("should reject if category is already exist", async () => {
    await category.createTestCategory();
    const token = await user.getToken();
    const result = await supertest(app)
      .post("/category")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        category: category.categoryData.category,
      });

    expect(result.status).toBe(400);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("category already exist");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(400);
    expect(result.body.success).toBe(false);
  });
});
