const supertest = require("supertest");
const app = require("../src/api/app");
const user = require("./utilities/user.util");
const companyInfo = require("./utilities/companyInfo.util");

// const companyInfoData = {
//     name: "Company Name",
//     description: "Company Description",
//     title: "Company Title",
//     image: "Company Image",
//     Phone: "Company Phone",
//     Email: "Company Email",
//     Address: "Company Address",
//     Facebook: "Company Facebook",
//     Instagram: "Company Instagram",
//     Twitter: "Company Twitter",
//     Linkedin: "Company Linkedin",
//     Youtube: "Company Youtube",
//     Tiktok: "Company Tiktok",
//   };
// POST
describe("POST /companyInfo", () => {
  let token;
  let companyInfoData;

  beforeEach(async () => {
    await user.createTestUser();
    token = await user.getToken();
    companyInfoData = companyInfo.companyInfoData;
  });

  afterEach(async () => {
    await companyInfo.removeTestCompanyInfo();
    await user.deleteTestUser();
  });

  it("should can create companyInfo", async () => {
    const result = await supertest(app)
      .post("/companyInfo")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send(companyInfoData);

    expect(result.status).toBe(201);
    expect(result.body.data).toHaveProperty("id");
    expect(result.body.data).toHaveProperty("createdAt");
    expect(result.body.data).toHaveProperty("updatedAt");
    expect(result.body.error).toBe(false);
    expect(result.body.message).toContain("success create company info");
    expect(result.body.status).toContain("success");

    expect(result.body.data.name).toBe(companyInfoData.name);
    expect(result.body.data.description).toBe(companyInfoData.description);
    expect(result.body.data.title).toBe(companyInfoData.title);
    expect(result.body.data.image).toBe(companyInfoData.image);
    expect(result.body.data.Phone).toBe(companyInfoData.Phone);
    expect(result.body.data.Email).toBe(companyInfoData.Email);
    expect(result.body.data.Address).toBe(companyInfoData.Address);
    expect(result.body.data.Facebook).toBe(companyInfoData.Facebook);
    expect(result.body.data.Instagram).toBe(companyInfoData.Instagram);
    expect(result.body.data.Twitter).toBe(companyInfoData.Twitter);
    expect(result.body.data.Linkedin).toBe(companyInfoData.Linkedin);
    expect(result.body.data.Youtube).toBe(companyInfoData.Youtube);
    expect(result.body.data.Tiktok).toBe(companyInfoData.Tiktok);
  });

  it("should can't create companyInfo", async () => {
    await companyInfo.createTestCompanyInfo();

    const result = await supertest(app)
      .post("/companyInfo")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send(companyInfoData);

    expect(result.status).toBe(400);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("company info already exist");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(400);
    expect(result.body.success).toBe(false);
  });
});

// GET
describe("GET /companyInfo", () => {
  let token;
  let companyInfoData;

  beforeEach(async () => {
    await user.createTestUser();
    await companyInfo.createTestCompanyInfo();
    token = await user.getToken();
    companyInfoData = companyInfo.companyInfoData;
  });

  afterEach(async () => {
    await companyInfo.removeTestCompanyInfo();
    await user.deleteTestUser();
  });

  it("should can get companyInfo", async () => {
    const result = await supertest(app)
      .get("/companyInfo")
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(200);
    expect(result.body.data).toHaveProperty("id");
    expect(result.body.data).toHaveProperty("createdAt");
    expect(result.body.data).toHaveProperty("updatedAt");
    expect(result.body.error).toBe(false);
    expect(result.body.message).toContain("success get company info");
    expect(result.body.status).toContain("success");

    expect(result.body.data.name).toBe(companyInfoData.name);
    expect(result.body.data.description).toBe(companyInfoData.description);
    expect(result.body.data.title).toBe(companyInfoData.title);
    expect(result.body.data.image).toBe(companyInfoData.image);
    expect(result.body.data.Phone).toBe(companyInfoData.Phone);
    expect(result.body.data.Email).toBe(companyInfoData.Email);
    expect(result.body.data.Address).toBe(companyInfoData.Address);
    expect(result.body.data.Facebook).toBe(companyInfoData.Facebook);
    expect(result.body.data.Instagram).toBe(companyInfoData.Instagram);
    expect(result.body.data.Twitter).toBe(companyInfoData.Twitter);
    expect(result.body.data.Linkedin).toBe(companyInfoData.Linkedin);
    expect(result.body.data.Youtube).toBe(companyInfoData.Youtube);
    expect(result.body.data.Tiktok).toBe(companyInfoData.Tiktok);
  });

  it("should reject get companyInfo", async () => {
    await companyInfo.removeTestCompanyInfo();

    const result = await supertest(app)
      .get("/companyInfo")
      .set("Cookie", `authorization=Bearer ${token}`);

    expect(result.status).toBe(404);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("company info not found");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(404);
    expect(result.body.success).toBe(false);
  });
});

// UPDATE
describe("PUT /companyInfo/:id", () => {
  let token;
  let companyInfoData;

  beforeEach(async () => {
    await user.createTestUser();
    await companyInfo.createTestCompanyInfo();
    token = await user.getToken();
    companyInfoData = companyInfo.companyInfoData;
  });

  afterEach(async () => {
    await companyInfo.removeTestCompanyInfo();
    await user.deleteTestUser();
  });

  it("should can update companyInfo", async () => {
    const companyInfoId = await companyInfo.getTestCompanyInfo();
    const result = await supertest(app)
      .put("/companyInfo")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({ id: companyInfoId.id, ...companyInfoData });

    expect(result.status).toBe(200);
    expect(result.body.data).toHaveProperty("id");
    expect(result.body.data).toHaveProperty("createdAt");
    expect(result.body.data).toHaveProperty("updatedAt");
    expect(result.body.error).toBe(false);
    expect(result.body.message).toContain("success update company info");
    expect(result.body.status).toContain("success");

    expect(result.body.data.name).toBe(companyInfoData.name);
    expect(result.body.data.description).toBe(companyInfoData.description);
    expect(result.body.data.title).toBe(companyInfoData.title);
    expect(result.body.data.image).toBe(companyInfoData.image);
    expect(result.body.data.Phone).toBe(companyInfoData.Phone);
    expect(result.body.data.Email).toBe(companyInfoData.Email);
    expect(result.body.data.Address).toBe(companyInfoData.Address);
    expect(result.body.data.Facebook).toBe(companyInfoData.Facebook);
    expect(result.body.data.Instagram).toBe(companyInfoData.Instagram);
    expect(result.body.data.Twitter).toBe(companyInfoData.Twitter);
    expect(result.body.data.Linkedin).toBe(companyInfoData.Linkedin);
    expect(result.body.data.Youtube).toBe(companyInfoData.Youtube);
    expect(result.body.data.Tiktok).toBe(companyInfoData.Tiktok);
  });

  it("should reject if name is empty", async () => {
    const companyInfoId = await companyInfo.getTestCompanyInfo();
    const result = await supertest(app)
      .put("/companyInfo")
      .set("Cookie", `authorization=Bearer ${token}`)
      .send({ ...companyInfoData, id: companyInfoId.id, name: "" });

    expect(result.status).toBe(403);
    expect(result.body.error).toBe(true);
    expect(result.body.message).toContain("error validation");
    expect(result.body.message).toContain("name");
    expect(result.body.status).toContain("error");
    expect(result.body.statusCode).toBe(403);
    expect(result.body.success).toBe(false);
  });
});
