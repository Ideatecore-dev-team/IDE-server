const supertest = require("supertest");
const app = require("../src/api/app");
const user = require("./utilities/user.util");
const contactUs = require("./utilities/contactUs.util");

describe("POST /contactUs", () => {
  afterEach(async () => {
    await contactUs.deleteTestContactUs();
  });

  it("should create contactUs", async () => {
    const response = await supertest(app)
      .post("/contactus")
      .send(contactUs.contactUsData);

    expect(response.statusCode).toBe(201);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.firstName).toContain("firstName");
    expect(response.body.data.lastName).toContain("lastName");
    expect(response.body.data.email).toContain("emailtest@example.com");
    expect(response.body.data.message).toContain("testMessage");
    expect(response.body.data).toHaveProperty("createdAt");
    expect(response.body.data).toHaveProperty("updatedAt");

    expect(response.body.error).toBe(false);
    expect(response.body.message).toContain("success create contact us");
    expect(response.body.status).toContain("success");
    expect(response.body.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
  });

  it("should reject if email is invalid", async () => {
    const response = await supertest(app).post("/contactus").send({
      firstName: "firstName",
      lastName: "lastName",
      email: "wrongemail",
      message: "testMessage",
    });

    expect(response.statusCode).toBe(403);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toContain("error validation");
    expect(response.body.message).toContain("email");
    expect(response.body.status).toContain("error");
    expect(response.body.statusCode).toBe(403);
    expect(response.body.success).toBe(false);
  });

  it("should reject if request is empty", async () => {
    const response = await supertest(app).post("/contactus").send({
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    });

    expect(response.statusCode).toBe(403);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toContain("error validation");
    expect(response.body.message).toContain("email");
    expect(response.body.message).toContain("firstName");
    expect(response.body.message).toContain("lastName");
    expect(response.body.message).toContain("message");
    expect(response.body.status).toContain("error");
    expect(response.body.statusCode).toBe(403);
    expect(response.body.success).toBe(false);
  });
});

