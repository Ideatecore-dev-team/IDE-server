const supertest = require("supertest");
const app = require("../src/api/app");
const user = require("./utilities/user.util");
const subscribe = require("./utilities/subscribe.util");

describe("POST /subscribe", () => {
  afterEach(async () => {
    await subscribe.deleteTestSubscribe();
  });

  it("should create a new subscribe", async () => {
    const response = await supertest(app).post("/subscribe").send({
      email: "emailtest@example.com",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.email).toContain("emailtest@example.com");
    expect(response.body.data).toHaveProperty("createdAt");
    expect(response.body.data).toHaveProperty("updatedAt");

    expect(response.body.error).toBe(false);
    expect(response.body.message).toContain("success create subscribe");
    expect(response.body.status).toContain("success");
    expect(response.body.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
  });

  it("should reject if email is invalid", async () => {
    const response = await supertest(app).post("/subscribe").send({
      email: "wrongemail",
    });

    expect(response.statusCode).toBe(403);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toContain("error validation");
    expect(response.body.message).toContain("email");
    expect(response.body.status).toContain("error");
    expect(response.body.statusCode).toBe(403);
    expect(response.body.success).toBe(false);
  });

  it("should reject if email empty", async () => {
    const response = await supertest(app).post("/subscribe").send({
      email: "",
    });

    expect(response.statusCode).toBe(403);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toContain("error validation");
    expect(response.body.message).toContain("email");
    expect(response.body.status).toContain("error");
    expect(response.body.statusCode).toBe(403);
    expect(response.body.success).toBe(false);
  });
});

describe("GET /subscribe", () => {
  let token;

  beforeEach(async () => {
    await user.createTestUser();
    token = await user.getToken();
    await subscribe.createTestSubscribe();
  });

  afterEach(async () => {
    await subscribe.deleteTestSubscribe();
    await user.deleteTestUser();
  });

  it("should can get all subscribe", async () => {
    const response = await supertest(app)
      .get("/subscribe")
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data[0].id).toBeDefined();
    expect(response.body.data[0].email).toContain("emailtest@example.com");
    expect(response.body.data[0].createdAt).toBeDefined();
    expect(response.body.data[0].updatedAt).toBeDefined();

    expect(response.body.error).toBe(false);
    expect(response.body.message).toContain("success get all subscribe");
    expect(response.body.status).toContain("success");
    expect(response.body.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("should reject if not authenticated", async () => {
    const response = await supertest(app).get("/subscribe");

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toContain("unauthenticated");
    expect(response.body.status).toContain("error");
    expect(response.body.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });
});

describe("GET /subscribe/:subscribeId", () => {
  let token;

  beforeEach(async () => {
    await user.createTestUser();
    token = await user.getToken();
    await subscribe.createTestSubscribe();
  });

  afterEach(async () => {
    await subscribe.deleteTestSubscribe();
    await user.deleteTestUser();
  });

  it("should can get subscribe by id", async () => {
    const dataSubscribe = await subscribe.getTestSubscribe();
    const response = await supertest(app)
      .get(`/subscribe/${dataSubscribe.id}`)
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.email).toContain("emailtest@example.com");
    expect(response.body.data).toHaveProperty("createdAt");
    expect(response.body.data).toHaveProperty("updatedAt");

    expect(response.body.error).toBe(false);
    expect(response.body.message).toContain("success get subscribe");
    expect(response.body.status).toContain("success");
    expect(response.body.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("should reject if not authenticated", async () => {
    const dataSubscribe = await subscribe.getTestSubscribe();
    const response = await supertest(app).get(`/subscribe/${dataSubscribe.id}`);

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toContain("unauthenticated");
    expect(response.body.status).toContain("error");
    expect(response.body.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it("should reject if subscribe not found", async () => {
    const response = await supertest(app)
      .get("/subscribe/wrongid")
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toContain("subscribe not found");
    expect(response.body.status).toContain("error");
    expect(response.body.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });
});

describe("PUT /subscribe/:id", () => {
  let token;

  beforeEach(async () => {
    await user.createTestUser();
    token = await user.getToken();
    await subscribe.createTestSubscribe();
  });

  afterEach(async () => {
    await subscribe.deleteTestSubscribe();
    await user.deleteTestUser();
  });

  it("should can update subscribe by id", async () => {
    const dataSubscribe = await subscribe.getTestSubscribe();
    const response = await supertest(app)
      .put(`/subscribe/${dataSubscribe.id}`)
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        email: "newemailtest@example.com",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.email).toContain("newemailtest@example.com");
    expect(response.body.data).toHaveProperty("createdAt");
    expect(response.body.data).toHaveProperty("updatedAt");

    expect(response.body.error).toBe(false);
    expect(response.body.message).toContain("success update subscribe");
    expect(response.body.status).toContain("success");
    expect(response.body.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("should reject if not authenticated", async () => {
    const dataSubscribe = await subscribe.getTestSubscribe();
    const response = await supertest(app).put(`/subscribe/${dataSubscribe.id}`);

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toContain("unauthenticated");
    expect(response.body.status).toContain("error");
    expect(response.body.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it("should reject if subscribe not found", async () => {
    const response = await supertest(app)
      .put("/subscribe/wrongid")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        email: "newemailtest@example.com",
      });

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toContain("subscribe not found");
    expect(response.body.status).toContain("error");
    expect(response.body.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });

  it("should reject if request is invalid", async () => {
    const dataSubscribe = await subscribe.getTestSubscribe();
    const response = await supertest(app)
      .put(`/subscribe/${dataSubscribe.id}`)
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        email: "",
      });

    expect(response.statusCode).toBe(403);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toContain("error validation");
    expect(response.body.message).toContain("email");
    expect(response.body.status).toContain("error");
    expect(response.body.statusCode).toBe(403);
    expect(response.body.success).toBe(false);
  });
});

describe("DELETE /subscribe/:id", () => {
  let token;

  beforeEach(async () => {
    await user.createTestUser();
    token = await user.getToken();
    await subscribe.createTestSubscribe();
  });

  afterEach(async () => {
    await subscribe.deleteTestSubscribe();
    await user.deleteTestUser();
  });

  it("should can delete subscribe by id", async () => {
    const dataSubscribe = await subscribe.getTestSubscribe();
    const response = await supertest(app)
      .delete(`/subscribe/${dataSubscribe.id}`)
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.message).toContain("success remove subscribe");
    expect(response.body.status).toContain("success");
    expect(response.body.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("should reject if not authenticated", async () => {
    const dataSubscribe = await subscribe.getTestSubscribe();
    const response = await supertest(app).delete(
      `/subscribe/${dataSubscribe.id}`,
    );

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toContain("unauthenticated");
    expect(response.body.status).toContain("error");
    expect(response.body.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it("should reject if subscribe not found", async () => {
    const response = await supertest(app)
      .delete("/subscribe/wrongid")
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toContain("subscribe not found");
    expect(response.body.status).toContain("error");
    expect(response.body.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });
});
