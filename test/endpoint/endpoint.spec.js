const supertest = require("supertest");
const app = require("../../src/api/app");

describe("GET /", () => {
  it("should return a 200 OK response", async () => {
    const result = await supertest(app).get("/");
    expect(result.status).toBe(200);
    expect(result.text).toBe("Hello World!");
  });
});

describe("USE /* endpoint", () => {
  // app.use("*", (req, res, next) => {
  //     const endpoint = req.originalUrl;
  //     next(new responseError(404, `${endpoint} endpoint not found!`));
  //   });
  it("should return a 404 response", async () => {
    const result = await supertest(app).get("/randomEndpoint");

    expect(result.status).toBe(404);
    expect(result.text).toContain("/randomEndpoint");
    expect(result.text).toContain("endpoint not found!");
  });
});
