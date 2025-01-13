const supertest = require("supertest");
const app = require("../src/api/app");
const user = require("./utilities/user.util");
const category = require("./utilities/category.util");
const article = require("./utilities/article.util");

describe("POST /article", () => {
  beforeEach(async () => {
    await user.createTestUser();
    await category.createTestCategory();
  });

  afterEach(async () => {
    await article.deleteTestArticle();
    await category.deleteTestCategory();
    await user.deleteTestUser();
  });

  it("should can create new article", async () => {
    const token = await user.getToken();
    const dataCategory = await category.getCategory();

    const result = await supertest(app)
      .post("/article")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        content: article.articleData.content,
        description: article.articleData.description,
        image: article.articleData.image,
        title: article.articleData.title,
        categoryId: dataCategory.id,
      });

    expect(result.status).toBe(201);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.userId).toBeDefined();
    expect(result.body.data.content).toBe(article.articleData.content);
    expect(result.body.data.description).toBe(article.articleData.description);
    expect(result.body.data.image).toBe(article.articleData.image);
    expect(result.body.data.title).toBe(article.articleData.title);
    expect(result.body.data.categoryId).toBe(dataCategory.id);
    expect(result.body.data.User.name).toBeDefined();
    expect(result.body.data.Category.category).toBeDefined();
    expect(result.body.data).toHaveProperty("createdAt");
    expect(result.body.data).toHaveProperty("updatedAt");

    expect(result.body.error).toBe(false);
    expect(result.body.message).toContain("success create article");
    expect(result.body.status).toContain("success");
    expect(result.body.statusCode).toBe(201);
    expect(result.body.success).toBe(true);
  });

  it("should reject if request is empty", async () => {
    const token = await user.getToken();
    const dataCategory = await category.getCategory();
    const result = await supertest(app)
      .post("/article")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        content: "",
        description: "",
        image: "",
        title: "",
        categoryId: dataCategory.id,
      });

    expect(result.status).toBe(403);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("error validation");
    expect(result.body.message).toContain("content");
    expect(result.body.message).toContain("description");
    expect(result.body.message).toContain("image");
    expect(result.body.message).toContain("title");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(403);
    expect(result.body.success).toBe(false);
  });

  it("should reject if category not found", async () => {
    const token = await user.getToken();
    const result = await supertest(app)
      .post("/article")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        content: article.articleData.content,
        description: article.articleData.description,
        image: article.articleData.image,
        title: article.articleData.title,
        categoryId: "wrongid",
      });

    expect(result.status).toBe(404);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("category not found");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(404);
    expect(result.body.success).toBe(false);
  });
});

describe("GET /article/:articleId", () => {
  beforeEach(async () => {
    await user.createTestUser();
    await category.createTestCategory();
    await article.createTestArticle();
  });

  afterEach(async () => {
    await article.deleteTestArticle();
    await category.deleteTestCategory();
    await user.deleteTestUser();
  });

  it("should can get article by id", async () => {
    const token = await user.getToken();
    const dataCategory = await category.getCategory();
    const dataArticle = await article.getArticle();

    const result = await supertest(app)
      .get(`/article/${dataArticle.id}`)
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.userId).toBeDefined();
    expect(result.body.data.content).toBe(article.articleData.content);
    expect(result.body.data.description).toBe(article.articleData.description);
    expect(result.body.data.image).toBe(article.articleData.image);
    expect(result.body.data.title).toBe(article.articleData.title);
    expect(result.body.data.categoryId).toBe(dataCategory.id);
    expect(result.body.data.User.name).toBeDefined();
    expect(result.body.data.Category.category).toBeDefined();
    expect(result.body.data).toHaveProperty("createdAt");
    expect(result.body.data).toHaveProperty("updatedAt");

    expect(result.body.error).toBe(false);
    expect(result.body.message).toContain("success get article");
    expect(result.body.status).toContain("success");
    expect(result.body.statusCode).toBe(200);
    expect(result.body.success).toBe(true);
  });

  it("should reject if article not found", async () => {
    const token = await user.getToken();
    const result = await supertest(app)
      .get("/article/wrongid")
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(404);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("article not found");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(404);
    expect(result.body.success).toBe(false);
  });
});

