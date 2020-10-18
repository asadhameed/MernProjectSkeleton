const request = require("supertest");
const { default: userModel } = require("../../../../server/models/user.model");
let server;

describe("User Router", () => {
  beforeEach(async () => {
    server = require("../../../../server/server").default;
  });
  afterEach(async () => {
    await server.close();
    await userModel.User.deleteMany({});
  });
  describe("Post User", () => {
    let name;
    let email;
    let password;
    let passwordConfirmation;
    beforeEach(() => {
      name = "test";
      email = "test@test.com";
      password = "123456";
      passwordConfirmation = "123456";
    });
    const exec = () => {
      return request(server).post("/api/users").send({
        name,
        email,
        password,
        passwordConfirmation,
      });
    };
    it("Should return 400. If name is less then 3 characters", async () => {
      name = "ab";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("Should return 400. If name is greater then 20 characters", async () => {
      name = new Array(22).join("a");
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("Should return 400. If email is not valid", async () => {
      email = "test@test";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("Should return 400. If password is less then 6 characters", async () => {
      password = "12345";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("Should return 400. If passwordConfirmation is not equal to password", async () => {
      passwordConfirmation = "1234578";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("Should return 400. If user already exist", async () => {
      await userModel.User.create({
        name,
        email,
        password,
      });

      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("Should return 200 and user name and email. If user register successful", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", "test");
      expect(res.body).toHaveProperty("email", "test@test.com");
    });
  });
});
