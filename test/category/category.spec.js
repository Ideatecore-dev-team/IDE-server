const supertest = require("supertest");
const app = require("../../src/api/app");
const user = require("../utilities/user.util");
const category = require("../utilities/category.util");

describe("POST /category", () => {
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

describe("GET /category", () => {
  beforeEach(async () => {
    await user.createTestUser();
    await category.createTestCategory();
  });

  afterEach(async () => {
    await user.deleteTestUser();
    await category.deleteTestCategory();
  });

  it("should can get all category", async () => {
    const token = await user.getToken();
    const result = await supertest(app)
      .get("/category")
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(200);
    expect(result.body.data[0].id).toBeDefined();
    expect(result.body.data[0].category).toBe(category.categoryData.category);
    expect(result.body.data[0]).toHaveProperty("createdAt");
    expect(result.body.data[0]).toHaveProperty("updatedAt");

    expect(result.body.error).toBe(false);
    expect(result.body.message).toContain("success get all category");
    expect(result.body.status).toContain("success");
    expect(result.body.statusCode).toBe(200);
    expect(result.body.success).toBe(true);
  });

  it("should reject if category not found", async () => {
    await category.deleteTestCategory();
    const token = await user.getToken();
    const result = await supertest(app)
      .get("/category")
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(404);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("category not found");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(404);
    expect(result.body.success).toBe(false);
  });
});

describe("GET /category/:id", () => {
  beforeEach(async () => {
    await user.createTestUser();
    await category.createTestCategory();
  });

  afterEach(async () => {
    await user.deleteTestUser();
    await category.deleteTestCategory();
  });

  it("should can get category by id", async () => {
    const token = await user.getToken();
    const dataCategory = await category.getCategory();
    const result = await supertest(app)
      .get(`/category/${dataCategory.id}`)
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.category).toBe(category.categoryData.category);
    expect(result.body.data).toHaveProperty("createdAt");
    expect(result.body.data).toHaveProperty("updatedAt");

    expect(result.body.error).toBe(false);
    expect(result.body.message).toContain("success get category by id");
    expect(result.body.status).toContain("success");
    expect(result.body.statusCode).toBe(200);
    expect(result.body.success).toBe(true);
  });

  it("should reject if category not found", async () => {
    const token = await user.getToken();
    const dataCategory = await category.getCategory();
    await category.deleteTestCategory();
    const result = await supertest(app)
      .get(`/category/${dataCategory.id}`)
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(404);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("category not found");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(404);
    expect(result.body.success).toBe(false);
  });

  it("should reject if id is invalid", async () => {
    const token = await user.getToken();
    const result = await supertest(app)
      .get(`/category/wrongid`)
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(404);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("category not found");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(404);
    expect(result.body.success).toBe(false);
  });
});

describe("PUT /category/:id", () => {
  beforeEach(async () => {
    await user.createTestUser();
    await category.createTestCategory();
  });

  afterEach(async () => {
    await user.deleteTestUser();
    await category.deleteTestCategory();
  });

  it("should can update category", async () => {
    const token = await user.getToken();
    const dataCategory = await category.getCategory();
    const result = await supertest(app)
      .put(`/category/${dataCategory.id}`)
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        category: "new category",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.category).toBe("new category");
    expect(result.body.data).toHaveProperty("createdAt");
    expect(result.body.data).toHaveProperty("updatedAt");

    expect(result.body.error).toBe(false);
    expect(result.body.message).toContain("success update category");
    expect(result.body.status).toContain("success");
    expect(result.body.statusCode).toBe(200);
    expect(result.body.success).toBe(true);
  });

  it("should reject if category is empty", async () => {
    const token = await user.getToken();
    const dataCategory = await category.getCategory();
    const result = await supertest(app)
      .put(`/category/${dataCategory.id}`)
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

  it("should reject if category not found", async () => {
    const token = await user.getToken();
    const dataCategory = await category.getCategory();
    await category.deleteTestCategory();
    const result = await supertest(app)
      .put(`/category/${dataCategory.id}`)
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        category: "new category",
      });

    expect(result.status).toBe(404);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("category not found");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(404);
    expect(result.body.success).toBe(false);
  });
});

describe("DELETE /category/:id", () => {
  beforeEach(async () => {
    await user.createTestUser();
    await category.createTestCategory();
  });

  afterEach(async () => {
    await user.deleteTestUser();
    await category.deleteTestCategory();
  });

  it("should can delete category", async () => {
    const token = await user.getToken();
    const dataCategory = await category.getCategory();
    const result = await supertest(app)
      .delete(`/category/${dataCategory.id}`)
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.category).toBe(category.categoryData.category);
    expect(result.body.data).toHaveProperty("createdAt");
    expect(result.body.data).toHaveProperty("updatedAt");

    expect(result.body.error).toBe(false);
    expect(result.body.message).toContain("success delete category");
    expect(result.body.status).toContain("success");
    expect(result.body.statusCode).toBe(200);
    expect(result.body.success).toBe(true);
  });

  it("should reject if category not found", async () => {
    const token = await user.getToken();
    const dataCategory = await category.getCategory();
    await category.deleteTestCategory();
    const result = await supertest(app)
      .delete(`/category/${dataCategory.id}`)
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(404);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("category not found");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(404);
    expect(result.body.success).toBe(false);
  });
});
