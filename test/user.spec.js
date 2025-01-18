const supertest = require("supertest");
const app = require("../src/api/app");
const user = require("./utilities/user.util");

describe("POST /user", () => {
  let token;

  beforeEach(async () => {
    await user.createSuperAdmin();
    token = await user.getSuperAdminToken();
  });

  afterEach(async () => {
    await user.deleteTestUser();
    await user.deleteSuperAdmin();
  });

  it("should can register new user", async () => {
    const result = await supertest(app)
      .post("/user")
      .set("Cookie", `authorization=Bearer ${token}`)
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
    const result = await supertest(app)
      .post("/user")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
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
      .post("/user")
      .set("Cookie", `authorization=Bearer ${token}`)
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
      .post("/user")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({ ...user.userData, email: "wrongemail" });

    expect(result.status).toBe(403);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("error validation");
    expect(result.body.message).toContain("email");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(403);
    expect(result.body.success).toBe(false);
  });

  it("should reject if not super admin", async () => {
    await user.createTestUser();
    const adminToken = await user.getToken();

    const result = await supertest(app)
      .post("/user")
      .set("Cookie", `authorization=Bearer ${adminToken}`)
      .send({
        email: "emailtest2@example.com",
        name: "nametest",
        password: "passwordtest",
      });

    expect(result.status).toBe(401);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("unauthorized");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(401);
    expect(result.body.success).toBe(false);
  });
});

describe("GET /user", () => {
  let token;

  beforeEach(async () => {
    await user.createSuperAdmin();
    await user.createTestUser();
    token = await user.getSuperAdminToken();
  });

  afterEach(async () => {
    await user.deleteTestUser();
    await user.deleteSuperAdmin();
  });

  it("should can get all user", async () => {
    const result = await supertest(app)
      .get("/user")
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(200);
    expect(result.body.data).toBeInstanceOf(Array);
    expect(result.body.data[1].id).toBeDefined();
    expect(result.body.data[1].email).toContain("emailtest@example.com");
    expect(result.body.data[1].name).toContain("nametest");
    expect(result.body.data[1].password).toBeUndefined();
    expect(result.body.data[1].role).toBe("ADMIN");
    expect(result.body.data[1].createdAt).toBeDefined();
    expect(result.body.data[1].updatedAt).toBeDefined();

    expect(result.body.error).toBe(false);
    expect(result.body.message).toContain("success get all user");
    expect(result.body.status).toContain("success");
    expect(result.body.statusCode).toBe(200);
    expect(result.body.success).toBe(true);
  });

  it("should reject if not super admin", async () => {
    const adminToken = await user.getToken();
    const result = await supertest(app)
      .get("/user")
      .set("Cookie", `authorization=Bearer ${adminToken}`);

    expect(result.status).toBe(401);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("unauthorized");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(401);
    expect(result.body.success).toBe(false);
  });
});

describe("GET /user/:id", () => {
  let token;

  beforeEach(async () => {
    await user.createSuperAdmin();
    await user.createTestUser();
    token = await user.getSuperAdminToken();
  });

  afterEach(async () => {
    await user.deleteTestUser();
    await user.deleteSuperAdmin();
  });

  it("should can get user by id", async () => {
    const dataUser = await user.getTestUser();
    const result = await supertest(app)
      .get(`/user/${dataUser.id}`)
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.email).toContain("emailtest@example.com");
    expect(result.body.data.name).toContain("nametest");
    expect(result.body.data.password).toBeUndefined();
    expect(result.body.data.role).toBe("ADMIN");
    expect(result.body.data.createdAt).toBeDefined();
    expect(result.body.data.updatedAt).toBeDefined();

    expect(result.body.error).toBe(false);
    expect(result.body.message).toContain("success get user by id");
    expect(result.body.status).toContain("success");
    expect(result.body.statusCode).toBe(200);
    expect(result.body.success).toBe(true);
  });

  it("should reject if not super admin", async () => {
    const adminToken = await user.getToken();
    const dataUser = await user.getTestUser();
    const result = await supertest(app)
      .get(`/user/${dataUser.id}`)
      .set("Cookie", `authorization=Bearer ${adminToken}`);

    expect(result.status).toBe(401);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("unauthorized");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(401);
    expect(result.body.success).toBe(false);
  });

  it("should reject if user not found", async () => {
    const token = await user.getSuperAdminToken();
    const result = await supertest(app)
      .get("/user/wrongid")
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(404);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("user not found");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(404);
    expect(result.body.success).toBe(false);
  });
});

