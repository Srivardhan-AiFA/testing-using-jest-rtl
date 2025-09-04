const app = require("./index.js");
const request = require("supertest");

describe("Signup API testing", () => {
  test("testing endpoint when values present", async () => {
    const response = await request(app).post("/signup").send({
      username: "user1",
      password: "password",
    });
    expect(response.statusCode).toBe(200);
  });

  test("testing the endpoints when values are not defined", async () => {
    const endpoints = [
      { username: "", password: "" },
      { username: "" },
      { password: "" },
      {},
    ];
    for (let endpoint of endpoints) {
      const response = await request(app).post("/signup").send(endpoint);
      expect(response.statusCode).toBe(400);
    }
  });
});
    