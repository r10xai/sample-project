const request = require("supertest");
const app = require("../src/index");

describe("GET /hello", () => {
  it('responds with JSON { message: "world" }', async () => {
    const res = await request(app).get("/hello");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
    expect(res.body).toEqual({ message: "world" });
  });
});

describe("GET /health", () => {
  it('responds with 200 and plain text "ok"', async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/text\/plain/);
    expect(res.text).toBe("ok");
  });
});