describe("PUT /user/:id", () => {
  let token;

  beforeEach(async () => {
    await user.createSuperAdmin();
    await user.createTestUser();
    token = await user.getSuperAdminToken();
  });

  afterEach(async () => {
    await user.deleteTestUser();
    await user.deleteSuperAdmin();
  });

  it("should can update user by id", async () => {
    const dataUser = await user.getTestUser();
    const result = await supertest(app)
      .put(`/user/${dataUser.id}`)
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        name: "new nametest",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.email).toContain("emailtest@example.com");
    expect(result.body.data.name).toContain("new nametest");
    expect(result.body.data.password).toBeUndefined();
    expect(result.body.data.role).toBe("ADMIN");
    expect(result.body.data.createdAt).toBeDefined();
    expect(result.body.data.updatedAt).toBeDefined();

    expect(result.body.error).toBe(false);
    expect(result.body.message).toContain("success update user by id");
    expect(result.body.status).toContain("success");
    expect(result.body.statusCode).toBe(200);
    expect(result.body.success).toBe(true);
  });

  it("should reject if not super admin", async () => {
    const adminToken = await user.getToken();
    const dataUser = await user.getTestUser();
    const result = await supertest(app)
      .put(`/user/${dataUser.id}`)
      .set("Cookie", `authorization=Bearer ${adminToken}`)
      .send({
        name: "new nametest",
      });

    expect(result.status).toBe(401);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("unauthorized");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(401);
    expect(result.body.success).toBe(false);
  });

  it("should reject if user not found", async () => {
    const token = await user.getSuperAdminToken();
    const result = await supertest(app)
      .put("/user/wrongid")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        name: "new nametest",
      });

    expect(result.status).toBe(404);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("user not found");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(404);
    expect(result.body.success).toBe(false);
  });

  it("should reject if request is empty", async () => {
    const token = await user.getSuperAdminToken();
    const dataUser = await user.getTestUser();
    const result = await supertest(app)
      .put(`/user/${dataUser.id}`)
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({ name: "" });

    expect(result.status).toBe(403);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("error validation");
    expect(result.body.message).toContain("name");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(403);
    expect(result.body.success).toBe(false);
  });
});

describe("PUT /user/:id/password", () => {
  let token;

  beforeEach(async () => {
    await user.createSuperAdmin();
    await user.createTestUser();
    token = await user.getSuperAdminToken();
  });

  afterEach(async () => {
    await user.deleteTestUser();
    await user.deleteSuperAdmin();
  });

  it("should can update password user by id", async () => {
    const dataUser = await user.getTestUser();
    const result = await supertest(app)
      .put(`/user/${dataUser.id}/password`)
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        password: "new password",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.email).toContain("emailtest@example.com");
    expect(result.body.data.name).toContain("nametest");
    expect(result.body.data.password).toBeUndefined();
    expect(result.body.data.role).toBe("ADMIN");
    expect(result.body.data.createdAt).toBeDefined();
    expect(result.body.data.updatedAt).toBeDefined();

    expect(result.body.error).toBe(false);
    expect(result.body.message).toContain("success update password by id");
    expect(result.body.status).toContain("success");
    expect(result.body.statusCode).toBe(200);
    expect(result.body.success).toBe(true);
  });

  it("should reject if not super admin", async () => {
    const adminToken = await user.getToken();
    const dataUser = await user.getTestUser();
    const result = await supertest(app)
      .put(`/user/${dataUser.id}/password`)
      .set("Cookie", `authorization=Bearer ${adminToken}`)
      .send({
        password: "new password",
      });

    expect(result.status).toBe(401);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("unauthorized");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(401);
    expect(result.body.success).toBe(false);
  });

  it("should reject if user not found", async () => {
    const token = await user.getSuperAdminToken();
    const result = await supertest(app)
      .put("/user/wrongid/password")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        password: "new password",
      });

    expect(result.status).toBe(404);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("user not found");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(404);
    expect(result.body.success).toBe(false);
  });

  it("should reject if request is empty", async () => {
    const token = await user.getSuperAdminToken();
    const dataUser = await user.getTestUser();
    const result = await supertest(app)
      .put(`/user/${dataUser.id}/password`)
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({ password: "" });

    expect(result.status).toBe(403);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("error validation");
    expect(result.body.message).toContain("password");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(403);
    expect(result.body.success).toBe(false);
  });
});

describe("DELETE /user/:id", () => {
  let token;

  beforeEach(async () => {
    await user.createSuperAdmin();
    await user.createTestUser();
    token = await user.getSuperAdminToken();
  });

  afterEach(async () => {
    await user.deleteTestUser();
    await user.deleteSuperAdmin();
  });

  it("should can delete user by id", async () => {
    const dataUser = await user.getTestUser();
    const result = await supertest(app)
      .delete(`/user/${dataUser.id}`)
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.email).toContain("emailtest@example.com");
    expect(result.body.data.name).toContain("nametest");
    expect(result.body.data.password).toBeUndefined();
    expect(result.body.data.role).toBe("ADMIN");
    expect(result.body.data.createdAt).toBeDefined();
    expect(result.body.data.updatedAt).toBeDefined();

    expect(result.body.error).toBe(false);
    expect(result.body.message).toContain("success remove user by id");
    expect(result.body.status).toContain("success");
    expect(result.body.statusCode).toBe(200);
    expect(result.body.success).toBe(true);
  });

  it("should reject if not super admin", async () => {
    const adminToken = await user.getToken();
    const dataUser = await user.getTestUser();
    const result = await supertest(app)
      .delete(`/user/${dataUser.id}`)
      .set("Cookie", `authorization=Bearer ${adminToken}`);

    expect(result.status).toBe(401);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("unauthorized");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(401);
    expect(result.body.success).toBe(false);
  });

  it("should reject if user not found", async () => {
    const token = await user.getSuperAdminToken();
    const result = await supertest(app)
      .delete("/user/wrongid")
      .set("Cookie", `authorization=Bearer ${token}`);
    expect(result.status).toBe(404);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("user not found");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(404);
    expect(result.body.success).toBe(false);
  });
});
