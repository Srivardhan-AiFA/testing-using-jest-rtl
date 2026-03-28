import request from "supertest";
import { app } from "../server";

describe("Signin tests", () => {
  it("should be return 200 if user exist", async () => {
    const invalidUser = {
      email: "user1@gmail.com",
      password: "password",
    };
    const res = await request(app).post("/auth/signin").send(invalidUser);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("user");
  });

  it("should be return 400 if user not exist", async () => {
    const invalidUser = {
      email: "nouser@gmail.com",
      password: "password",
    };
    const res = await request(app).post("/auth/signin").send(invalidUser);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("Invalid email or password");
  });

  it("should be return 400 if user password is incorrect", async () => {
    const invalidUser = {
      email: "user1@gmail.com",
      password: "notCorrectPassword",
    };
    const res = await request(app).post("/auth/signin").send(invalidUser);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("Invalid email or password");
  });

  it("should return 400 if email field is missing", async () => {
    const res = await request(app).post("/auth/signin").send({
      password: "password",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0].message).toBe("Valid email is required");
  });

  it("should return 400 if password field is missing", async () => {
    const res = await request(app).post("/auth/signin").send({
      email: "user1@gmail.com",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0].message).toBe("Password is required");
  });
  it("should return a JWT token when signin is successful", async () => {
    const res = await request(app).post("/auth/signin").send({
      email: "user1@gmail.com",
      password: "password",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("user");
    expect(typeof res.body.user.token).toBe("string");
  });
});
