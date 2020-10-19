const request = require("supertest");
const {
  default: userModel,
} = require("../../../../../server/models/user.model");
let server;
describe("Auth Router ", () => {
  beforeEach(() => {
    server = require("../../../../../server/server").default;
  });
  afterEach(async () => {
    await server.close();
    await userModel.User.deleteMany({});
  });

  describe("Post Method for user signin", () => {
    let email;
    let password;
    beforeEach(async () => {
      email = "test@test.com";
      password = "123456";
    });

    const createUser = async () => {
      await userModel.User.create({
        name: "test",
        email: "test@test.com",
        password: "123456",
        passwordConfirmation: "123456",
      });
    };

    const exec = () => {
      return request(server).post("/auth/signin").send({ email, password });
    };

    it("Should return 400.If invalid email", async () => {
      email = "test@test";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400. If password is empty", async () => {
      password = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("Should return 401. If email is not register", async () => {
      const res = await exec();
      expect(res.status).toBe(401);
    });
    describe("Register A user and then then test", () => {
      beforeEach(async () => {
        await createUser();
      });
      afterEach(async () => {
        await userModel.User.deleteMany({});
      });
      it("Should return 401. If password is wrong", async () => {
        password = "changePassword";
        const res = await exec();
        expect(res.status).toBe(401);
      });
      it("Should return 200. If user give valid email and password", async () => {
        const res = await exec();
        expect(res.status).toBe(200);
        expect(Object.keys(res.body)).toEqual(
          expect.arrayContaining(["email", "name", "_id", "token"])
        );
      });
    });
  });
});