describe("PUT /article/:articleId", () => {
  beforeEach(async () => {
    await user.createTestUser();
    await category.createTestCategory();
    await article.createTestArticle();
  });

  afterEach(async () => {
    await article.deleteTestArticle();
    await category.deleteTestCategory();
    await user.deleteTestUser();
  });

  it("should can update article", async () => {
    const token = await user.getToken();
    const dataCategory = await category.getCategory();
    const dataArticle = await article.getArticle();

    const result = await supertest(app)
      .put(`/article/${dataArticle.id}`)
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        content: "new content",
        description: "new description",
        image: "new image",
        title: "new title",
        categoryId: dataCategory.id,
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.userId).toBeDefined();
    expect(result.body.data.content).toBe("new content");
    expect(result.body.data.description).toBe("new description");
    expect(result.body.data.image).toBe("new image");
    expect(result.body.data.title).toBe("new title");
    expect(result.body.data.categoryId).toBe(dataCategory.id);
    expect(result.body.data.User.name).toBeDefined();
    expect(result.body.data.Category.category).toBeDefined();
    expect(result.body.data).toHaveProperty("createdAt");
    expect(result.body.data).toHaveProperty("updatedAt");

    expect(result.body.error).toBe(false);
    expect(result.body.message).toContain("success update article");
    expect(result.body.status).toContain("success");
    expect(result.body.statusCode).toBe(200);
    expect(result.body.success).toBe(true);
  });

  it("should reject if data empty", async () => {
    const token = await user.getToken();
    const dataCategory = await category.getCategory();
    const dataArticle = await article.getArticle();

    const result = await supertest(app)
      .put(`/article/${dataArticle.id}`)
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        content: "",
        description: "",
        image: "",
        title: "",
        categoryId: "",
      });

    expect(result.status).toBe(403);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("error validation");
    expect(result.body.message).toContain("content");
    expect(result.body.message).toContain("description");
    expect(result.body.message).toContain("image");
    expect(result.body.message).toContain("title");
    expect(result.body.message).toContain("categoryId");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(403);
    expect(result.body.success).toBe(false);
  });

  it("should reject if article not found", async () => {
    const token = await user.getToken();
    const dataCategory = await category.getCategory();
    const result = await supertest(app)
      .put("/article/wrongid")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        content: "new content",
        description: "new description",
        image: "new image",
        title: "new title",
        categoryId: dataCategory.id,
      });

    expect(result.status).toBe(404);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("article not found");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(404);
    expect(result.body.success).toBe(false);
  });

  it("should reject if category not found", async () => {
    const token = await user.getToken();
    const dataArticle = await article.getArticle();
    const result = await supertest(app)
      .put(`/article/${dataArticle.id}`)
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        content: "new content",
        description: "new description",
        image: "new image",
        title: "new title",
        categoryId: "wrongid",
      });

    expect(result.status).toBe(404);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("category not found");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(404);
    expect(result.body.success).toBe(false);
  });
});

describe("DELETE /article/:articleId", () => {
  beforeEach(async () => {
    await user.createTestUser();
    await category.createTestCategory();
    await article.createTestArticle();
  });

  afterEach(async () => {
    await article.deleteTestArticle();
    await category.deleteTestCategory();
    await user.deleteTestUser();
  });

  it("should can delete article", async () => {
    const token = await user.getToken();
    const dataArticle = await article.getArticle();
    const result = await supertest(app)
      .delete(`/article/${dataArticle.id}`)
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.userId).toBeDefined();
    expect(result.body.data.content).toBe(article.articleData.content);
    expect(result.body.data.description).toBe(article.articleData.description);
    expect(result.body.data.image).toBe(article.articleData.image);
    expect(result.body.data.title).toBe(article.articleData.title);
    expect(result.body.data.User.name).toBeDefined();
    expect(result.body.data.Category.category).toBeDefined();
    expect(result.body.data.categoryId).toBe(dataArticle.categoryId);
    expect(result.body.data).toHaveProperty("createdAt");
    expect(result.body.data).toHaveProperty("updatedAt");

    expect(result.body.error).toBe(false);
    expect(result.body.message).toContain("success delete article");
    expect(result.body.status).toContain("success");
    expect(result.body.statusCode).toBe(200);
    expect(result.body.success).toBe(true);
  });

  it("should reject if article not found", async () => {
    const token = await user.getToken();
    const result = await supertest(app)
      .delete("/article/wrongid")
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(404);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("article not found");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(404);
    expect(result.body.success).toBe(false);
  });
});

