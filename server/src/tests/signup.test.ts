import request from "supertest";
import { app } from "../server";

describe("Signup API", () => {
  it("should return 400 for existing user signup", async () => {
    const existingUser = {
      username: "user1",
      email: "user1@gmail.com",
      password: "password",
    };

    const res = await request(app).post("/auth/signup").send(existingUser);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("User with this email already exists");
  });

  //   it("should return 201 for new user signup", async () => {
  //     const existingUser = {
  //       username: "newuser",
  //       email: "newuser@gmail.com",
  //       password: "password",
  //     };

  //     const res = await request(app).post("/auth/signup").send(existingUser);
  //     expect(res.status).toBe(201);
  //     expect(res.body).toHaveProperty("user");
  //   });

  it("should return 400 when username field is missing", async () => {
    const invalidUser = {
      email: "userdoesnotexist@gmail.com",
      password: "password",
    };

    const res = await request(app).post("/auth/signup").send(invalidUser);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0].message).toBe("Username is required");
  });

  it("should return 400 when email field is missing", async () => {
    const invalidUser = {
      username: "dummyuser",
      password: "password",
    };

    const res = await request(app).post("/auth/signup").send(invalidUser);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0].message).toBe("Valid email is required");
  });

  it("password need to be atleast 6+ characters", async () => {
    const invalidUser = {
      username: "dummyuser",
      email: "dummyuser@gmail.com",
      password: "lol",
    };

    const res = await request(app).post("/auth/signup").send(invalidUser);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0].message).toBe("Password must be 6+ chars");
  });
});
