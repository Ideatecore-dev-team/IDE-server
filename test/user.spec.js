const supertest = require("supertest");
const app = require("../src/api/app");
const user = require("./utilities/user.util");

describe("POST /user/register", () => {
  afterEach(async () => {
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
      .send({ ...user.userData, email: "wrongemail" });

    expect(result.status).toBe(403);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("error validation");
    expect(result.body.message).toContain("email");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(403);
    expect(result.body.success).toBe(false);
  });
});

describe("POST /user/login", () => {
  beforeEach(async () => {
    await user.createTestUser();
  });

  afterEach(async () => {
    await user.deleteTestUser();
  });

  it("should can login user", async () => {
    const result = await supertest(app).post("/user/login").send({
      email: user.userData.email,
      password: user.userData.password,
    });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();

    expect(result.body.error).toBe(false);
    expect(result.body.message).toContain("success login user");
    expect(result.body.status).toContain("success");
    expect(result.body.statusCode).toBe(200);
    expect(result.body.success).toBe(true);
  });

  it("should reject if email is wrong", async () => {
    const result = await supertest(app).post("/user/login").send({
      email: "wrongemail@example.com",
      password: user.userData.password,
    });

    expect(result.status).toBe(401);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("email or password is wrong");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(401);
    expect(result.body.success).toBe(false);
  });

  it("should reject if password is wrong", async () => {
    const result = await supertest(app).post("/user/login").send({
      email: user.userData.email,
      password: "wrongpassword",
    });

    expect(result.status).toBe(401);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("email or password is wrong");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(401);
    expect(result.body.success).toBe(false);
  });

  it("should reject if email invalid", async () => {
    const result = await supertest(app).post("/user/login").send({
      email: "wrongemail",
      password: user.userData.password,
    });

    expect(result.status).toBe(403);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("error validation");
    expect(result.body.message).toContain("email");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(403);
    expect(result.body.success).toBe(false);
  });

  it("should reject if email and password is empty", async () => {
    const result = await supertest(app).post("/user/login").send({
      email: "",
      password: "",
    });

    expect(result.status).toBe(403);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("error validation");
    expect(result.body.message).toContain("email");
    expect(result.body.message).toContain("password");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(403);
    expect(result.body.success).toBe(false);
  });
});

describe("GET /user/getuser", () => {
  beforeEach(async () => {
    await user.createTestUser();
  });

  afterEach(async () => {
    await user.deleteTestUser();
  });

  it("should can get user", async () => {
    const token = await user.getToken();
    const result = await supertest(app)
      .get("/user/getuser")
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.email).toBe(user.userData.email);
    expect(result.body.data.name).toBe(user.userData.name);
    expect(result.body.data.password).toBeUndefined();
    expect(result.body.data).toHaveProperty("role");
    expect(result.body.data).toHaveProperty("createdAt");
    expect(result.body.data).toHaveProperty("updatedAt");

    expect(result.body.error).toBe(false);
    expect(result.body.message).toContain("success get user");
    expect(result.body.status).toContain("success");
    expect(result.body.statusCode).toBe(200);
    expect(result.body.success).toBe(true);
  });

  it("should reject if token is invalid", async () => {
    const result = await supertest(app)
      .get("/user/getuser")
      .set("Cookie", `authorization=Bearer wrongtoken`);

    expect(result.status).toBe(401);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("invalid token");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(401);
    expect(result.body.success).toBe(false);
  });

  it("should reject if token is empty", async () => {
    const result = await supertest(app).get("/user/getuser");

    expect(result.status).toBe(401);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("unauthorized");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(401);
    expect(result.body.success).toBe(false);
  });
});

describe("PUT /user/changepassword", () => {
  beforeEach(async () => {
    await user.createTestUser();
  });

  afterEach(async () => {
    await user.deleteTestUser();
  });

  it("should can change password", async () => {
    const token = await user.getToken();
    const result = await supertest(app)
      .put("/user/changepassword")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        oldPassword: user.userData.password,
        newPassword: "newpassword",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.email).toBe(user.userData.email);
    expect(result.body.data.name).toBe(user.userData.name);
    expect(result.body.data.password).toBeUndefined();
    expect(result.body.data).toHaveProperty("role");
    expect(result.body.data).toHaveProperty("createdAt");
    expect(result.body.data).toHaveProperty("updatedAt");

    expect(result.body.error).toBe(false);
    expect(result.body.message).toContain("success change password");
    expect(result.body.status).toContain("success");
    expect(result.body.statusCode).toBe(200);
    expect(result.body.success).toBe(true);
  });

  it("should reject if password is wrong", async () => {
    const token = await user.getToken();
    const result = await supertest(app)
      .put("/user/changepassword")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        oldPassword: "wrongpassword",
        newPassword: "newpassword",
      });

    expect(result.status).toBe(401);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("password is wrong");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(401);
    expect(result.body.success).toBe(false);
  });

  it("should reject if password is empty", async () => {
    const token = await user.getToken();
    const result = await supertest(app)
      .put("/user/changepassword")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        oldPassword: "",
        newPassword: "",
      });

    expect(result.status).toBe(403);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("error validation");
    expect(result.body.message).toContain("oldPassword");
    expect(result.body.message).toContain("newPassword");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(403);
    expect(result.body.success).toBe(false);
  });
});

describe("DELETE /user/logout", () => {
  beforeEach(async () => {
    await user.createTestUser();
  });

  afterEach(async () => {
    await user.deleteTestUser();
  });

  it("should can logout user", async () => {
    const token = await user.getToken();
    const result = await supertest(app)
      .delete("/user/logout")
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(200);
    expect(result.body.data).toBeNull();

    expect(result.body.error).toBe(false);
    expect(result.body.message).toContain("success logout user");
    expect(result.body.status).toContain("success");
    expect(result.body.statusCode).toBe(200);
    expect(result.body.success).toBe(true);
  });
});
