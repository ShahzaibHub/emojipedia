const request = require("supertest");
const app = require("../server"); // server.js is one level above

describe("GET /api/emojis", () => {
  it("should return emoji JSON", async () => {
    const res = await request(app).get("/api/emojis");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0]).toHaveProperty("emoji");
  });
});