describe("GET /article", () => {
  beforeEach(async () => {
    await user.createTestUser();
    await category.createTestCategory();
    await article.createManyTestArticle();
  });

  afterEach(async () => {
    await article.deleteTestArticle();
    await category.deleteTestCategory();
    await user.deleteTestUser();
  });

  it("should can get all article", async () => {
    const token = await user.getToken();
    const result = await supertest(app)
      .get("/article")
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(200);
    expect(result.body.data).toBeInstanceOf(Array);
    expect(result.body.data[0].id).toBeDefined();
    expect(result.body.data[0].userId).toBeDefined();
    expect(result.body.data[0].content).toBe(article.articleData.content + 14);
    expect(result.body.data[0].description).toBe(
      article.articleData.description + 14,
    );
    expect(result.body.data[0].image).toBe(article.articleData.image + 14);
    expect(result.body.data[0].title).toBe(article.articleData.title + 14);
    expect(result.body.data[0].User.name).toBeDefined();
    expect(result.body.data[0].Category.category).toBeDefined();
    expect(result.body.data[0].categoryId).toBeDefined();
    expect(result.body.data[0]).toHaveProperty("createdAt");
    expect(result.body.data[0]).toHaveProperty("updatedAt");

    expect(result.body.pagination).toBeDefined();
    expect(result.body.pagination.currentPage).toBe(1);
    expect(result.body.pagination.perPage).toBe(5);
    expect(result.body.pagination.totalItems).toBe(15);
    expect(result.body.pagination.totalPage).toBe(3);

    expect(result.body.error).toBe(false);
    expect(result.body.message).toContain("success get all article");
    expect(result.body.status).toContain("success");
    expect(result.body.statusCode).toBe(200);
    expect(result.body.success).toBe(true);
  });

  it("should can search article and set page", async () => {
    const token = await user.getToken();
    const result = await supertest(app)
      .get("/article")
      .set("Cookie", `authorization=Bearer ${token}`)
      .query({ search: "1", page: 2, size: 5 });

    expect(result.status).toBe(200);
    expect(result.body.data).toBeInstanceOf(Array);
    expect(result.body.data[0].id).toBeDefined();
    expect(result.body.data[0].userId).toBeDefined();
    expect(result.body.data[0].content).toBe(article.articleData.content + 1);
    expect(result.body.data[0].description).toBe(
      article.articleData.description + 1,
    );
    expect(result.body.data[0].image).toBe(article.articleData.image + 1);
    expect(result.body.data[0].title).toBe(article.articleData.title + 1);
    expect(result.body.data[0].User.name).toBeDefined();
    expect(result.body.data[0].Category.category).toBeDefined();
    expect(result.body.data[0].categoryId).toBeDefined();
    expect(result.body.data[0]).toHaveProperty("createdAt");
    expect(result.body.data[0]).toHaveProperty("updatedAt");

    expect(result.body.pagination).toBeDefined();
    expect(result.body.pagination.currentPage).toBe(2);
    expect(result.body.pagination.perPage).toBe(5);
    expect(result.body.pagination.totalItems).toBe(6);
    expect(result.body.pagination.totalPage).toBe(2);

    expect(result.body.error).toBe(false);
    expect(result.body.message).toContain("success get all article");
    expect(result.body.status).toContain("success");
    expect(result.body.statusCode).toBe(200);
    expect(result.body.success).toBe(true);
  });
});
