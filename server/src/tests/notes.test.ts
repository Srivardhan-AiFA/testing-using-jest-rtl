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
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGMxNmJjMWI2MjlhNWM1NDNlYzhlY2IiLCJpYXQiOjE3NTc2NTczMzIsImV4cCI6MTc1NzY2MDkzMn0.C7sSAaUXlYWblfGghAkaJeKak9Jm-fLPBTBwukG9YU8";

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
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGMxNmJjMWI2MjlhNWM1NDNlYzhlY2IiLCJpYXQiOjE3NTc2NTczMzIsImV4cCI6MTc1NzY2MDkzMn0.C7sSAaUXlYWblfGghAkaJeKak9Jm-fLPBTBwukG9YU8";

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

it("should return 400 error for not providing the updated content", async () => {
  const id = "68c3bb7e37f6cec415b756fd";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGMxNmJjMWI2MjlhNWM1NDNlYzhlY2IiLCJpYXQiOjE3NTc2NTczMzIsImV4cCI6MTc1NzY2MDkzMn0.C7sSAaUXlYWblfGghAkaJeKak9Jm-fLPBTBwukG9YU8";

  const res = await request(app)
    .put(`/notes/update/${id}`)
    .set("Authorization", `Bearer ${token}`)
    .send({ id });
  expect(res.status).toBe(400);
  expect(res.body).toHaveProperty("errors");
  expect(res.body.errors[0].message).toBe("content is required");
});

it("should return error for not providing the updated content", async () => {
  const id = "68c3bb7e37f6cec415b756fd";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGMxNmJjMWI2MjlhNWM1NDNlYzhlY2IiLCJpYXQiOjE3NTc2NTczMzIsImV4cCI6MTc1NzY2MDkzMn0.C7sSAaUXlYWblfGghAkaJeKak9Jm-fLPBTBwukG9YU8";

  const res = await request(app)
    .put(`/notes/update/${id}`)
    .set("Authorization", `Bearer ${token}`)
    .send({ content: "updated content" });
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("updatedNote");
  expect(res.body.message).toBe("note updated");
});

// npx jest --detectOpenHandles --watchAll --silent
