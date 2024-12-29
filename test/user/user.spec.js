const supertest = require("supertest");
const app = require("../../src/api/app");
const user = require("./utility");

describe("POST /user/register", () => {
  beforeEach(async () => {
    await user.deleteTestUser();
  });

  it("should can register new user", async () => {
    const result = await supertest(app)
      .post("/user/register")
      .send(user.userData);

    expect(result.status).toBe(201);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.email).toContain("emailtest@example.com");
    expect(result.body.data.name).toContain("nametest");
    expect(result.body.data.password).toBeUndefined();
    expect(result.body.data).toHaveProperty("role");
    expect(result.body.data).toHaveProperty("createdAt");
    expect(result.body.data).toHaveProperty("updatedAt");

    expect(result.body.error).toBe(false);
    expect(result.body.message).toContain("success register user");
    expect(result.body.status).toContain("success");
    expect(result.body.statusCode).toBe(201);
    expect(result.body.success).toBe(true);
  });

  it("should reject if request is invalid", async () => {
    const result = await supertest(app).post("/user/register").send({
      email: "",
      name: "",
      password: "",
    });

    expect(result.status).toBe(403);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("error validation");
    expect(result.body.message).toContain("email");
    expect(result.body.message).toContain("password");
    expect(result.body.message).toContain("name");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(403);
    expect(result.body.success).toBe(false);
  });

  it("should reject if email is already registered", async () => {
    await user.createTestUser();
    const result = await supertest(app)
      .post("/user/register")
      .send(user.userData);

    expect(result.status).toBe(400);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("email already exist");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(400);
    expect(result.body.success).toBe(false);
  });

  it("should reject if email is invalid", async () => {
    const result = await supertest(app)
      .post("/user/register")
      .send({ ...user.userData, email: "test" });

    expect(result.status).toBe(403);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("error validation");
    expect(result.body.message).toContain("email");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(403);
    expect(result.body.success).toBe(false);
  });
});

