const supertest = require("supertest");
const app = require("../src/api/app");
const user = require("./utilities/user.util");
const partner = require("./utilities/partner.util");

// POST
describe("POST /partner", () => {
  let token;
  let partnerData;
  beforeEach(async () => {
    await user.createTestUser();
    token = await user.getToken();
    partnerData = partner.partnerData;
  });

  afterEach(async () => {
    await partner.removeTestPartner();
    await user.deleteTestUser();
  });

  it("should can create partner", async () => {
    const result = await supertest(app)
      .post("/partner")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send(partnerData);

    expect(result.status).toBe(201);
    expect(result.body.data.name).toBe(partnerData.name);
    expect(result.body.data.image).toBe(partnerData.image);
    expect(result.body.data.link).toBe(partnerData.link);

    expect(result.body.data).toHaveProperty("createdAt");
    expect(result.body.data).toHaveProperty("updatedAt");

    expect(result.body.error).toBe(false);
    expect(result.body.message).toBe("success create a partner");
    expect(result.body.status).toBe("success");
    expect(result.body.statusCode).toBe(201);
    expect(result.body.success).toBe(true);
  });

  it("should reject if data is empty", async () => {
    const result = await supertest(app)
      .post("/partner")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({});

    expect(result.status).toBe(403);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("error validation");
    expect(result.body.message).toContain("name");
    expect(result.body.message).toContain("image");
    expect(result.body.message).toContain("link");
    expect(result.body.statusCode).toBe(403);
    expect(result.body.success).toBe(false);
  });

  it("should reject if name is already exist", async () => {
    await partner.createTestPartner();

    const result = await supertest(app)
      .post("/partner")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send(partnerData);

    expect(result.status).toBe(400);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("partner already exist");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(400);
    expect(result.body.success).toBe(false);
  });
});

// GET ALL
describe("GET /partner", () => {
  let token;
  let partnerData;
  beforeEach(async () => {
    await user.createTestUser();
    await partner.createTestPartner();
    token = await user.getToken();
    partnerData = partner.partnerData;
  });

  afterEach(async () => {
    await partner.removeTestPartner();
    await user.deleteTestUser();
  });

  it("should can get all partner", async () => {
    const result = await supertest(app)
      .get("/partner")
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(200);
    expect(result.body.data[0].name).toBe(partnerData.name);
    expect(result.body.data[0].image).toBe(partnerData.image);
    expect(result.body.data[0].link).toBe(partnerData.link);

    expect(result.body.data[0]).toHaveProperty("createdAt");
    expect(result.body.data[0]).toHaveProperty("updatedAt");

    expect(result.body.error).toBe(false);
    expect(result.body.message).toBe("success get all partner");
    expect(result.body.status).toBe("success");
    expect(result.body.statusCode).toBe(200);
    expect(result.body.success).toBe(true);
  });

  it("should reject if data is empty", async () => {
    await partner.removeTestPartner();
    const result = await supertest(app)
      .get("/partner")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({});

    expect(result.status).toBe(404);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("partner not found");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(404);
    expect(result.body.success).toBe(false);
  });
});

// GET /:partnerId
describe("GET /partner/:partnerId", () => {
  let token;
  let partnerData;
  beforeEach(async () => {
    await user.createTestUser();
    await partner.createTestPartner();
    token = await user.getToken();
    partnerData = partner.partnerData;
  });

  afterEach(async () => {
    await partner.removeTestPartner();
    await user.deleteTestUser();
  });

  it("should can get partner by id", async () => {
    const dataPartner = await partner.getTestPartner();
    const result = await supertest(app)
      .get(`/partner/${dataPartner.id}`)
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(200);
    expect(result.body.data.name).toBe(partnerData.name);
    expect(result.body.data.image).toBe(partnerData.image);
    expect(result.body.data.link).toBe(partnerData.link);

    expect(result.body.data).toHaveProperty("createdAt");
    expect(result.body.data).toHaveProperty("updatedAt");

    expect(result.body.error).toBe(false);
    expect(result.body.message).toBe("success get partner by id");
    expect(result.body.status).toBe("success");
    expect(result.body.statusCode).toBe(200);
    expect(result.body.success).toBe(true);
  });

  it("should reject if data is empty", async () => {
    await partner.removeTestPartner();
    const result = await supertest(app)
      .get("/partner/:partnerId")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({});

    expect(result.status).toBe(404);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("partner not found");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(404);
    expect(result.body.success).toBe(false);
  });
});

// UPDATE
describe("PUT /partner/:partnerId", () => {
  let token;
  let partnerData;
  beforeEach(async () => {
    await user.createTestUser();
    await partner.createTestPartner();
    token = await user.getToken();
    partnerData = partner.partnerData;
  });

  afterEach(async () => {
    await partner.removeTestPartner();
    await user.deleteTestUser();
  });

  it("should can update partner", async () => {
    const dataPartner = await partner.getTestPartner();
    const result = await supertest(app)
      .put(`/partner/${dataPartner.id}`)
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        name: "new name",
        image: "new image",
        link: "new link",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.name).toBe("new name");
    expect(result.body.data.image).toBe("new image");
    expect(result.body.data.link).toBe("new link");

    expect(result.body.data).toHaveProperty("createdAt");
    expect(result.body.data).toHaveProperty("updatedAt");

    expect(result.body.error).toBe(false);
    expect(result.body.message).toBe("success update a partner");
    expect(result.body.status).toBe("success");
    expect(result.body.statusCode).toBe(200);
    expect(result.body.success).toBe(true);
  });

  it("should reject if id is wrong", async () => {
    await partner.removeTestPartner();
    const result = await supertest(app)
      .put("/partner/:partnerId")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({
        name: "new name",
        image: "new image",
        link: "new link",
      });

    expect(result.status).toBe(404);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("partner not found");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(404);
    expect(result.body.success).toBe(false);
  });

  it("should reject if id is wrong", async () => {
    await partner.removeTestPartner();
    const result = await supertest(app)
      .put("/partner/:partnerId")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send();

    expect(result.status).toBe(403);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("error validation");
    expect(result.body.message).toContain("name");
    expect(result.body.message).toContain("image");
    expect(result.body.message).toContain("link");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(403);
    expect(result.body.success).toBe(false);
  });
});

// DELETE
describe("DELETE /partner/:partnerId", () => {
  let token;
  let partnerData;
  beforeEach(async () => {
    await user.createTestUser();
    await partner.createTestPartner();
    token = await user.getToken();
    partnerData = partner.partnerData;
  });

  afterEach(async () => {
    await partner.removeTestPartner();
    await user.deleteTestUser();
  });

  it("should can delete partner", async () => {
    const dataPartner = await partner.getTestPartner();
    const result = await supertest(app)
      .delete(`/partner/${dataPartner.id}`)
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("success remove a partner");
    expect(result.body.status).toBe("success");
    expect(result.body.statusCode).toBe(200);
    expect(result.body.success).toBe(true);
  });

  it("should reject if id is wrong", async () => {
    await partner.removeTestPartner();
    const result = await supertest(app)
      .delete("/partner/:partnerId")
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(404);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("partner not found");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(404);
    expect(result.body.success).toBe(false);
  });
});