describe("GET /contactUs", () => {
  let token;

  beforeEach(async () => {
    await user.createTestUser();
    token = await user.getToken();
    await contactUs.createTestContactUs();
  });

  afterEach(async () => {
    await contactUs.deleteTestContactUs();
    await user.deleteTestUser();
  });

  it("should can get all contactUs", async () => {
    const response = await supertest(app)
      .get("/contactus")
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data[0].id).toBeDefined();
    expect(response.body.data[0].firstName).toContain("firstName");
    expect(response.body.data[0].lastName).toContain("lastName");
    expect(response.body.data[0].email).toContain("emailtest@example.com");
    expect(response.body.data[0].message).toContain("testMessage");
    expect(response.body.data[0].createdAt).toBeDefined();
    expect(response.body.data[0].updatedAt).toBeDefined();

    expect(response.body.error).toBe(false);
    expect(response.body.message).toContain("success get all contact us");
    expect(response.body.status).toContain("success");
    expect(response.body.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("should reject if not authenticated", async () => {
    const response = await supertest(app).get("/contactus");

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toContain("unauthenticated");
    expect(response.body.status).toContain("error");
    expect(response.body.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it("should reject if contactUs not found", async () => {
    await contactUs.deleteTestContactUs();
    const response = await supertest(app)
      .get("/contactus")
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toContain("contact us not found");
    expect(response.body.status).toContain("error");
    expect(response.body.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });
});

describe("GET /contactUs/:id", () => {
  let token;
  let contactData;

  beforeEach(async () => {
    await user.createTestUser();
    token = await user.getToken();
    await contactUs.createTestContactUs();
    contactData = await contactUs.getTestContactUs();
  });

  afterEach(async () => {
    await contactUs.deleteTestContactUs();
    await user.deleteTestUser();
  });

  it("should can get contactUs by id", async () => {
    const response = await supertest(app)
      .get(`/contactus/${contactData.id}`)
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.firstName).toContain("firstName");
    expect(response.body.data.lastName).toContain("lastName");
    expect(response.body.data.email).toContain("emailtest@example.com");
    expect(response.body.data.message).toContain("testMessage");
    expect(response.body.data).toHaveProperty("createdAt");
    expect(response.body.data).toHaveProperty("updatedAt");

    expect(response.body.error).toBe(false);
    expect(response.body.message).toContain("success get contact us by id");
    expect(response.body.status).toContain("success");
    expect(response.body.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("should reject if not authenticated", async () => {
    const response = await supertest(app).get(`/contactus/${contactData.id}`);

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toContain("unauthenticated");
    expect(response.body.status).toContain("error");
    expect(response.body.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it("should reject if contactUs not found", async () => {
    const response = await supertest(app)
      .get("/contactus/wrongid")
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toContain("contact us not found");
    expect(response.body.status).toContain("error");
    expect(response.body.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });
});

describe("PUT /contactUs/:id", () => {
  let token;
  let contactData;

  beforeEach(async () => {
    await user.createTestUser();
    token = await user.getToken();
    await contactUs.createTestContactUs();
    contactData = await contactUs.getTestContactUs();
  });

  afterEach(async () => {
    await contactUs.deleteTestContactUs();
    await user.deleteTestUser();
  });

  it("should can update contactUs by id", async () => {
    const response = await supertest(app)
      .put(`/contactus/${contactData.id}`)
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        firstName: "newFirstName",
        lastName: "newLastName",
        message: "newMessage",
        email: "newemailtest@example.com",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.firstName).toContain("newFirstName");
    expect(response.body.data.lastName).toContain("newLastName");
    expect(response.body.data.email).toContain("newemailtest@example.com");
    expect(response.body.data.message).toContain("newMessage");
    expect(response.body.data).toHaveProperty("createdAt");
    expect(response.body.data).toHaveProperty("updatedAt");

    expect(response.body.error).toBe(false);
    expect(response.body.message).toContain("success update contact us");
    expect(response.body.status).toContain("success");
    expect(response.body.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("should reject if not authenticated", async () => {
    const response = await supertest(app).put(`/contactus/${contactData.id}`);

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toContain("unauthenticated");
    expect(response.body.status).toContain("error");
    expect(response.body.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it("should reject if contactUs not found", async () => {
    const response = await supertest(app)
      .put("/contactus/wrongid")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        firstName: "newFirstName",
        lastName: "newLastName",
        message: "newMessage",
        email: "newemailtest@example.com",
      });

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toContain("contact us not found");
    expect(response.body.status).toContain("error");
    expect(response.body.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });

  it("should reject if request is empty", async () => {
    const response = await supertest(app)
      .put(`/contactus/${contactData.id}`)
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        firstName: "",
        lastName: "",
        message: "",
        email: "",
      });

    expect(response.statusCode).toBe(403);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toContain("error validation");
    expect(response.body.message).toContain("email");
    expect(response.body.message).toContain("firstName");
    expect(response.body.message).toContain("lastName");
    expect(response.body.message).toContain("message");
    expect(response.body.status).toContain("error");
    expect(response.body.statusCode).toBe(403);
    expect(response.body.success).toBe(false);
  });
});

describe("DELETE /contactUs/:id", () => {
  let token;
  let contactData;

  beforeEach(async () => {
    await user.createTestUser();
    token = await user.getToken();
    await contactUs.createTestContactUs();
    contactData = await contactUs.getTestContactUs();
  });

  afterEach(async () => {
    await contactUs.deleteTestContactUs();
    await user.deleteTestUser();
  });

  it("should can delete contactUs by id", async () => {
    const response = await supertest(app)
      .delete(`/contactus/${contactData.id}`)
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.message).toContain("success remove contact us");
    expect(response.body.status).toContain("success");
    expect(response.body.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("should reject if not authenticated", async () => {
    const response = await supertest(app).delete(
      `/contactus/${contactData.id}`,
    );

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toContain("unauthenticated");
    expect(response.body.status).toContain("error");
    expect(response.body.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it("should reject if contactUs not found", async () => {
    const response = await supertest(app)
      .delete("/contactus/wrongid")
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toContain("contact us not found");
    expect(response.body.status).toContain("error");
    expect(response.body.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });
});
