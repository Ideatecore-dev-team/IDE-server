const supertest = require("supertest");
const app = require("../src/api/app");
const user = require("./utilities/user.util");

describe("POST /login", () => {
  beforeEach(async () => {
    await user.createTestUser();
  });

  afterEach(async () => {
    await user.deleteTestUser();
  });

  it("should can login", async () => {
    const result = await supertest(app).post("/login").send({
      email: user.userData.email,
      password: user.userData.password,
    });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.email).toContain("emailtest@example.com");
    expect(result.body.data.name).toContain("nametest");
    expect(result.body.data.password).toBeUndefined();
    expect(result.body.data.role).toBe("ADMIN");
    expect(result.body.data).toHaveProperty("createdAt");
    expect(result.body.data).toHaveProperty("updatedAt");
    expect(result.body.data).toHaveProperty("token");

    expect(result.body.error).toBe(false);
    expect(result.body.message).toContain("success login user");
    expect(result.body.status).toContain("success");
    expect(result.body.statusCode).toBe(200);
    expect(result.body.success).toBe(true);
  });

  it("should reject if request is invalid", async () => {
    const result = await supertest(app).post("/login").send({
      email: "",
      password: "",
    });

    expect(result.status).toBe(403);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("error validation");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(403);
    expect(result.body.success).toBe(false);
  });

  it("should reject if user password is wrong", async () => {
    const result = await supertest(app).post("/login").send({
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

  it("should reject if user email is wrong", async () => {
    const result = await supertest(app).post("/login").send({
      email: "wrongemail@mail.com",
      password: user.userData.password,
    });

    expect(result.status).toBe(401);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("email or password is wrong");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(401);
    expect(result.body.success).toBe(false);
  });
});

describe("DELETE /logout", () => {
  let token;
  beforeEach(async () => {
    await user.createTestUser();
    token = await user.getToken();
  });

  afterEach(async () => {
    await user.deleteTestUser();
  });

  it("should can logout", async () => {
    const result = await supertest(app)
      .delete("/logout")
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(200);
    expect(result.body.error).toBe(false);
    expect(result.body.message).toContain("success logout user");
    expect(result.body.status).toContain("success");
    expect(result.body.statusCode).toBe(200);
    expect(result.body.success).toBe(true);
  });

  it("should reject if not authenticated", async () => {
    const result = await supertest(app).delete("/logout");

    expect(result.status).toBe(401);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("unauthenticated");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(401);
    expect(result.body.success).toBe(false);
  });
});

describe("PUT /changepassword", () => {
  let token;
  beforeEach(async () => {
    await user.createTestUser();
    token = await user.getToken();
  });

  afterEach(async () => {
    await user.deleteTestUser();
  });

  it("should can change password", async () => {
    const result = await supertest(app)
      .put("/changepassword")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        oldPassword: user.userData.password,
        newPassword: "newpassword",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.email).toContain("emailtest@example.com");
    expect(result.body.data.name).toContain("nametest");
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

  it("should reject if request is invalid", async () => {
    const result = await supertest(app)
      .put("/changepassword")
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

  it("should reject if old password is wrong", async () => {
    const result = await supertest(app)
      .put("/changepassword")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        oldPassword: "wrongpassword",
        newPassword: "newpassword",
      });

    expect(result.status).toBe(401);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("old password is wrong");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(401);
    expect(result.body.success).toBe(false);
  });
});

describe("GET /getuser", () => {
  let token;
  beforeEach(async () => {
    await user.createTestUser();
    token = await user.getToken();
  });

  afterEach(async () => {
    await user.deleteTestUser();
  });

  it("should can get user", async () => {
    const result = await supertest(app)
      .get("/getuser")
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.email).toContain("emailtest@example.com");
    expect(result.body.data.name).toContain("nametest");
    expect(result.body.data.password).toBeUndefined();
    expect(result.body.data.role).toBe("ADMIN");
    expect(result.body.data).toHaveProperty("createdAt");
    expect(result.body.data).toHaveProperty("updatedAt");

    expect(result.body.error).toBe(false);
    expect(result.body.message).toContain("success get user");
    expect(result.body.status).toContain("success");
    expect(result.body.statusCode).toBe(200);
    expect(result.body.success).toBe(true);
  });

  it("should reject if not authenticated", async () => {
    const result = await supertest(app).get("/getuser");

    expect(result.status).toBe(401);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("unauthenticated");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(401);
    expect(result.body.success).toBe(false);
  });
});
