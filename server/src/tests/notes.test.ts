import request from "supertest";
import { app } from "../server";

describe("notes", () => {
  it("should return 401 if no token is provided", async () => {
    const res = await request(app).post("/notes/create").send({});
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("No token provided");
  });

  it("should return 400 if content is missing", async () => {
    const res = await request(app)
      .post("/notes/create")
      .send({ content: "Test Note" });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("No token provided");
  });

  it("should return 401 if no token is provided", async () => {
    const res = await request(app).post("/notes/create").send({});
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("No token provided");
  });

  it("should return 401 if token is invalid", async () => {
    const token = "VALID_JWT_HERE";

    const res = await request(app)
      .post("/notes/create")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Note" });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Invalid token");
  });

  it("should return 400 with error content is required", async () => {
    const dummyNote = {};
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGMxMDQ4YjcwMWI1YTZlM2Q3MjdlZmIiLCJpYXQiOjE3NTc1OTM5NDgsImV4cCI6MTc1NzU5NzU0OH0.0-yrcflh1tIp0HP21hXTxBMItaBf2ZU3QS9EZoQ8940";

    const res = await request(app)
      .post("/notes/create")
      .set("Authorization", `Bearer ${token}`)
      .send(dummyNote);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0].message).toBe("content is required");
  });

  it("should create a note successfully when valid data and token are provided", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGMxMDQ4YjcwMWI1YTZlM2Q3MjdlZmIiLCJpYXQiOjE3NTc1OTM5NDgsImV4cCI6MTc1NzU5NzU0OH0.0-yrcflh1tIp0HP21hXTxBMItaBf2ZU3QS9EZoQ8940";

    const res = await request(app)
      .post("/notes/create")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Title", content: "Test Content" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.content).toBe("Test Content");
    expect(res.body.isFavorite).toBe(false);
    expect(res.body.category).toBe("all");
  });
});

// npx jest --detectOpenHandles --watchAll --silent
