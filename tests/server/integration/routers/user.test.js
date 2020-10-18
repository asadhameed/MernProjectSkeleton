const request = require("supertest");
let server;

describe("User Router", () => {
  beforeEach(async () => {
    server = require("../../../../server/server").default;
  });
  afterEach(async () => {
    await server.close();
  });
  describe("Post User", () => {
    let name;
    let email;
    let password;
    let confirmPassword;
    beforeEach(() => {
      name = "test";
      email = "test.test.com";
      password = "123456";
      confirmPassword = "123456";
    });
    const exec = () => {
      return request(server).post("/api/users").send({
        name,
        email,
        password,
        confirmPassword,
      });
    };
    it("Should return 400. If name is less then 3 characters", async () => {
      name = "ab";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("Should return 400. if name is greater then 20 characters", async () => {
      name = new Array(22).join("a");
      const res = await exec();
      expect(res.status).toBe(400);
    });
  });
});
